import type { Request, Response, NextFunction } from "express";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { subscriptions } from "@shared/schema";

export type Plan = "EXPLORER" | "TRANSFORMER" | "IMPLEMENTER";

const PLAN_RANK: Record<Plan, number> = {
  EXPLORER: 1,
  TRANSFORMER: 2,
  IMPLEMENTER: 3,
};

declare global {
  namespace Express {
    interface Request {
      // populated by middleware
      authUserId?: string;
      userPlan?: Plan;
    }
  }
}

/**
 * Change this function to match how YOUR app stores logged-in identity.
 * Common patterns:
 *  - Passport: req.user?.id
 *  - Session: req.session.userId
 */
function getUserIdFromRequest(req: Request): string | undefined {

  // express-session (FIRST - this is what we're using)
  const sessionUserId = (req as any).session?.userId as string | undefined;
  if (sessionUserId) return sessionUserId;
  
  // Passport-style:
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
 * ✅ UPDATED: Now checks for active trial and grants trialPlan access
 */

async function fetchUserPlan(userId: string): Promise<Plan> {
  const rows = await db
    .select({
      plan: subscriptions.plan,
      status: subscriptions.status,
      trialEndsAt: subscriptions.trialEndsAt,        // ✅ ADD THIS
      trialPlan: subscriptions.trialPlan,            // ✅ ADD THIS
    })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  const row = rows[0];
  if (!row) return "EXPLORER";

  // ✅ ADD THIS TRIAL CHECK
  // If trial is active (hasn't expired yet), grant trial plan access
  if (row.trialEndsAt && new Date(row.trialEndsAt).getTime() > Date.now()) {
    return (row.trialPlan as Plan) ?? "TRANSFORMER";
  }

  // After trial expires (or if no trial), use their base plan
  return row.plan as Plan;
}

export function requirePlan(requiredPlan: Plan) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.authUserId ?? getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // Cache per-request
    if (!req.userPlan) {
      req.userPlan = await fetchUserPlan(userId);
    }

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

/**
 * Optional: feature-level gating if you want finer control than just plan rank.
 * Map each feature key to a minimum required plan.
 */
export const FEATURE_REQUIREMENTS: Record<string, Plan> = {
  // Explorer baseline examples:
  "save-reflections": "EXPLORER",
  "generate-summary": "EXPLORER",
  "initial-purpose-interpretation": "EXPLORER",

  // Transformer examples:
  "analyze-change": "TRANSFORMER",
  "generate-insights": "TRANSFORMER",
  "clarify-focus": "TRANSFORMER",

  // Implementer examples:
  "final-blueprint": "IMPLEMENTER",
  "analytics": "IMPLEMENTER",
};

export function requireFeature(featureKey: string) {
  const requiredPlan = FEATURE_REQUIREMENTS[featureKey] ?? "IMPLEMENTER";
  return requirePlan(requiredPlan);
}
