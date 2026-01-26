import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowLeft, Printer, Target, Lightbulb, MapPin, Zap, Clock, Brain, Compass, Sparkles, Wand2, ArrowRight, RefreshCw, AlertCircle, AlertTriangle, Loader2 } from "lucide-react";
import { modules } from "@/lib/purpose-modules";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis } from "recharts";
import { useAiAnalysis } from "@/hooks/use-ai-analysis";

// Type for the AI summary response
interface TransformationSummaryResponse {
  purposeSynthesis?: string;
  purpose_synthesis?: string;
  strengthsProfile?: string[];
  strengths_profile?: string[];
  growthAreas?: string[];
  growth_areas?: string[];
  strategicRecommendation?: string;
  strategic_recommendation?: string;
  actionPlan?: {
    week1_2?: string[];
    month1?: string[];
    month2_3?: string[];
  };
  action_plan?: {
    week1_2?: string[];
    month1?: string[];
    month2_3?: string[];
  };
  successMetrics?: string[];
  success_metrics?: string[];
}

// Normalize response to handle both snake_case and camelCase
function normalizeResponse(data: TransformationSummaryResponse) {
  return {
    purposeSynthesis: data.purposeSynthesis || data.purpose_synthesis || "",
    strengthsProfile: data.strengthsProfile || data.strengths_profile || [],
    growthAreas: data.growthAreas || data.growth_areas || [],
    strategicRecommendation: data.strategicRecommendation || data.strategic_recommendation || "",
    actionPlan: data.actionPlan || data.action_plan || {},
    successMetrics: data.successMetrics || data.success_metrics || []
  };
}

export default function FinalSummaryPage() {
  // Purpose data
  const [purposeAnswers, setPurposeAnswers] = useState<Record<string, string>>({});

  // Analysis data
  const [preferenceAnswers, setPreferenceAnswers] = useState<Record<number, string>>({});
  const [subconsciousAnswers, setSubconsciousAnswers] = useState<Record<number, string>>({});
  const [timeUseAnswers, setTimeUseAnswers] = useState<Record<number, string>>({});
  const [skillsChecked, setSkillsChecked] = useState<string[]>([]);
  const [resourcesChecked, setResourcesChecked] = useState<string[]>([]);

  // Focus data
  const [focusTimeUse, setFocusTimeUse] = useState<Record<number, string>>({});
  const [focusText, setFocusText] = useState<Record<string, string>>({});

  // AI state
  const [cachedResult, setCachedResult] = useState<TransformationSummaryResponse | null>(null);
  const [hasData, setHasData] = useState(false);

  const { analyze, isLoading, error, result } = useAiAnalysis();

  // Load all data from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        // Purpose reflections
        const purpose = localStorage.getItem("purpose-reflections");
        if (purpose) {
          const parsed = JSON.parse(purpose);
          setPurposeAnswers(parsed);
        }

        // Analysis data
        const pref = localStorage.getItem("analysis-preference");
        if (pref) setPreferenceAnswers(JSON.parse(pref));

        const sub = localStorage.getItem("analysis-subconscious");
        if (sub) setSubconsciousAnswers(JSON.parse(sub));

        const timeUse = localStorage.getItem("analysis-timeuse");
        if (timeUse) setTimeUseAnswers(JSON.parse(timeUse));

        const skills = localStorage.getItem("analysis-skills");
        if (skills) setSkillsChecked(JSON.parse(skills));

        const resources = localStorage.getItem("analysis-resources");
        if (resources) setResourcesChecked(JSON.parse(resources));

        // Focus data
        const focusTime = localStorage.getItem("focus-timeuse");
        if (focusTime) setFocusTimeUse(JSON.parse(focusTime));

        const focusTxt = localStorage.getItem("focus-text");
        if (focusTxt) setFocusText(JSON.parse(focusTxt));

        // Check if we have enough data
        const hasPurpose = purpose && Object.keys(JSON.parse(purpose)).length > 0;
        const hasAnalysis = pref || sub || timeUse;
        setHasData(Boolean(hasPurpose || hasAnalysis));

        // Check for cached result
        const cached = localStorage.getItem("final-summary-cache");
        if (cached) {
          const { result: cachedData, timestamp } = JSON.parse(cached);
          const hoursSinceCache = (Date.now() - timestamp) / (1000 * 60 * 60);
          if (hoursSinceCache < 24) {
            setCachedResult(cachedData);
          }
        }
      } catch (e) {
        console.error("Error loading data", e);
      }
    };

    loadData();
  }, []);

  // Trigger AI analysis when data is loaded
  useEffect(() => {
    if (hasData && !cachedResult && !isLoading && !result) {
      runAnalysis();
    }
  }, [hasData, cachedResult]);

  // Cache successful results
  useEffect(() => {
    if (result?.structured) {
      const cacheData = {
        result: result.structured,
        timestamp: Date.now()
      };
      localStorage.setItem("final-summary-cache", JSON.stringify(cacheData));
      setCachedResult(result.structured as TransformationSummaryResponse);
    }
  }, [result]);

  const runAnalysis = async () => {
    const summaryData = {
      purposeReflections: {
        reflections: purposeAnswers,
        modules
      },
      analysisData: {
        preferenceAnswers,
        subconsciousAnswers,
        timeUseAnswers,
        skillsChecked,
        resourcesChecked
      },
      focusData: {
        timeUse: focusTimeUse,
        text: focusText
      }
    };

    await analyze("transformation-summary", summaryData);
  };

  const handleRegenerate = () => {
    localStorage.removeItem("final-summary-cache");
    setCachedResult(null);
    runAnalysis();
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculate preference data from real answers
  const calculatePreferenceData = () => {
    const counts = { People: 0, Things: 0, Data: 0, Mixed: 0 };
    Object.values(preferenceAnswers).forEach(val => {
      if (val in counts) counts[val as keyof typeof counts]++;
    });

    const hasData = Object.values(counts).some(v => v > 0);
    if (!hasData) {
      return [
        { name: "People", value: 25, color: "#f97316" },
        { name: "Things", value: 25, color: "#3b82f6" },
        { name: "Data", value: 25, color: "#8b5cf6" },
        { name: "Mixed", value: 25, color: "#10b981" }
      ];
    }

    return [
      { name: "People", value: counts.People || 0, color: "#f97316" },
      { name: "Things", value: counts.Things || 0, color: "#3b82f6" },
      { name: "Data", value: counts.Data || 0, color: "#8b5cf6" },
      { name: "Mixed", value: counts.Mixed || 0, color: "#10b981" }
    ];
  };

  // Calculate time use data from real answers
  const calculateTimeUseData = () => {
    const counts = { Routine: 0, Learning: 0, Entertainment: 0, Social: 0 };

    // Combine both analysis and focus time use answers
    [...Object.values(timeUseAnswers), ...Object.values(focusTimeUse)].forEach(val => {
      if (val in counts) counts[val as keyof typeof counts]++;
    });

    const hasData = Object.values(counts).some(v => v > 0);
    if (!hasData) {
      return [
        { name: "Structured", value: 25, color: "#3b82f6" },
        { name: "Learning", value: 25, color: "#10b981" },
        { name: "Relaxation", value: 25, color: "#f97316" },
        { name: "Social", value: 25, color: "#ef4444" }
      ];
    }

    return [
      { name: "Structured", value: counts.Routine || 0, color: "#3b82f6" },
      { name: "Learning", value: counts.Learning || 0, color: "#10b981" },
      { name: "Relaxation", value: counts.Entertainment || 0, color: "#f97316" },
      { name: "Social", value: counts.Social || 0, color: "#ef4444" }
    ];
  };

  // Get dominant preference
  const getDominantPreference = () => {
    const data = calculatePreferenceData();
    const sorted = [...data].sort((a, b) => b.value - a.value);
    return sorted[0]?.name || "Mixed";
  };

  // Get dominant time style
  const getDominantTimeStyle = () => {
    const data = calculateTimeUseData();
    const sorted = [...data].sort((a, b) => b.value - a.value);
    return sorted[0]?.name || "Balanced";
  };

  // Get barriers from focus text
  const getBarriers = () => {
    const barriers = Object.entries(focusText)
      .filter(([key, value]) => key.startsWith('m4-') && value)
      .map(([_, value]) => value)
      .slice(0, 3);
    return barriers.length > 0 ? barriers : ["Not yet defined"];
  };

  // Get destination from focus text
  const getDestination = () => {
    return focusText['m5-0'] || "Not yet defined";
  };

  // Get environment from focus text
  const getEnvironment = () => {
    return focusText['m5-1'] || "Not yet defined";
  };

  const preferenceData = calculatePreferenceData();
  const timeUseData = calculateTimeUseData();

  // Get normalized AI result
  const rawData = cachedResult || (result?.structured as TransformationSummaryResponse);
  const aiSummary = rawData ? normalizeResponse(rawData) : null;

  return (
    <div className="min-h-screen bg-background font-sans print:bg-white">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="container mx-auto px-4 pt-24 pb-12 print:pt-8 print:max-w-none">
        <div className="max-w-6xl mx-auto mb-8 print:mb-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-6 gap-2 print:hidden hover:bg-transparent hover:text-primary p-0 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 print:mb-6">
            <div>
              <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5 px-4 py-1 print:hidden">
                Your Complete Journey
              </Badge>
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
                Transformation <span className="text-primary font-serif italic">BluePrint</span>
              </h1>
              <p className="text-muted-foreground mt-4 text-lg max-w-2xl print:text-gray-600">
                A comprehensive view of your Purpose, Change Analysis, and Actionable Focus, leading to your personalized Roadmap.
              </p>
            </div>
            <div className="flex gap-3 print:hidden">
              <Button variant="outline" className="gap-2 cursor-pointer" onClick={handlePrint}>
                <Printer className="w-4 h-4" />
                Print
              </Button>
            </div>
          </div>

          {/* LocalStorage Warning */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 print:hidden">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold mb-1">Your data is saved locally in this browser</p>
              <p className="text-amber-700">
                Use the Print button to save a permanent copy of your transformation blueprint.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-16 print:space-y-8">

          {/* SECTION 1: DISCOVER PURPOSE */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 border-b border-border pb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Compass className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold">Step 1: Discover Purpose</h2>
                <p className="text-muted-foreground">Key insights from your guided journaling.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.slice(0, 4).map((module) => {
                 const firstQuestion = module.questions[0];
                 const key = `${module.id}-0`;
                 const answer = purposeAnswers[key];

                 return (
                   <Card key={module.id} className="bg-card/50 backdrop-blur-sm">
                     <CardHeader className="pb-2">
                       <CardTitle className="text-lg font-medium text-primary">{module.title}</CardTitle>
                     </CardHeader>
                     <CardContent>
                       <p className="text-sm font-medium mb-2 text-muted-foreground">{firstQuestion}</p>
                       <div className="text-sm italic text-foreground/80 bg-muted/30 p-3 rounded border-l-2 border-primary/30 min-h-[60px]">
                         {answer ? (
                           answer.length > 200 ? answer.substring(0, 200) + "..." : answer
                         ) : (
                           <span className="text-muted-foreground">No entry recorded yet.</span>
                         )}
                       </div>
                     </CardContent>
                   </Card>
                 );
              })}
            </div>
            <div className="flex justify-center">
               <Link href="/discover-purpose/summary">
                 <Button variant="link" className="text-primary cursor-pointer">View Full Purpose Summary <ArrowRight className="w-4 h-4 ml-1"/></Button>
               </Link>
            </div>
          </section>

          {/* SECTION 2: ANALYZE CHANGE */}
          <section className="space-y-6">
             <div className="flex items-center gap-4 border-b border-border pb-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Brain className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold">Step 2: Analyze Change</h2>
                <p className="text-muted-foreground">Understanding your patterns and subconscious drivers.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Work & Interaction Style</CardTitle>
                  <CardDescription>Your preference for People, Things, or Data.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={preferenceData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip cursor={{fill: 'transparent'}} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {preferenceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                 <CardHeader>
                  <CardTitle>Skills & Growth Areas</CardTitle>
                  <CardDescription>Your identified strengths and development needs.</CardDescription>
                </CardHeader>
                <CardContent>
                  {skillsChecked.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {skillsChecked.map((skill) => (
                        <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm bg-primary/5 hover:bg-primary/10 text-primary border-primary/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground mb-6 italic">No skills selected yet. Complete the Analysis step.</p>
                  )}

                  {resourcesChecked.length > 0 && (
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                      <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> Resource Gaps
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {resourcesChecked.map((resource) => (
                          <Badge key={resource} variant="outline" className="text-amber-700 border-amber-300 bg-amber-50">
                            {resource}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-lg">
                    <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" /> Insight
                    </h4>
                    <p className="text-sm text-orange-800/80">
                      Your preference for <strong>{getDominantPreference()}</strong> combined with your <strong>{getDominantTimeStyle()}</strong> time style suggests focusing on roles that align with these natural tendencies.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* SECTION 3: CLARIFY FOCUS */}
          <section className="space-y-6">
             <div className="flex items-center gap-4 border-b border-border pb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold">Step 3: Clarify Focus</h2>
                <p className="text-muted-foreground">Your actionable plan: How, When, and Where.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Module 3: How */}
                <Card className="border-t-4 border-t-blue-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Clock className="w-5 h-5 text-blue-500" />
                      How?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="h-[150px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={timeUseData}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={50}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {timeUseData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                        {getDominantTimeStyle()}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Module 4: When */}
                <Card className="border-t-4 border-t-yellow-500">
                   <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      When?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100 text-center">
                        <p className="text-xs uppercase tracking-wider text-yellow-600 font-bold mb-1">Key Barriers</p>
                     </div>
                     <div className="space-y-2">
                        <ul className="text-sm text-foreground/80 space-y-2">
                          {getBarriers().map((barrier, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 shrink-0"></span>
                              <span className="line-clamp-2">{barrier}</span>
                            </li>
                          ))}
                        </ul>
                     </div>
                  </CardContent>
                </Card>

                {/* Module 5: Where */}
                <Card className="border-t-4 border-t-green-500">
                   <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MapPin className="w-5 h-5 text-green-500" />
                      Where?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="space-y-3">
                        <div>
                           <p className="text-xs font-bold text-green-600 mb-1">DESTINATION</p>
                           <p className="text-sm bg-green-50 p-2 rounded border border-green-100 line-clamp-2">
                             {getDestination()}
                           </p>
                        </div>
                        <div>
                           <p className="text-xs font-bold text-green-600 mb-1">ENVIRONMENT</p>
                           <p className="text-sm bg-green-50 p-2 rounded border border-green-100 line-clamp-2">
                             {getEnvironment()}
                           </p>
                        </div>
                     </div>
                  </CardContent>
                </Card>
            </div>
          </section>

          {/* SECTION 4: AI-GENERATED ROADMAP */}
          <section className="py-12 bg-primary/5 -mx-4 px-4 md:-mx-12 md:px-12 rounded-3xl border border-primary/10">
             <div className="max-w-4xl mx-auto text-center mb-12">
                <Badge className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90">AI-Powered Analysis</Badge>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Your Projected Roadmap</h2>
                <p className="text-lg text-muted-foreground">
                  Synthesizing your Purpose, Skills, and Focus into a clear path forward.
                </p>
             </div>

             {/* Loading State */}
             {isLoading && (
               <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-16 space-y-4">
                 <div className="relative w-16 h-16">
                   <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                   <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                   <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-primary animate-pulse" />
                 </div>
                 <p className="text-lg font-medium text-muted-foreground animate-pulse">
                   Generating your transformation blueprint...
                 </p>
                 <p className="text-sm text-muted-foreground">
                   This may take 15-20 seconds
                 </p>
               </div>
             )}

             {/* Error State */}
             {error && !isLoading && (
               <div className="max-w-2xl mx-auto">
                 <Card className="border-red-200 bg-red-50">
                   <CardContent className="p-6">
                     <div className="flex items-start gap-4">
                       <div className="p-2 bg-red-100 rounded-full">
                         <AlertCircle className="w-6 h-6 text-red-600" />
                       </div>
                       <div className="flex-1">
                         <h3 className="font-semibold text-red-800 mb-2">Analysis Failed</h3>
                         <p className="text-red-700 mb-4">{error}</p>
                         <Button 
                           onClick={handleRegenerate} 
                           variant="outline" 
                           className="gap-2 border-red-300 text-red-700 hover:bg-red-100 cursor-pointer"
                         >
                           <RefreshCw className="w-4 h-4" />
                           Try Again
                         </Button>
                       </div>
                     </div>
                   </CardContent>
                 </Card>
               </div>
             )}

             {/* AI Results */}
             {aiSummary && !isLoading && (
               <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                 {/* Purpose Synthesis */}
                 {aiSummary.purposeSynthesis && (
                   <Card className="bg-background border-primary/20 shadow-lg relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-orange-500"></div>
                     <CardHeader>
                       <CardTitle className="flex items-center gap-2">
                         <Sparkles className="w-5 h-5 text-primary" />
                         Your Purpose Synthesis
                       </CardTitle>
                     </CardHeader>
                     <CardContent>
                       <p className="text-foreground/90 leading-relaxed italic text-lg">
                         "{aiSummary.purposeSynthesis}"
                       </p>
                     </CardContent>
                   </Card>
                 )}

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {/* Strategic Recommendation */}
                   <Card className="bg-background border-primary/20 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                      <CardHeader>
                         <CardTitle className="flex items-center gap-2">
                            <Wand2 className="w-5 h-5 text-primary" />
                            Strategic Recommendation
                         </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                         <p className="text-foreground/80 leading-relaxed">
                            {aiSummary.strategicRecommendation || "Complete all steps to receive your personalized recommendation."}
                         </p>

                         {/* Strengths */}
                         {aiSummary.strengthsProfile && aiSummary.strengthsProfile.length > 0 && (
                           <div>
                             <h4 className="font-semibold text-sm text-primary mb-2">Your Strengths</h4>
                             <ul className="space-y-1">
                               {aiSummary.strengthsProfile.slice(0, 5).map((strength, i) => (
                                 <li key={i} className="flex items-start gap-2 text-sm">
                                   <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                   <span>{strength}</span>
                                 </li>
                               ))}
                             </ul>
                           </div>
                         )}

                         {/* Growth Areas */}
                         {aiSummary.growthAreas && aiSummary.growthAreas.length > 0 && (
                           <div>
                             <h4 className="font-semibold text-sm text-amber-600 mb-2">Growth Areas</h4>
                             <ul className="space-y-1">
                               {aiSummary.growthAreas.slice(0, 3).map((area, i) => (
                                 <li key={i} className="flex items-start gap-2 text-sm">
                                   <Target className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                                   <span>{area}</span>
                                 </li>
                               ))}
                             </ul>
                           </div>
                         )}
                      </CardContent>
                   </Card>

                   {/* Action Plan */}
                   <div className="space-y-4">
                      {aiSummary.actionPlan?.week1_2 && aiSummary.actionPlan.week1_2.length > 0 && (
                        <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-border shadow-sm">
                           <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shrink-0">1</div>
                           <div>
                              <h4 className="font-bold">Week 1-2: Immediate Actions</h4>
                              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                                {aiSummary.actionPlan.week1_2.slice(0, 2).map((action, i) => (
                                  <li key={i}>• {action}</li>
                                ))}
                              </ul>
                           </div>
                        </div>
                      )}

                      {aiSummary.actionPlan?.month1 && aiSummary.actionPlan.month1.length > 0 && (
                        <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-border shadow-sm">
                           <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg shrink-0">2</div>
                           <div>
                              <h4 className="font-bold">Month 1: Short-term Goals</h4>
                              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                                {aiSummary.actionPlan.month1.slice(0, 2).map((goal, i) => (
                                  <li key={i}>• {goal}</li>
                                ))}
                              </ul>
                           </div>
                        </div>
                      )}

                      {aiSummary.actionPlan?.month2_3 && aiSummary.actionPlan.month2_3.length > 0 && (
                        <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-border shadow-sm">
                           <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg shrink-0">3</div>
                           <div>
                              <h4 className="font-bold">Month 2-3: Building Momentum</h4>
                              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                                {aiSummary.actionPlan.month2_3.slice(0, 2).map((action, i) => (
                                  <li key={i}>• {action}</li>
                                ))}
                              </ul>
                           </div>
                        </div>
                      )}
                   </div>
                 </div>

                 {/* Success Metrics */}
                 {aiSummary.successMetrics && aiSummary.successMetrics.length > 0 && (
                   <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                     <CardHeader>
                       <CardTitle className="flex items-center gap-2 text-green-800">
                         <Target className="w-5 h-5" />
                         Success Metrics
                       </CardTitle>
                       <CardDescription className="text-green-700">How you'll know you're on track</CardDescription>
                     </CardHeader>
                     <CardContent>
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                         {aiSummary.successMetrics.map((metric, i) => (
                           <div key={i} className="flex items-center gap-2 p-2 bg-white/60 rounded border border-green-100">
                             <CheckSquare className="w-4 h-4 text-green-600 shrink-0" />
                             <span className="text-sm text-green-800">{metric}</span>
                           </div>
                         ))}
                       </div>
                     </CardContent>
                   </Card>
                 )}

                 {/* Regenerate Button */}
                 <div className="flex justify-center pt-4 print:hidden">
                   <Button 
                     variant="outline" 
                     onClick={handleRegenerate}
                     disabled={isLoading}
                     className="gap-2 cursor-pointer"
                   >
                     <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                     Regenerate Blueprint
                   </Button>
                 </div>
               </div>
             )}

             {/* No Data State */}
             {!hasData && !isLoading && (
               <div className="max-w-2xl mx-auto text-center py-12">
                 <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                   <Compass className="w-8 h-8 text-muted-foreground" />
                 </div>
                 <h3 className="text-xl font-semibold mb-2">Complete Your Journey First</h3>
                 <p className="text-muted-foreground mb-6">
                   To generate your personalized transformation blueprint, complete the Discover Purpose, Analyze Change, and Clarify Focus steps.
                 </p>
                 <Link href="/discover-purpose">
                   <Button className="gap-2 cursor-pointer">
                     Start Your Journey
                     <ArrowRight className="w-4 h-4" />
                   </Button>
                 </Link>
               </div>
             )}
          </section>

        </div>
      </main>
    </div>
  );
}

function CheckSquare({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="9 11 12 14 22 4"></polyline>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </svg>
  )
}