// src/shared/config/plans.ts
export type PlanKey = "transformer" | "implementer";

export interface PlanDefinition {
  key: PlanKey;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  cta: string;

  // Pricing information
  pricing: {
    amount: string;           // Display price like "$29.99"
    period: string;           // Display period like "/month"
    stripeCheckoutUrl: string; // Stripe payment link (LIVE)
    stripePriceId: string;    // Stripe Price ID (for webhooks)
  };

  // Feature list for pricing page
  features: string[];

  // Feature access flags (for backend authorization)
  access: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
  };

  // Community & coaching indicators (non-technical, UI-facing)
  community: {
    enabled: boolean;
    skoolTier: string;
    includesChallenge: boolean;
    includesLiveCalls: boolean;
    coachingDiscount: boolean;
  };
}

export const PLANS: Record<PlanKey, PlanDefinition> = {
  transformer: {
    key: "transformer",
    name: "Transformer Plan",
    subtitle: "Discover & Analyze",
    tagline: "Gain clarity and create your transformation plan.",
    description:
      "Discover your purpose and analyze change with comprehensive tools for meaningful transformation.",
    cta: "Start Transforming",

    pricing: {
      amount: "$29.99",
      period: "/month",
      stripeCheckoutUrl: "https://buy.stripe.com/3cI7sL1hx8SX5pyaAr8bS01", // Update with new Stripe link
      stripePriceId: "price_1Sjle7EdLQjM86qTAI3aT1lQ", // Update with new Price ID
    },

    features: [
      "Step 1: Discover Purpose (All 9 Modules)",
      "Reflections saved locally",
      "Summary & insights generated",
      "Step 2: Analyze Change",
      "Journal with AI insights",
      "Tasks → Goals planning",
      "Milestones → Projects",
      "Skills to Build tracker",
      "Change Analysis tools",
      "3-Day Boot Camp",
      "Community Access",
      "Live Zoom calls + digital files",
    ],

    access: {
      step1: true,
      step2: true,
      step3: false,
    },

    community: {
      enabled: true,
      skoolTier: "Transformer Community",
      includesChallenge: true,
      includesLiveCalls: true,
      coachingDiscount: false,
    },
  },

  implementer: {
    key: "implementer",
    name: "Implementer Plan",
    subtitle: "Complete Transformation",
    tagline: "Execute your plan with structure, insights, and accountability.",
    description:
      "Everything in Transformer plus Step 3, final blueprint, advanced analytics, and coaching discounts.",
    cta: "Implement Your Change",

    pricing: {
      amount: "$59.99",
      period: "/month",
      stripeCheckoutUrl: "https://buy.stripe.com/28E9ATbWb1qvf0823V8bS02", // Update with new Stripe link
      stripePriceId: "price_1SjlnNEdLQjM86qTGH3kVVqL", // Update with new Price ID
    },

    features: [
      "Everything in Transformer Plan",
      "Step 3: Clarify Focus",
      "Modules 3, 4, & 5 (How, When, Where)",
      "Journey Insights (AI-powered)",
      "Final Life Blueprint",
      "Advanced Analytics Dashboard",
      "Priority Community Access",
      "Two Zoom sessions + recordings",
      "Discount access to Masterclass + Inner Circle",
    ],

    access: {
      step1: true,
      step2: true,
      step3: true,
    },

    community: {
      enabled: true,
      skoolTier: "Implementer Community",
      includesChallenge: false,
      includesLiveCalls: true,
      coachingDiscount: true,
    },
  },
};

// Helper to get plan by key with type safety
export function getPlan(key: string): PlanDefinition | undefined {
  return PLANS[key as PlanKey];
}

// Helper to check if a plan key is valid
export function isValidPlanKey(key: string): key is PlanKey {
  return key === "transformer" || key === "implementer";
}