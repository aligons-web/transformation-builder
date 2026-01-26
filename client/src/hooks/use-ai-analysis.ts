import { useState, useCallback } from "react";

// Types matching the API
type AnalysisType = "purpose-interpretation" | "future-path" | "transformation-summary" | "transformation-analysis" | "transformation-roadmap";

interface AnalysisResult {
  success: boolean;
  analysis?: string;
  structured?: Record<string, any>;
  error?: string;
}

interface UseAiAnalysisReturn {
  analyze: (type: AnalysisType, data: Record<string, any>) => Promise<AnalysisResult | null>;
  isLoading: boolean;
  error: string | null;
  result: AnalysisResult | null;
  clearResult: () => void;
}

/**
 * Hook for AI-powered analysis across the app
 * 
 * Usage:
 * ```tsx
 * const { analyze, isLoading, error, result } = useAiAnalysis();
 * 
 * // Trigger analysis
 * await analyze("purpose-interpretation", { reflections, modules });
 * 
 * // Access results
 * if (result?.structured) {
 *   // Use structured JSON data
 * }
 * ```
 */
export function useAiAnalysis(): UseAiAnalysisReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyze = useCallback(async (
    type: AnalysisType, 
    data: Record<string, any>
  ): Promise<AnalysisResult | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai-analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, data }),
      });

      const result: AnalysisResult = await response.json();

      if (!response.ok || !result.success) {
        const errorMessage = result.error || "Analysis failed. Please try again.";
        setError(errorMessage);
        setResult(null);
        return null;
      }

      setResult(result);
      return result;

    } catch (err: any) {
      const errorMessage = err.message || "Network error. Please check your connection.";
      setError(errorMessage);
      setResult(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    analyze,
    isLoading,
    error,
    result,
    clearResult,
  };
}

/**
 * Check if AI service is available
 */
export async function checkAiServiceHealth(): Promise<{ ready: boolean; message: string }> {
  try {
    const response = await fetch("/api/ai-analyze/health");
    const data = await response.json();
    return {
      ready: data.status === "ready",
      message: data.message
    };
  } catch {
    return {
      ready: false,
      message: "Could not connect to AI service"
    };
  }
}

// Type definitions for structured responses

export interface PurposeInterpretationResult {
  purposeStatement: string;
  connectingTheDots: string;
  personalDevelopment: {
    themes: string[];
    strengths: string[];
    growthAreas: string[];
    nextStep: string;
  };
  professionalDevelopment: {
    themes: string[];
    strengths: string[];
    growthAreas: string[];
    nextStep: string;
  };
  spiritualDevelopment: {
    themes: string[];
    strengths: string[];
    growthAreas: string[];
    nextStep: string;
  };
}

export interface FuturePathResult {
  transformationArchetype: string;
  archetypeBadges: string[];
  insights: {
    churchMinistry: { insight: string; recommendation: string };
    businessDevelopment: { insight: string; recommendation: string };
    technologyAi: { insight: string; recommendation: string };
    socialMedia: { insight: string; recommendation: string };
    higherEducation: { insight: string; recommendation: string };
  };
  strategicNextSteps: {
    immediate: { title: string; description: string };
    shortTerm: { title: string; description: string };
    longTerm: { title: string; description: string };
  };
  personaInsight?: string;
}

export interface TransformationSummaryResult {
  purposeSynthesis: string;
  strengthsProfile: string[];
  growthAreas: string[];
  strategicRecommendation: string;
  actionPlan: {
    week1_2: string[];
    month1: string[];
    month2_3: string[];
  };
  successMetrics: string[];
}