/**
 * Admin Dashboard Stats API Route
 * 
 * SETUP:
 * 1. Save as: server/routes/admin-stats.ts
 * 2. In server/routes.ts, add import:
 *    import { registerAdminStatsRoutes } from "./routes/admin-stats";
 * 3. Inside registerRoutes(), add:
 *    registerAdminStatsRoutes(app);
 */

import type { Express } from "express";
import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { users, subscriptions } from "@shared/schema";
import { requireAuth } from "../plan-gate";
import { storage } from "../storage";

export function registerAdminStatsRoutes(app: Express) {
  console.log("✅ Admin stats routes registered");

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
   * GET /api/admin/stats
   * Returns dashboard statistics from real database data
   */
  app.get("/api/admin/stats", requireAuth, requireAdmin, async (_req, res) => {
    try {
      // Total users count
      const totalUsersResult = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(users);
      const totalUsers = totalUsersResult[0]?.count ?? 0;

      // Plan distribution
      const planCounts = await db
        .select({
          plan: subscriptions.plan,
          count: sql<number>`count(*)::int`,
        })
        .from(subscriptions)
        .groupBy(subscriptions.plan);

      const planDistribution: Record<string, number> = {
        EXPLORER: 0,
        TRANSFORMER: 0,
        IMPLEMENTER: 0,
      };

      for (const row of planCounts) {
        if (row.plan in planDistribution) {
          planDistribution[row.plan] = row.count;
        }
      }

      // Active subscriptions (non-explorer, active status)
      const activeSubsResult = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(subscriptions)
        .where(eq(subscriptions.status, "active"));
      const activeSubs = activeSubsResult[0]?.count ?? 0;

      return res.json({
        success: true,
        stats: {
          totalUsers,
          activeSubs,
          planDistribution,
          implementers: planDistribution.IMPLEMENTER,
          transformers: planDistribution.TRANSFORMER,
          explorers: planDistribution.EXPLORER,
        },
      });
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      return res.status(500).json({ message: "Failed to fetch stats" });
    }
  });
}