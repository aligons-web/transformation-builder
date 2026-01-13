import type { Request, Response, NextFunction } from "express";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { subscriptions, users } from "@shared/schema";

export type Plan = "EXPLORER" | "TRANSFORMER" | "IMPLEMENTER";

const PLAN_RANK: Record<Plan, number> = {
  EXPLORER: 1,
  TRANSFORMER: 2,
  IMPLEMENTER: 3,
};

// Helper function for module access
export function canAccessModules(plan: Plan): number {
  const planRank = {
    EXPLORER: 3,      // Only modules 1-3
    TRANSFORMER: 9,   // All 9 modules
    IMPLEMENTER: 9    // All 9 modules
  };
  return planRank[plan] || 3;
}

declare global {
  namespace Express {
    interface Request {
      authUserId?: string;
      userPlan?: Plan;
      isAdmin?: boolean;
    }
  }
}

function getUserIdFromRequest(req: Request): string | undefined {
  const sessionUserId = (req as any).session?.userId as string | undefined;
  if (sessionUserId) return sessionUserId;

  const passportUserId = (req as any).user?.id as string | undefined;
  if (passportUserId) return passportUserId;

  return undefined;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.authUserId = userId;
  next();
}

/**
 * ✅ UPDATED: No trial logic - checks admin, then subscription plan
 */
async function fetchUserPlan(userId: string): Promise<{ plan: Plan; isAdmin: boolean }> {
  // Check if user is admin
  const userRows = await db
    .select({ isAdmin: users.isAdmin })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const isAdmin = userRows[0]?.isAdmin ?? false;

  // Admins always get IMPLEMENTER access
  if (isAdmin) {
    return { plan: "IMPLEMENTER", isAdmin: true };
  }

  // Regular users - check subscription
  const rows = await db
    .select({
      plan: subscriptions.plan,
      status: subscriptions.status,
    })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  const row = rows[0];
  if (!row) return { plan: "EXPLORER", isAdmin: false };

  // Return subscription plan
  return { plan: row.plan as Plan, isAdmin: false };
}

export function requirePlan(requiredPlan: Plan) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.authUserId ?? getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // Cache per-request
    if (!req.userPlan || req.isAdmin === undefined) {
      const result = await fetchUserPlan(userId);
      req.userPlan = result.plan;
      req.isAdmin = result.isAdmin;
    }

    // ✅ Admins bypass all plan checks
    if (req.isAdmin) {
      req.authUserId = userId;
      return next();
    }

    // Regular users - check plan rank
    const ok = PLAN_RANK[req.userPlan] >= PLAN_RANK[requiredPlan];
    if (!ok) {
      return res.status(403).json({
        message: `Requires ${requiredPlan} plan`,
        yourPlan: req.userPlan,
      });
    }

    req.authUserId = userId;
    next();
  };
}

export const FEATURE_REQUIREMENTS: Record<string, Plan> = {
  // Explorer baseline features
  "save-reflections": "EXPLORER",
  "generate-summary": "EXPLORER",

  // Transformer features
  "analyze-change": "TRANSFORMER",
  "generate-insights": "TRANSFORMER",

  // Implementer features
  "final-blueprint": "IMPLEMENTER",
  "analytics": "IMPLEMENTER",
};

export function requireFeature(featureKey: string) {
  const requiredPlan = FEATURE_REQUIREMENTS[featureKey] ?? "IMPLEMENTER";
  return requirePlan(requiredPlan);
}