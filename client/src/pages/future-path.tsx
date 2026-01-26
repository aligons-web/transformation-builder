import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, ArrowRight, Bot, Loader2, BookOpen, Briefcase, Cpu, GraduationCap, Heart, Globe, TrendingUp, Users, RefreshCw, AlertCircle, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAiAnalysis, FuturePathResult } from "@/hooks/use-ai-analysis";
import { Link } from "wouter";

export default function FuturePathPage() {
  const [activePersona, setActivePersona] = useState("all");
  const [hasAnalysisData, setHasAnalysisData] = useState(false);
  const [analysisData, setAnalysisData] = useState<Record<string, any>>({});
  const [cachedResult, setCachedResult] = useState<FuturePathResult | null>(null);

  const { analyze, isLoading, error, result } = useAiAnalysis();

  const personas = [
    { id: "all", label: "Holistic View" },
    { id: "student", label: "College Students" },
    { id: "professional", label: "Professionals" },
    { id: "entrepreneur", label: "Entrepreneurs" },
    { id: "retiree", label: "Retirees" },
    { id: "veteran", label: "Veterans" }
  ];

  // Load analysis data from localStorage
  useEffect(() => {
    const loadData = () => {
      const data: Record<string, any> = {};

      const keys = [
        { key: "analysis-subconscious", name: "subconsciousAnswers" },
        { key: "analysis-preference", name: "preferenceAnswers" },
        { key: "analysis-timeuse", name: "timeUseAnswers" },
        { key: "analysis-skills", name: "skillsChecked" },
        { key: "analysis-resources", name: "resourcesChecked" },
        { key: "analysis-success", name: "successChecked" },
      ];

      let hasData = false;

      keys.forEach(({ key, name }) => {
        const saved = localStorage.getItem(key);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            data[name] = parsed;

            // Check if there's actual content
            if (Array.isArray(parsed) && parsed.length > 0) hasData = true;
            if (typeof parsed === "object" && Object.keys(parsed).length > 0) hasData = true;
          } catch (e) {
            console.error(`Failed to parse ${key}`, e);
          }
        }
      });

      setAnalysisData(data);
      setHasAnalysisData(hasData);
    };

    loadData();
  }, []);

  // Check for cached AI result
  useEffect(() => {
    const cached = localStorage.getItem("future-path-cache");
    if (cached) {
      try {
        const { result: cachedData, timestamp, dataHash } = JSON.parse(cached);
        const currentHash = JSON.stringify(analysisData);
        const hoursSinceCache = (Date.now() - timestamp) / (1000 * 60 * 60);

        // Use cache if less than 24 hours old and data hasn't changed
        if (hoursSinceCache < 24 && dataHash === currentHash) {
          setCachedResult(cachedData);
          return;
        }
      } catch (e) {
        console.error("Failed to parse cached result", e);
      }
    }
  }, [analysisData]);

  // Trigger AI analysis when data is loaded
  useEffect(() => {
    if (hasAnalysisData && !cachedResult && !isLoading && !result) {
      runAnalysis();
    }
  }, [hasAnalysisData, cachedResult]);

  // Cache successful results
  useEffect(() => {
    if (result?.structured) {
      const cacheData = {
        result: result.structured,
        timestamp: Date.now(),
        dataHash: JSON.stringify(analysisData)
      };
      localStorage.setItem("future-path-cache", JSON.stringify(cacheData));
      setCachedResult(result.structured as FuturePathResult);
    }
  }, [result]);

  const runAnalysis = async () => {
    await analyze("future-path", { 
      ...analysisData,
      persona: activePersona 
    });
  };

  const handleRegenerate = () => {
    localStorage.removeItem("future-path-cache");
    setCachedResult(null);
    runAnalysis();
  };

  // Get the path result (from cache or fresh result)
  const pathResult = cachedResult || (result?.structured as FuturePathResult);

  // Icon mapping for insights
  const insightIcons: Record<string, React.ReactNode> = {
    churchMinistry: <Users className="w-5 h-5 text-indigo-500" />,
    businessDevelopment: <Briefcase className="w-5 h-5 text-blue-500" />,
    technologyAi: <Cpu className="w-5 h-5 text-emerald-500" />,
    socialMedia: <Globe className="w-5 h-5 text-purple-500" />,
    higherEducation: <GraduationCap className="w-5 h-5 text-orange-500" />
  };

  const insightTitles: Record<string, string> = {
    churchMinistry: "Church Ministry & Spirituality",
    businessDevelopment: "Business Development",
    technologyAi: "Technology & AI",
    socialMedia: "Social Media & Community",
    higherEducation: "Higher Education & Learning"
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <div className="flex-1 md:ml-64 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-8 overflow-y-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">Future Path Analysis</h1>
              <p className="text-muted-foreground">AI-driven interpretation of your transformation journey.</p>
            </div>
          </div>

          {/* LocalStorage Warning */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold mb-1">Your data is saved locally in this browser</p>
              <p className="text-amber-700">
                To avoid losing your work, don't clear your browser data or use a different browser/device.
              </p>
            </div>
          </div>

          {/* No Data State */}
          {!hasAnalysisData && !isLoading && (
            <div className="h-[50vh] flex flex-col items-center justify-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <Bot className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">No Analysis Data Yet</h3>
                <p className="text-muted-foreground max-w-md">
                  Complete the "Analyze Change" assessment first to receive your personalized future path analysis.
                </p>
              </div>
              <Link href="/dashboard/analysis">
                <Button size="lg" className="gap-2 cursor-pointer">
                  Go to Analyze Change
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="h-[60vh] flex flex-col items-center justify-center space-y-8">
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full"
                />
                <Bot className="w-10 h-10 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold animate-pulse">Synthesizing Your Transformation Data...</h3>
                <p className="text-muted-foreground max-w-md">
                  Analyzing your quiz responses, skills, and preferences to forecast your future path.
                </p>
              </div>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="animate-bounce delay-75">Processing Preferences</Badge>
                <Badge variant="outline" className="animate-bounce delay-150">Mapping Skills</Badge>
                <Badge variant="outline" className="animate-bounce delay-300">Forecasting Paths</Badge>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && hasAnalysisData && (
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
          )}

          {/* Results */}
          {pathResult && !isLoading && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

              {/* Hero Insight Card */}
              <Card className="bg-gradient-to-r from-primary/10 via-background to-background border-primary/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Sparkles className="w-6 h-6 text-primary" />
                    Your Transformation Trajectory
                  </CardTitle>
                  <CardDescription>Based on your analysis data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  {pathResult.transformationArchetype && (
                    <p className="text-lg text-foreground/90 leading-relaxed">
                      You are positioned as a <span className="font-bold text-primary">"{pathResult.transformationArchetype}"</span>.
                    </p>
                  )}
                  {pathResult.archetypeBadges && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {pathResult.archetypeBadges.map((badge, i) => (
                        <Badge key={i} className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Persona Filter */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-heading font-bold">Tailored Future Insights</h3>
                </div>
                <Tabs value={activePersona} onValueChange={setActivePersona} className="w-full">
                  <TabsList className="w-full h-auto flex-wrap justify-start bg-muted/50 p-1 mb-6">
                    {personas.map(p => (
                      <TabsTrigger key={p.id} value={p.id} className="px-4 py-2">{p.label}</TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value={activePersona} className="mt-0">
                    <Card className="bg-blue-50/30 border-blue-100">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-blue-100 rounded-full text-blue-600 mt-1">
                            <Bot className="w-6 h-6" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-lg text-blue-900">
                              {activePersona === 'all' ? "Comprehensive Analysis" : `Insight for ${personas.find(p => p.id === activePersona)?.label}`}
                            </h4>
                            <p className="text-blue-800/80 leading-relaxed">
                              {pathResult.personaInsight || "Your unique combination of skills and preferences positions you for meaningful impact across multiple domains."}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Future Trends Grid */}
              {pathResult.insights && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(pathResult.insights).map(([key, insight], i) => (
                    <motion.div 
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-md transition-shadow duration-300">
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center gap-3 text-lg">
                            <div className="p-2 bg-muted rounded-lg">
                              {insightIcons[key] || <Sparkles className="w-5 h-5 text-primary" />}
                            </div>
                            {insightTitles[key] || key}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground">{insight.insight}</p>
                          {insight.recommendation && (
                            <div className="bg-primary/5 p-3 rounded-md border-l-2 border-primary">
                              <p className="text-xs font-medium text-primary/80">
                                <span className="font-bold mr-1">Recommendation:</span> 
                                {insight.recommendation}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Strategic Next Steps */}
              {pathResult.strategicNextSteps && (
                <Card className="bg-slate-900 text-slate-50 border-none">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      Strategic Next Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {pathResult.strategicNextSteps.immediate && (
                        <div className="space-y-2">
                          <div className="text-green-400 font-mono text-sm mb-1">01. IMMEDIATE</div>
                          <h4 className="font-bold">{pathResult.strategicNextSteps.immediate.title}</h4>
                          <p className="text-sm text-slate-400">{pathResult.strategicNextSteps.immediate.description}</p>
                        </div>
                      )}
                      {pathResult.strategicNextSteps.shortTerm && (
                        <div className="space-y-2">
                          <div className="text-blue-400 font-mono text-sm mb-1">02. SHORT TERM</div>
                          <h4 className="font-bold">{pathResult.strategicNextSteps.shortTerm.title}</h4>
                          <p className="text-sm text-slate-400">{pathResult.strategicNextSteps.shortTerm.description}</p>
                        </div>
                      )}
                      {pathResult.strategicNextSteps.longTerm && (
                        <div className="space-y-2">
                          <div className="text-purple-400 font-mono text-sm mb-1">03. LONG TERM</div>
                          <h4 className="font-bold">{pathResult.strategicNextSteps.longTerm.title}</h4>
                          <p className="text-sm text-slate-400">{pathResult.strategicNextSteps.longTerm.description}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Regenerate & Continue Buttons */}
              <div className="flex flex-col items-center gap-4 pt-8">
                <Button 
                  variant="outline" 
                  onClick={handleRegenerate}
                  disabled={isLoading}
                  className="gap-2 cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Regenerate Analysis
                </Button>

                <Link href="/dashboard/actionable-focus">
                  <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-white cursor-pointer">
                    <BookOpen className="w-4 h-4" />
                    Continue to Clarify Focus
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}