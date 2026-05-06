/**
 * Admin Subscriber Management API Routes
 * 
 * ADD TO YOUR APP:
 * 1. Save this file as: server/routes/admin-subscribers.ts
 * 2. In server/routes.ts, add these imports at the top:
 *    import { registerAdminSubscriberRoutes } from "./routes/admin-subscribers";
 * 3. Inside registerRoutes(), add this line after the AI analysis routes:
 *    registerAdminSubscriberRoutes(app);
 */

import type { Express } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users, subscriptions } from "@shared/schema";
import { requireAuth } from "../plan-gate";
import { storage } from "../storage";


export function registerAdminSubscriberRoutes(app: Express) {
  console.log("✅ Admin subscriber routes registered");

  /**
   * Middleware: Verify the current user is an admin
   */
  async function requireAdmin(req: any, res: any, next: any) {
    const userId = req.session?.userId || req.authUserId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await storage.getUser(userId);
    if (!user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    req.authUserId = userId;
    next();
  }

  /**
   * GET /api/admin/subscribers
   * Returns all users with their subscription info
   */
  app.get("/api/admin/subscribers", requireAuth, requireAdmin, async (_req, res) => {
    try {
      // Left join users with subscriptions to get complete picture
      const allUsers = await db
        .select({
          id: users.id,
          username: users.username,
          password: users.password,
          isAdmin: users.isAdmin,
          subId: subscriptions.id,
          plan: subscriptions.plan,
          status: subscriptions.status,
          stripeCustomerId: subscriptions.stripeCustomerId,
          stripeSubscriptionId: subscriptions.stripeSubscriptionId,
          createdAt: subscriptions.createdAt,
          updatedAt: subscriptions.updatedAt,
        })
        .from(users)
        .leftJoin(subscriptions, eq(users.id, subscriptions.userId));

      const subscribers = allUsers.map((row) => ({
        id: row.id,
        username: row.username,
        password: row.password,
        isAdmin: row.isAdmin,
        plan: row.plan ?? "EXPLORER",
        status: row.status ?? "none",
        stripeCustomerId: row.stripeCustomerId ?? null,
        stripeSubscriptionId: row.stripeSubscriptionId ?? null,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      }));

      return res.json({ success: true, subscribers });
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      return res.status(500).json({ message: "Failed to fetch subscribers" });
    }
  });

  /**
   * PATCH /api/admin/subscribers/:userId/plan
   * Update a user's plan (EXPLORER, TRANSFORMER, or IMPLEMENTER)
   */
  app.patch("/api/admin/subscribers/:userId/plan", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { userId } = req.params;
      const { plan } = req.body;

      // Validate plan value
      const validPlans = ["EXPLORER", "TRANSFORMER", "IMPLEMENTER"];
      if (!plan || !validPlans.includes(plan)) {
        return res.status(400).json({ message: `Invalid plan. Must be one of: ${validPlans.join(", ")}` });
      }

      // Verify user exists
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if subscription record exists
      const existingSub = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, userId))
        .limit(1);

      if (existingSub.length === 0) {
        // Create subscription record if it doesn't exist
        await db.insert(subscriptions).values({
          userId: userId,
          plan: plan,
          status: "active",
        });
      } else {
        // Update existing subscription
        await db
          .update(subscriptions)
          .set({
            plan: plan,
            updatedAt: new Date(),
          })
          .where(eq(subscriptions.userId, userId));
      }

      console.log(`✅ Admin updated user ${user.username} to plan: ${plan}`);

      return res.json({
        success: true,
        message: `Plan updated to ${plan}`,
        userId,
        plan,
      });
    } catch (error) {
      console.error("Error updating plan:", error);
      return res.status(500).json({ message: "Failed to update plan" });
    }
  });
}