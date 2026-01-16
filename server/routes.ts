import type { Express } from "express";
import type { Server } from "http";
import express from "express";
import { requireAuth, requirePlan, requireFeature } from "./plan-gate";
import { storage } from "./storage";
import { db } from "./db";
import { subscriptions } from "@shared/schema";
import { eq } from "drizzle-orm";
import { registerStripeWebhook } from "./stripe-webhook";

// ✅ Add session type definition
declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  console.log("✅ registerRoutes() loaded");

  // ----------------------------
  // STRIPE WEBHOOK
  // ----------------------------
  // ⚠️ IMPORTANT: Register webhook BEFORE express.json() middleware
  // Webhooks need raw body, not parsed JSON
  registerStripeWebhook(app);

  // ----------------------------
  // AUTH ROUTES
  // ----------------------------

  /**
   * POST /api/register
   * Creates a new user with EXPLORER plan
   */
  app.post("/api/register", async (req, res) => {
    try {
      const { username, password } = req.body;

      // ✅ VALIDATE INPUT
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      // Basic validation
      if (username.length < 3 || username.length > 50) {
        return res.status(400).json({ message: "Username must be 3-50 characters" });
      }

      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }

      // ✅ CHECK IF USER EXISTS
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // ✅ CREATE USER
      const newUser = await storage.createUser({ username, password });

      if (!newUser || !newUser.id) {
        throw new Error("Failed to create user");
      }

      // ✅ CREATE EXPLORER SUBSCRIPTION (no trial)
      try {
        await db.insert(subscriptions).values({
          userId: newUser.id,
          plan: "EXPLORER",
          status: "active",
        });
      } catch (subError) {
        console.error("Failed to create subscription:", subError);
      }

      // ✅ REGENERATE SESSION - This clears any old session and creates a fresh one
      await new Promise<void>((resolve, reject) => {
        req.session.regenerate((err) => {
          if (err) {
            console.error("Session regeneration error:", err);
            reject(err);
          } else {
            resolve();
          }
        });
      });

      // ✅ SET NEW USER ID IN FRESH SESSION
      req.session.userId = String(newUser.id);

      // ✅ SAVE SESSION AND SEND RESPONSE
      await new Promise<void>((resolve, reject) => {
        req.session.save((err) => {
          if (err) {
            console.error("Session save error:", err);
            reject(err);
          } else {
            resolve();
          }
        });
      });

      // Send response AFTER session is saved
      return res.json({
        success: true,
        userId: newUser.id,
        username: newUser.username,
        message: "Account created successfully!",
      });

    } catch (error) {
      console.error("Registration error:", error);

      if (error instanceof Error) {
        return res.status(500).json({ 
          message: "Registration failed", 
          error: error.message 
        });
      }

      return res.status(500).json({ message: "Registration failed" });
    }
  });

  /**
   * POST /api/login
   * Authenticate user and create session
   */
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      console.log("🔍 Login attempt for username:", username);

      let user;
      try {
        user = await storage.getUserByUsername(username);
      } catch (dbError) {
        console.error("❌ Database error during getUserByUsername:", dbError);
        throw new Error(`Database error: ${dbError instanceof Error ? dbError.message : String(dbError)}`);
      }

      if (!user) {
        console.log("❌ User not found:", username);
        return res.status(401).json({ message: "Invalid credentials" });
      }

      console.log("✅ User found:", user.id, user.username);

      // ⚠️ TODO: Add bcrypt password verification
      if (user.password !== password) {
        console.log("❌ Password mismatch for user:", username);
        return res.status(401).json({ message: "Invalid credentials" });
      }

      console.log("✅ Password verified, regenerating session...");

      // ✅ REGENERATE SESSION - Clears any old session
      try {
        await new Promise<void>((resolve, reject) => {
          req.session.regenerate((err) => {
            if (err) {
              console.error("❌ Session regeneration error:", err);
              reject(err);
            } else {
              console.log("✅ Session regenerated");
              resolve();
            }
          });
        });
      } catch (sessionError) {
        console.error("❌ Session regeneration failed:", sessionError);
        throw new Error(`Session error: ${sessionError instanceof Error ? sessionError.message : String(sessionError)}`);
      }

      // ✅ SET USER ID IN FRESH SESSION
      req.session.userId = String(user.id);
      console.log("✅ User ID set in session:", req.session.userId);

      // ✅ SAVE SESSION
      try {
        await new Promise<void>((resolve, reject) => {
          req.session.save((err) => {
            if (err) {
              console.error("❌ Session save error:", err);
              reject(err);
            } else {
              console.log("✅ Session saved successfully");
              resolve();
            }
          });
        });
      } catch (saveError) {
        console.error("❌ Session save failed:", saveError);
        throw new Error(`Session save error: ${saveError instanceof Error ? saveError.message : String(saveError)}`);
      }

      console.log("✅ Login successful for:", username);
      return res.json({
        success: true,
        userId: user.id,
        username: user.username,
        message: "Logged in successfully",
      });
    } catch (error) {
      console.error("❌ Login error:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      console.error("Login error details:", {
        message: errorMessage,
        stack: errorStack,
        username: req.body?.username,
      });
      return res.status(500).json({ 
        message: "Login failed",
        error: errorMessage 
      });
    }
  });

  /**
   * POST /api/logout
   * Destroy session
   */
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ success: true, message: "Logged out successfully" });
    });
  });

  /**
   * GET /api/me
   * Returns current user info with plan details (no trial)
   */
  app.get("/api/me", async (req, res) => {
    try {
      const userId = req.session?.userId;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized - No session" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Get subscription
      const userIdNumber = parseInt(userId, 10);
      const subRows = await db
        .select({
          plan: subscriptions.plan,
          status: subscriptions.status,
        })
        .from(subscriptions)
        .where(eq(subscriptions.userId, userIdNumber))
        .limit(1);

      const sub = subRows[0];
      const currentPlan = sub?.plan ?? "EXPLORER";

      // ✅ DEBUG LOGGING
      console.log('🔍 /api/me DEBUG:', {
        username: user.username,
        isAdmin: user.isAdmin,
        isAdminType: typeof user.isAdmin,
        currentPlan: currentPlan
      });

      // ✅ Return user data with isAdmin
      return res.json({
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin ? 1 : 0,
        plan: currentPlan,
        basePlan: sub?.plan ?? "EXPLORER",
        subscriptionStatus: sub?.status ?? "inactive",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ message: "Failed to fetch user info" });
    }
  });

  // ----------------------------
  // EXPLORER FEATURES
  // ----------------------------

  app.post("/api/reflections", requireFeature("save-reflections"), async (_req, res) => {
    res.json({ ok: true, message: "Reflection saved" });
  });

  // ----------------------------
  // TRANSFORMER FEATURES
  // ----------------------------

  app.get("/api/analyze-change/overview", requirePlan("TRANSFORMER"), async (_req, res) => {
    res.json({ ok: true, section: "Analyze Change Overview" });
  });

  app.post("/api/generate-insights", requireFeature("generate-insights"), async (_req, res) => {
    res.json({ ok: true, message: "Insights generated" });
  });

  // ----------------------------
  // IMPLEMENTER FEATURES
  // ----------------------------

  app.get("/api/step3/access", requirePlan("IMPLEMENTER"), async (_req, res) => {
    res.json({ ok: true, message: "Access granted to Step 3" });
  });

  app.get("/api/analytics", requirePlan("IMPLEMENTER"), async (_req, res) => {
    res.json({ ok: true, section: "Analytics Dashboard" });
  });

  return httpServer;
}