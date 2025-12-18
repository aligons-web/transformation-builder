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
  // Passport-style:
  const passportUserId = (req as any).user?.id as string | undefined;
  if (passportUserId) return passportUserId;

  // express-session custom:
  const sessionUserId = (req as any).session?.userId as string | undefined;
  if (sessionUserId) return sessionUserId;

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

async function fetchUserPlan(userId: string): Promise<Plan> {
  // Default if no subscription row yet
  const rows = await db
    .select({ plan: subscriptions.plan, status: subscriptions.status })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  const row = rows[0];
  if (!row) return "EXPLORER";

  // If you want to lock access when canceled/past_due, enforce it here:
  // Example: treat non-active as EXPLORER or deny.
  // if (row.status !== "active") return "EXPLORER";

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
