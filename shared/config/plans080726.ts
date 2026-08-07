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
      // ✅ TEST MODE URLs - Replace with live URLs when ready for production
      stripeCheckoutUrl: "https://buy.stripe.com/test_00w8wP9O3b152dm6kb8bS00",
      stripePriceId: "price_1SrMCMEdLQjM86qTkh7bSRTv",
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
      "1-Day Boot Camp",
      "Community Access",
      "1 Live Zoom call per month + digital files",
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
      "Transformer Plan + Step 3, final blueprint, and coaching for the transformation journey.",
    cta: "Implement Your Change",

    pricing: {
      amount: "$49.99",
      period: "/month",
      // ✅ TEST MODE URLs - Replace with live URLs when ready for production
      stripeCheckoutUrl: "https://buy.stripe.com/test_3cI7sL1hx8SX5pyaAr8bS01",
      stripePriceId: "price_1SrMDFEdLQjM86qTyNO9tRgL",
    },

    features: [
      "Everything in Transformer Plan",
      "Step 3: Clarify Focus",
      "Modules 3, 4, & 5 (How, When, Where)",
      "Journey Insights (AI-powered)",
      "Final Life Blueprint",
      "Community Access to other Implementers",
      "Two Zoom sessions (an accountability session & insights session) + recordings",
      "Emphasis on continous knowledge development, tracking progress, and building skills for the journey.",
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