// src/config/plans.ts

export type PlanKey = "explorer" | "transformer" | "implementer";

export interface PlanDefinition {
  key: PlanKey;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  cta: string;

  // Feature access flags
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

    access: {
      step1: true,
      step2: true,
      step3: false,
    },

    community: {
      enabled: true,
      skoolTier: "Transformer Community — Analyze Change",
      includesChallenge: true, // 21-day challenge
      includesLiveCalls: true, // 1 live or recordings
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

    access: {
      step1: true,
      step2: true,
      step3: true,
    },

    community: {
      enabled: true,
      skoolTier: "Implementer Community — Implement Change",
      includesChallenge: false,
      includesLiveCalls: true, // 2 lives or recordings
      coachingDiscount: true,
    },
  },
};
