import { Express } from "express";
import Anthropic from "@anthropic-ai/sdk";

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Types for different analysis requests
interface AnalysisRequest {
  type: "purpose-interpretation" | "future-path" | "transformation-summary" | "transformation-analysis" | "transformation-roadmap";
  data: Record<string, any>;
  userId?: string;
}

interface AnalysisResponse {
  success: boolean;
  analysis?: string;
  structured?: Record<string, any>;
  error?: string;
}

// System prompts for different analysis types
const systemPrompts = {
  "purpose-interpretation": `You are a compassionate life transformation coach analyzing a user's reflections from the "Understanding Your Path" self-discovery framework. The framework has 9 modules covering: Uncommon Beginnings, The Thirst Quotient, Dungeon Discoveries, Clues of Vision, Attitude that Opens Doors, Purpose Indicators, The Day of One Thing, Life's Interruptions, and Connecting the Dots.

Analyze their responses across THREE dimensions: Personal, Professional, and Spiritual Development.

IMPORTANT: 
- Base your analysis ONLY on what the user has actually written
- Quote or reference their specific words when possible
- Be encouraging but honest
- If they haven't provided much content, acknowledge this and encourage deeper reflection

You MUST respond with ONLY valid JSON in this EXACT structure (no markdown, no explanation, just JSON):

{
  "purposeStatement": "A 2-3 sentence synthesis capturing their unique purpose based on their reflections",
  "connectingTheDots": "A paragraph showing how their experiences link together",
  "personalDevelopment": {
    "themes": ["theme 1", "theme 2", "theme 3"],
    "strengths": ["strength 1", "strength 2"],
    "growthAreas": ["growth area 1", "growth area 2"],
    "nextStep": "One specific actionable next step"
  },
  "professionalDevelopment": {
    "themes": ["theme 1", "theme 2", "theme 3"],
    "strengths": ["strength 1", "strength 2"],
    "growthAreas": ["growth area 1", "growth area 2"],
    "nextStep": "One specific actionable next step"
  },
  "spiritualDevelopment": {
    "themes": ["theme 1", "theme 2", "theme 3"],
    "strengths": ["strength 1", "strength 2"],
    "growthAreas": ["growth area 1", "growth area 2"],
    "nextStep": "One specific actionable next step"
  }
}`,

  "future-path": `You are a strategic life coach and futurist helping someone envision their transformation journey. Based on their self-assessment data (skills, preferences, resources, time use patterns, and subconscious drivers), provide personalized guidance.

IMPORTANT:
- Reference their specific quiz answers and selections
- Be concrete and actionable, not generic
- Tailor insights based on persona if provided (student, professional, entrepreneur, retiree, veteran)

You MUST respond with ONLY valid JSON in this EXACT structure (no markdown, no explanation, just JSON):

{
  "transformationArchetype": "A descriptive label like 'Restorative Leader' or 'Creative Innovator'",
  "archetypeBadges": ["Badge 1", "Badge 2", "Badge 3"],
  "personaInsight": "A personalized paragraph based on their specific data and selected persona",
  "insights": {
    "churchMinistry": {
      "insight": "2-3 sentences about how their profile aligns with faith-based service",
      "recommendation": "One concrete recommendation"
    },
    "businessDevelopment": {
      "insight": "2-3 sentences about entrepreneurial or career opportunities",
      "recommendation": "One concrete recommendation"
    },
    "technologyAi": {
      "insight": "2-3 sentences about leveraging or adapting to technology",
      "recommendation": "One concrete recommendation"
    },
    "socialMedia": {
      "insight": "2-3 sentences about building networks and influence",
      "recommendation": "One concrete recommendation"
    },
    "higherEducation": {
      "insight": "2-3 sentences about continuous learning paths",
      "recommendation": "One concrete recommendation"
    }
  },
  "strategicNextSteps": {
    "immediate": {
      "title": "Short action title",
      "description": "Specific action to take this week"
    },
    "shortTerm": {
      "title": "Short goal title",
      "description": "Goal for the next 1-3 months"
    },
    "longTerm": {
      "title": "Short vision title",
      "description": "Vision for 6-12 months"
    }
  }
}`,

  "transformation-analysis": `You are an AI coach analyzing a user's self-assessment data to help them understand what transformation they need and why.

Based on their quiz responses about subconscious patterns, time use, work preferences, skills they want to build, and resources they lack, provide deep insights.

IMPORTANT:
- Reference their specific answers and patterns
- Be encouraging but honest about areas needing growth
- Provide actionable insights, not generic advice

You MUST respond with ONLY valid JSON in this EXACT structure (no markdown, no explanation, just JSON):

{
  "subconsciousInsight": {
    "pattern": "Impulsive/Emotional OR Logical/Analytical - based on their answers",
    "description": "2-3 sentences explaining what this means for them",
    "recommendation": "One specific recommendation"
  },
  "timeUseInsight": {
    "type": "Highly Disciplined OR Independent Learner OR Relaxation Focused OR Socially Connected",
    "description": "2-3 sentences about their time use patterns",
    "recommendation": "One specific recommendation"
  },
  "workStyleInsight": {
    "preference": "People OR Things OR Data OR Mixed",
    "description": "2-3 sentences about their work style",
    "careerSuggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
  },
  "resourceGaps": {
    "primaryGap": "The most critical resource they're lacking",
    "strategy": "2-3 sentences on how to address this gap"
  },
  "transformationRecommendation": {
    "focus": "The primary area they should focus on",
    "rationale": "2-3 sentences explaining why",
    "immediateAction": "One thing they can do this week"
  },
  "overallInsight": "A motivating paragraph synthesizing all the data and pointing toward their transformation path"
}`,

  "transformation-roadmap": `You are a strategic life coach creating a personalized transformation roadmap. Based on the user's purpose reflections, analysis data, and focus data, create an actionable roadmap for their chosen category.

Categories:
- Personal Advancement: Focus on identity, habits, relationships, emotional growth
- Professional Reinvention: Focus on career, skills, leadership, income
- Spiritual Awareness: Focus on purpose, meaning, faith, service, legacy

IMPORTANT:
- Synthesize ALL their data from purpose, analysis, and focus modules
- Be specific to their chosen category
- Provide concrete, actionable steps

You MUST respond with ONLY valid JSON in this EXACT structure (no markdown, no explanation, just JSON):

{
  "category": "The selected category",
  "strategicInsight": "2-3 sentences summarizing their position and potential in this category",
  "preference": "Their dominant work/interaction style from the data",
  "destination": "Their stated or implied destination/goal",
  "barriers": ["barrier 1", "barrier 2"],
  "actionPlan": [
    {
      "phase": "Week 1-2",
      "title": "Short action title",
      "description": "Specific actions to take"
    },
    {
      "phase": "Month 1",
      "title": "Short goal title", 
      "description": "What to accomplish this month"
    },
    {
      "phase": "Month 2-3",
      "title": "Short milestone title",
      "description": "Building momentum actions"
    }
  ],
  "keyMetrics": ["How they'll measure success 1", "Metric 2", "Metric 3"],
  "motivationalClose": "An encouraging paragraph to inspire action"
}`,

  "transformation-summary": `You are synthesizing a user's complete transformation journey into an actionable blueprint. You have access to their:
- Purpose reflections (Step 1)
- Change analysis results (Step 2) 
- Focus clarifications (Step 3)

Create a comprehensive summary that includes:

1. **Purpose Synthesis**: Their core purpose in 2-3 sentences
2. **Strengths Profile**: Top 5 strengths identified across all data
3. **Growth Areas**: 3 key areas for development
4. **Strategic Recommendation**: Primary transformation path recommendation
5. **90-Day Action Plan**: 
   - Week 1-2: Immediate actions
   - Month 1: Short-term goals
   - Month 2-3: Building momentum
6. **Success Metrics**: How they'll know they're on track

IMPORTANT:
- Synthesize across ALL their data, finding patterns
- Be specific and actionable
- Include encouragement but maintain honesty
- Respond in JSON format`
};

// Helper to format user data into prompt content
function formatDataForPrompt(type: AnalysisRequest["type"], data: Record<string, any>): string {
  switch (type) {
    case "purpose-interpretation":
      return formatPurposeData(data);
    case "future-path":
      return formatFuturePathData(data);
    case "transformation-analysis":
      return formatTransformationAnalysisData(data);
    case "transformation-roadmap":
      return formatRoadmapData(data);
    case "transformation-summary":
      return formatSummaryData(data);
    default:
      return JSON.stringify(data, null, 2);
  }
}

function formatPurposeData(data: Record<string, any>): string {
  const { reflections, modules } = data;

  if (!reflections || Object.keys(reflections).length === 0) {
    return "The user has not yet provided any reflections. Please encourage them to complete the reflection modules.";
  }

  let formatted = "## User's Purpose Reflections\n\n";

  // Group by module
  const moduleAnswers: Record<number, { question: string; answer: string }[]> = {};

  for (const [key, answer] of Object.entries(reflections)) {
    if (!answer || (answer as string).trim().length === 0) continue;

    const [moduleId, questionIndex] = key.split("-").map(Number);
    if (!moduleAnswers[moduleId]) {
      moduleAnswers[moduleId] = [];
    }

    const module = modules?.find((m: any) => m.id === moduleId);
    const question = module?.questions?.[questionIndex] || `Question ${questionIndex + 1}`;

    moduleAnswers[moduleId].push({
      question,
      answer: answer as string
    });
  }

  for (const [moduleId, answers] of Object.entries(moduleAnswers)) {
    const module = modules?.find((m: any) => m.id === Number(moduleId));
    formatted += `### Module ${moduleId}: ${module?.title || "Unknown"}\n`;
    formatted += `*${module?.statement || ""}*\n\n`;

    for (const { question, answer } of answers) {
      formatted += `**Q: ${question}**\n`;
      formatted += `A: ${answer}\n\n`;
    }
  }

  return formatted;
}

function formatFuturePathData(data: Record<string, any>): string {
  const {
    subconsciousAnswers,
    preferenceAnswers,
    timeUseAnswers,
    skillsChecked,
    resourcesChecked,
    successChecked,
    persona
  } = data;

  let formatted = "## User's Transformation Analysis Data\n\n";

  // Subconscious patterns
  if (subconsciousAnswers && Object.keys(subconsciousAnswers).length > 0) {
    let subCount = 0;
    let conCount = 0;
    Object.values(subconsciousAnswers).forEach((val: any) => {
      if (val?.startsWith("SL")) subCount++;
      if (val?.startsWith("CL")) conCount++;
    });
    formatted += `### Decision-Making Pattern\n`;
    formatted += `- Impulsive/Emotional responses: ${subCount}\n`;
    formatted += `- Logical/Analytical responses: ${conCount}\n`;
    formatted += `- Tendency: ${subCount > conCount ? "More intuitive/emotional decision-maker" : "More logical/analytical decision-maker"}\n\n`;
  }

  // Work preferences
  if (preferenceAnswers && Object.keys(preferenceAnswers).length > 0) {
    const counts: Record<string, number> = { People: 0, Things: 0, Data: 0, Mixed: 0 };
    Object.values(preferenceAnswers).forEach((val: any) => {
      if (val in counts) counts[val]++;
    });
    formatted += `### Work Style Preferences\n`;
    formatted += `- People-oriented: ${counts.People}\n`;
    formatted += `- Things-oriented: ${counts.Things}\n`;
    formatted += `- Data-oriented: ${counts.Data}\n`;
    formatted += `- Mixed/Flexible: ${counts.Mixed}\n`;
    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    formatted += `- Primary preference: ${dominant[0]}\n\n`;
  }

  // Time use
  if (timeUseAnswers && Object.keys(timeUseAnswers).length > 0) {
    const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
    Object.values(timeUseAnswers).forEach((val: any) => {
      if (val in counts) counts[val]++;
    });
    const typeLabels: Record<string, string> = {
      A: "Highly Disciplined & Self-Driven",
      B: "Independent Learner",
      C: "Relaxation Focused",
      D: "Socially Connected"
    };
    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    formatted += `### Time Use Pattern\n`;
    formatted += `- Type: ${typeLabels[dominant[0]] || "Mixed"}\n\n`;
  }

  // Skills
  if (skillsChecked && skillsChecked.length > 0) {
    formatted += `### Skills to Develop\n`;
    formatted += skillsChecked.map((s: string) => `- ${s}`).join("\n") + "\n\n";
  }

  // Resources lacking
  if (resourcesChecked && resourcesChecked.length > 0) {
    formatted += `### Resource Gaps Identified\n`;
    formatted += resourcesChecked.map((r: string) => `- ${r}`).join("\n") + "\n\n";
  }

  // Success types
  if (successChecked && successChecked.length > 0) {
    formatted += `### Success Vision\n`;
    formatted += successChecked.map((s: string) => `- ${s}`).join("\n") + "\n\n";
  }

  // Persona
  if (persona) {
    formatted += `### User Persona\n`;
    formatted += `- ${persona}\n\n`;
  }

  return formatted;
}

function formatSummaryData(data: Record<string, any>): string {
  let formatted = "## Complete Transformation Data\n\n";

  // Combine all data sections
  if (data.purposeReflections) {
    formatted += formatPurposeData(data.purposeReflections);
  }

  if (data.analysisData) {
    formatted += formatFuturePathData(data.analysisData);
  }

  if (data.focusData) {
    formatted += `### Focus Clarification\n`;
    formatted += JSON.stringify(data.focusData, null, 2) + "\n\n";
  }

  return formatted;
}

function formatTransformationAnalysisData(data: Record<string, any>): string {
  const {
    subconsciousAnswers,
    preferenceAnswers,
    timeUseAnswers,
    skillsChecked,
    resourcesChecked,
    successChecked,
    textAnswers
  } = data;

  let formatted = "## User's Transformation Analysis Data\n\n";

  // Subconscious quiz results
  if (subconsciousAnswers && Object.keys(subconsciousAnswers).length > 0) {
    let subCount = 0;
    let conCount = 0;
    const answers: string[] = [];

    Object.entries(subconsciousAnswers).forEach(([key, val]: [string, any]) => {
      if (val?.startsWith("SL")) {
        subCount++;
        answers.push(`Q${Number(key) + 1}: Impulsive/Emotional response`);
      }
      if (val?.startsWith("CL")) {
        conCount++;
        answers.push(`Q${Number(key) + 1}: Logical/Analytical response`);
      }
    });

    formatted += `### Subconscious Pattern Quiz\n`;
    formatted += `- Impulsive/Emotional responses: ${subCount}\n`;
    formatted += `- Logical/Analytical responses: ${conCount}\n`;
    formatted += `- Overall tendency: ${subCount > conCount ? "More intuitive/emotional decision-maker" : subCount < conCount ? "More logical/analytical decision-maker" : "Balanced approach"}\n\n`;
  }

  // Time use quiz results
  if (timeUseAnswers && Object.keys(timeUseAnswers).length > 0) {
    const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
    Object.values(timeUseAnswers).forEach((val: any) => {
      if (val in counts) counts[val]++;
    });

    const typeLabels: Record<string, string> = {
      A: "Highly Disciplined & Self-Driven (routine, structure)",
      B: "Independent Learner (skill-building, courses)",
      C: "Relaxation Focused (entertainment, downtime)",
      D: "Socially Connected (relationships, gatherings)"
    };

    formatted += `### Time Use Pattern\n`;
    Object.entries(counts).forEach(([key, count]) => {
      if (count > 0) formatted += `- ${typeLabels[key]}: ${count} responses\n`;
    });

    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    formatted += `- Primary pattern: ${typeLabels[dominant[0]]}\n\n`;
  }

  // Work preferences
  if (preferenceAnswers && Object.keys(preferenceAnswers).length > 0) {
    const counts: Record<string, number> = { People: 0, Things: 0, Data: 0, Mixed: 0 };
    Object.values(preferenceAnswers).forEach((val: any) => {
      if (val in counts) counts[val]++;
    });

    formatted += `### Work Style Preferences\n`;
    formatted += `- People-oriented: ${counts.People} responses\n`;
    formatted += `- Things-oriented: ${counts.Things} responses\n`;
    formatted += `- Data-oriented: ${counts.Data} responses\n`;
    formatted += `- Mixed/Flexible: ${counts.Mixed} responses\n`;

    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    formatted += `- Primary preference: ${dominant[0]}\n\n`;
  }

  // Skills to build
  if (skillsChecked && skillsChecked.length > 0) {
    formatted += `### Skills They Want to Develop\n`;
    formatted += skillsChecked.map((s: string) => `- ${s}`).join("\n") + "\n\n";
  }

  // Resources lacking
  if (resourcesChecked && resourcesChecked.length > 0) {
    formatted += `### Resource Gaps (What They're Lacking)\n`;
    formatted += resourcesChecked.map((r: string) => `- ${r}`).join("\n") + "\n\n";
  }

  // Success types
  if (successChecked && successChecked.length > 0) {
    formatted += `### Success Vision (What Success Looks Like to Them)\n`;
    formatted += successChecked.map((s: string) => `- ${s}`).join("\n") + "\n\n";
  }

  // Text answers
  if (textAnswers && Object.keys(textAnswers).length > 0) {
    formatted += `### Open-Ended Responses\n`;
    Object.entries(textAnswers).forEach(([key, value]) => {
      if (value && typeof value === 'string' && value.trim()) {
        formatted += `- ${key}: ${value}\n`;
      }
    });
    formatted += "\n";
  }

  return formatted;
}

function formatRoadmapData(data: Record<string, any>): string {
  const { category, purposeData, analysisData, focusData } = data;

  let formatted = `## Roadmap Request for: ${category || "General"}\n\n`;

  // Purpose data
  if (purposeData && Object.keys(purposeData).length > 0) {
    formatted += `### Purpose Reflections Summary\n`;
    const entries = Object.entries(purposeData).filter(([_, v]) => v && typeof v === 'string' && (v as string).trim());
    formatted += `Total reflection entries: ${entries.length}\n`;

    // Include a sample of their reflections
    entries.slice(0, 5).forEach(([key, value]) => {
      formatted += `- Entry ${key}: "${(value as string).substring(0, 200)}${(value as string).length > 200 ? '...' : ''}"\n`;
    });
    formatted += "\n";
  }

  // Analysis data
  if (analysisData) {
    formatted += formatTransformationAnalysisData(analysisData);
  }

  // Focus data
  if (focusData) {
    formatted += `### Focus & Clarification Data\n`;

    if (focusData.timeUse && Object.keys(focusData.timeUse).length > 0) {
      formatted += `Time use responses: ${Object.keys(focusData.timeUse).length}\n`;
    }

    if (focusData.text && Object.keys(focusData.text).length > 0) {
      formatted += `Text responses:\n`;
      Object.entries(focusData.text).forEach(([key, value]) => {
        if (value && typeof value === 'string' && value.trim()) {
          formatted += `- ${key}: ${value}\n`;
        }
      });
    }
    formatted += "\n";
  }

  return formatted;
}

// Main API handler
export function registerAiAnalysisRoutes(app: Express) {

  // Health check for AI service
  app.get("/api/ai-analyze/health", (req, res) => {
    const hasApiKey = !!process.env.ANTHROPIC_API_KEY;
    res.json({ 
      status: hasApiKey ? "ready" : "missing_api_key",
      message: hasApiKey ? "AI analysis service is ready" : "ANTHROPIC_API_KEY not configured"
    });
  });

  // Main analysis endpoint
  app.post("/api/ai-analyze", async (req, res) => {
    try {
      const { type, data, userId } = req.body as AnalysisRequest;

      // Validate request
      if (!type || !data) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields: type and data"
        });
      }

      if (!systemPrompts[type]) {
        return res.status(400).json({
          success: false,
          error: `Invalid analysis type: ${type}. Valid types: ${Object.keys(systemPrompts).join(", ")}`
        });
      }

      // Check API key
      if (!process.env.ANTHROPIC_API_KEY) {
        return res.status(503).json({
          success: false,
          error: "AI service not configured. Please contact support."
        });
      }

      // Format data for the prompt
      const userContent = formatDataForPrompt(type, data);

      // Call Claude API
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        system: systemPrompts[type],
        messages: [
          {
            role: "user",
            content: userContent
          }
        ]
      });

      // Extract text response
      const textContent = message.content.find(block => block.type === "text");
      if (!textContent || textContent.type !== "text") {
        throw new Error("No text response from AI");
      }

      // Try to parse as JSON for structured response
      let structured: Record<string, any> | undefined;
      try {
        // Remove markdown code blocks if present
        let jsonText = textContent.text;
        if (jsonText.includes("```json")) {
          jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
        } else if (jsonText.includes("```")) {
          jsonText = jsonText.replace(/```\n?/g, "");
        }
        structured = JSON.parse(jsonText.trim());
      } catch (e) {
        // If not valid JSON, that's okay - we'll return the raw text
        console.log("Response is not JSON, returning as text");
      }

      const response: AnalysisResponse = {
        success: true,
        analysis: textContent.text,
        structured
      };

      res.json(response);

    } catch (error: any) {
      console.error("AI Analysis error:", error);

      // Handle specific Anthropic errors
      if (error.status === 401) {
        return res.status(503).json({
          success: false,
          error: "AI service authentication failed. Please contact support."
        });
      }

      if (error.status === 429) {
        return res.status(429).json({
          success: false,
          error: "AI service is busy. Please try again in a moment."
        });
      }

      res.status(500).json({
        success: false,
        error: "Failed to generate analysis. Please try again."
      });
    }
  });
}