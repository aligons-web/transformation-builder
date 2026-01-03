// src/shared/config/plans.ts
export type PlanKey = "explorer" | "transformer" | "implementer";

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
  explorer: {
    key: "explorer",
    name: "Explorer Plan",
    subtitle: "Discover Purpose",
    tagline: "Gain clarity about who you are and where your life is pointing.",
    description:
      "Discover your purpose by reflecting on your life experiences and uncovering the themes that shape your future.",
    cta: "Discover Your Purpose",

    pricing: {
      amount: "$29.99",
      period: "/month",
      stripeCheckoutUrl: "https://buy.stripe.com/00w8wP9O3b152dm6kb8bS00",
      stripePriceId: "price_1SjlSmEdLQjM86qTaPY7LXDU",
    },

    features: [
      "Step 1 Discover Purpose",
      "Reflections saved",
      "Summary generated",
      "Initial interpretation of purpose",
      "Community Access",
    ],

    access: {
      step1: true,
      step2: false,
      step3: false,
    },

    community: {
      enabled: true,
      skoolTier: "Explorer Community — Discover Purpose",
      includesChallenge: false,
      includesLiveCalls: false,
      coachingDiscount: false,
    },
  },

  transformer: {
    key: "transformer",
    name: "Transformer Plan",
    subtitle: "Analyze Change",
    tagline: "Turn purpose into a clear and intentional plan.",
    description:
      "Analyze your current reality, define goals, and create a structured plan for meaningful life change.",
    cta: "Analyze Your Change",

    pricing: {
      amount: "$39.99",
      period: "/month",
      stripeCheckoutUrl: "https://buy.stripe.com/3cI7sL1hx8SX5pyaAr8bS01",
      stripePriceId: "price_1Sjle7EdLQjM86qTAI3aT1lQ",
    },

    features: [
      "Includes Step 1 Discover Purpose",
      "Step 2 Analyze Change",
      "Journal",
      "Tasks → Goals",
      "Milestones → Projects",
      "Skills to Build",
      "Change Analysis + Generate Insights",
      "21-Day Transformation Challenge",
      "Community Access",
      "Live Zoom or recordings + digital files (Skool)",
    ],

    access: {
      step1: true,
      step2: true,
      step3: false,
    },

    community: {
      enabled: true,
      skoolTier: "Transformer Community — Analyze Change",
      includesChallenge: true,
      includesLiveCalls: true,
      coachingDiscount: false,
    },
  },

  implementer: {
    key: "implementer",
    name: "Implementer Plan",
    subtitle: "Implement Change",
    tagline: "Execute your plan with structure, insights, and accountability.",
    description:
      "Implement lasting change through execution tools, analytics, and a final life blueprint designed for progress.",
    cta: "Implement Your Change",

    pricing: {
      amount: "$69.99",
      period: "/month",
      stripeCheckoutUrl: "https://buy.stripe.com/28E9ATbWb1qvf0823V8bS02",
      stripePriceId: "price_1SjlnNEdLQjM86qTGH3kVVqL",
    },

    features: [
      "Includes Explorer + Transformer",
      "Step 3: Clarify Focus",
      "Modules 3, 4, & 5 (How, When, Where)",
      "Generate Insights",
      "Final Blueprint",
      "Analytics",
      "Milestones → Projects",
      "Community Access",
      "Two Zoom sessions or recordings + digital files (Skool)",
      "Discount access to Masterclass + Inner Circle",
    ],

    access: {
      step1: true,
      step2: true,
      step3: true,
    },

    community: {
      enabled: true,
      skoolTier: "Implementer Community — Implement Change",
      includesChallenge: false,
      includesLiveCalls: true,
      coachingDiscount: true,
    },
  },
};