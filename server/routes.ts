import type { Express } from "express";
import type { Server } from "http";
import { requireAuth, requirePlan, requireFeature } from "./plan-gate";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // This proves registerRoutes() ran at server startup
  console.log("✅ registerRoutes() loaded");

  // ----------------------------
  // AUTH / BASE ROUTES
  // ----------------------------

  // TEMP MODE: If you do NOT have auth wired yet, keep requireAuth commented out.
  app.get("/api/me" /*, requireAuth*/, (req, res) => {
    // This proves the /api/me handler is actually being called
    console.log("✅ HIT /api/me");

    res.json({
      userId: "demo-user",
      email: "demo@example.com",
      plan: "TRANSFORMER", // change to TRANSFORMER / IMPLEMENTER to test gating
      subscriptionStatus: "trialing",
    });
  });

  // ----------------------------
  // EXPLORER FEATURES
  // ----------------------------

  app.post("/api/reflections", requireFeature("save-reflections"), async (_req, res) => {
    res.json({ ok: true });
  });

  // ----------------------------
  // TRANSFORMER FEATURES
  // ----------------------------

  app.get("/api/analyze-change/overview", requirePlan("TRANSFORMER"), async (_req, res) => {
    res.json({ ok: true });
  });

  app.post("/api/generate-insights", requireFeature("generate-insights"), async (_req, res) => {
    res.json({ ok: true });
  });

  // ----------------------------
  // IMPLEMENTER FEATURES
  // ----------------------------

  app.get("/api/analytics", requirePlan("IMPLEMENTER"), async (_req, res) => {
    res.json({ ok: true });
  });

  return httpServer;
}
