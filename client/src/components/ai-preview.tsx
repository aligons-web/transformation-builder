import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Briefcase, Heart, Zap, Target, Clock, MapPin, ArrowRight, Loader2, CheckCircle2, Lightbulb, Sparkles, RefreshCw, AlertCircle, AlertTriangle, UploadCloud, FileText, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import { useAiAnalysis } from "@/hooks/use-ai-analysis";

// Type for roadmap response
interface RoadmapResponse {
  category?: string;
  strategicInsight?: string;
  preference?: string;
  destination?: string;
  barriers?: string[];
  actionPlan?: Array<{
    phase?: string;
    title?: string;
    description?: string;
  }>;
  keyMetrics?: string[];
  motivationalClose?: string;
}

export function AiPreview() {
  const [category, setCategory] = useState<string>("");
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState<RoadmapResponse | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: number; content: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Data State
  const [purposeData, setPurposeData] = useState<Record<string, string>>({});
  const [analysisData, setAnalysisData] = useState<any>({});
  const [focusData, setFocusData] = useState<any>({});

  const { analyze, isLoading: isGenerating, error, result } = useAiAnalysis();

  // Load all data on mount
  useEffect(() => {
    const loadData = () => {
      try {
        // Purpose
        const purpose = localStorage.getItem("purpose-reflections");
        if (purpose) setPurposeData(JSON.parse(purpose));

        // Analysis
        const preference = localStorage.getItem("analysis-preference");
        const subconscious = localStorage.getItem("analysis-subconscious");
        const skills = localStorage.getItem("analysis-skills");
        const resources = localStorage.getItem("analysis-resources");
        const timeuse = localStorage.getItem("analysis-timeuse");
        const analysisText = localStorage.getItem("analysis-text");

        setAnalysisData({
          preferenceAnswers: preference ? JSON.parse(preference) : {},
          subconsciousAnswers: subconscious ? JSON.parse(subconscious) : {},
          skillsChecked: skills ? JSON.parse(skills) : [],
          resourcesChecked: resources ? JSON.parse(resources) : [],
          timeUseAnswers: timeuse ? JSON.parse(timeuse) : {},
          textAnswers: analysisText ? JSON.parse(analysisText) : {}
        });

        // Focus
        const focusTimeUse = localStorage.getItem("focus-timeuse");
        const focusText = localStorage.getItem("focus-text");

        setFocusData({
          timeUse: focusTimeUse ? JSON.parse(focusTimeUse) : {},
          text: focusText ? JSON.parse(focusText) : {}
        });

        // Check for cached roadmap
        const cachedRoadmap = localStorage.getItem("transformation-roadmap-cache");
        if (cachedRoadmap) {
          try {
            const { result: cached, timestamp, cachedCategory } = JSON.parse(cachedRoadmap);
            const hoursSinceCache = (Date.now() - timestamp) / (1000 * 60 * 60);
            if (hoursSinceCache < 24) {
              setGeneratedRoadmap(cached);
              setCategory(cachedCategory);
            }
          } catch (e) {
            console.error("Failed to parse cached roadmap", e);
          }
        }

      } catch (e) {
        console.error("Error loading data", e);
      }
    };
    loadData();
  }, []);

  // Handle AI result
  useEffect(() => {
    if (result?.structured) {
      const roadmap = result.structured as RoadmapResponse;
      setGeneratedRoadmap(roadmap);

      // Cache the result
      const cacheData = {
        result: roadmap,
        timestamp: Date.now(),
        cachedCategory: category
      };
      localStorage.setItem("transformation-roadmap-cache", JSON.stringify(cacheData));
    }
  }, [result, category]);

  // Calculate Focus Summary Data
  const calculateFocusSummary = () => {
    // Mock default if no data
    if (!focusData.timeUse || Object.keys(focusData.timeUse).length === 0) {
      return [
        { name: "Highly Structured", value: 35, color: "#3b82f6" },
        { name: "Intentional", value: 25, color: "#10b981" },
        { name: "Relax Focused", value: 20, color: "#f97316" },
        { name: "Personal Activity", value: 20, color: "#ef4444" }
      ];
    }
    // Calculate from real data
    const counts = { Routine: 0, Learning: 0, Entertainment: 0, Social: 0 };
    Object.values(focusData.timeUse).forEach((val: any) => {
      if (val in counts) counts[val as keyof typeof counts]++;
    });
    return [
      { name: "Highly Structured", value: counts.Routine || 1, color: "#3b82f6" },
      { name: "Intentional", value: counts.Learning || 1, color: "#10b981" },
      { name: "Relax Focused", value: counts.Entertainment || 1, color: "#f97316" },
      { name: "Personal Activity", value: counts.Social || 1, color: "#ef4444" }
    ];
  };

  const timeUseData = calculateFocusSummary();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      if (file.type !== "application/pdf") return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target?.result as string;
        setUploadedFiles(prev => [
          ...prev.filter(f => f.name !== file.name),
          { name: file.name, size: file.size, content: base64 }
        ]);
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveFile = (name: string) => {
    setUploadedFiles(prev => prev.filter(f => f.name !== name));
  };

  const handleGenerate = async () => {
    if (!category) return;

    localStorage.removeItem("transformation-roadmap-cache");
    setGeneratedRoadmap(null);

    // Extract text from uploaded PDFs server-side
    let extractedDocuments: { fileName: string; text: string }[] = [];
    if (uploadedFiles.length > 0) {
      try {
        const extractRes = await fetch("/api/extract-pdf-text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            files: uploadedFiles.map(f => ({ name: f.name, base64: f.content }))
          })
        });
        if (extractRes.ok) {
          const extractData = await extractRes.json();
          extractedDocuments = extractData.documents || [];
        }
      } catch (err) {
        console.warn("PDF extraction failed, proceeding without documents:", err);
      }
    }

    const roadmapData = {
      category,
      purposeData,
      analysisData,
      focusData,
      uploadedDocuments: extractedDocuments
    };

    await analyze("transformation-roadmap", roadmapData);
  };

  const handleReset = () => {
    localStorage.removeItem("transformation-roadmap-cache");
    setGeneratedRoadmap(null);
    setCategory("");
  };

  return (
    <section className="py-12 bg-muted/30 relative overflow-hidden">
      {/* Decorative blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 space-y-16">

        {/* LocalStorage Warning */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold mb-1">Your data is saved locally in this browser</p>
              <p className="text-amber-700">
                To avoid losing your work, don't clear your browser data or use a different browser/device.
              </p>
            </div>
          </div>
        </div>

        {/* Clarify Focus Summary Section */}
        <div className="max-w-5xl mx-auto">
          <Card className="border-primary/20 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Target className="w-6 h-6 text-primary" />
                Clarify Focus Summary
              </CardTitle>
              <CardDescription>
                A snapshot of your How, When, and Where reflections.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Module 3: How */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 font-semibold text-lg text-primary">
                    <Clock className="w-5 h-5" />
                    <h3>Module 3: How?</h3>
                  </div>
                  <div className="h-[200px] w-full bg-white/50 rounded-lg p-2 border border-border/50">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={timeUseData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {timeUseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p><strong>Time Profile:</strong> Based on your quiz results.</p>
                  </div>
                </div>

                {/* Module 4: When */}
                <div className="space-y-4">
                   <div className="flex items-center gap-2 font-semibold text-lg text-primary">
                    <Zap className="w-5 h-5" />
                    <h3>Module 4: When?</h3>
                  </div>
                  <div className="p-4 rounded-lg bg-yellow-100 border border-yellow-200 text-yellow-800">
                    <p className="font-bold text-sm mb-1">Urgency Level:</p>
                    <p className="text-lg font-heading font-bold">Pending Urgent</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Your Top Barriers:</p>
                    {Object.keys(focusData.text || {}).filter(k => k.startsWith('m4-')).length > 0 ? (
                       <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                         {Object.keys(focusData.text).filter(k => k.startsWith('m4-')).slice(0, 3).map(k => (
                           <li key={k} className="truncate">{focusData.text[k]}</li>
                         ))}
                       </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No barriers recorded yet.</p>
                    )}
                  </div>
                </div>

                {/* Module 5: Where */}
                <div className="space-y-4">
                   <div className="flex items-center gap-2 font-semibold text-lg text-primary">
                    <MapPin className="w-5 h-5" />
                    <h3>Module 5: Where?</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-white/50 rounded-lg border border-border/50">
                      <p className="text-xs font-medium text-primary mb-1">Destinations</p>
                       <p className="text-sm truncate">
                         {focusData.text && focusData.text['m5-0'] ? focusData.text['m5-0'] : "Not yet defined."}
                       </p>
                    </div>
                    <div className="p-3 bg-white/50 rounded-lg border border-border/50">
                      <p className="text-xs font-medium text-primary mb-1">Environment Needs</p>
                      <p className="text-sm truncate">
                        {focusData.text && focusData.text['m5-1'] ? focusData.text['m5-1'] : "Not yet defined."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-4 border-t border-border/50">
                <Button 
                  size="lg" 
                  className="gap-2 font-heading cursor-pointer"
                  onClick={() => setShowInterpretation(!showInterpretation)}
                >
                  <Wand2 className="w-4 h-4" />
                  {showInterpretation ? "Hide Interpretation" : "Interpret Results"}
                </Button>
              </div>

              {showInterpretation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary/5 p-6 rounded-xl border border-primary/20 space-y-4"
                >
                  <h4 className="font-bold text-lg flex items-center gap-2">
                    <Wand2 className="w-5 h-5 text-primary" />
                    AI Interpretation
                  </h4>
                  <p className="text-foreground/80 leading-relaxed">
                    Based on your reflection data, you are showing a strong need for structural change. Your barriers suggest external resistance, but your destination is clear.
                  </p>
                  <p className="text-foreground/80 leading-relaxed">
                    <strong>Recommendation:</strong> Use the roadmap generator below to create a specific plan for your chosen domain.
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>


        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left: Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Transformation <br />
              <span className="text-primary">Roadmap/Framework</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Select a life domain you want to transform. Our AI engine analyzes your inputs from Discover Purpose, Analyze Change, and Clarify Focus to generate a personalized roadmap.
            </p>

            <div className="space-y-5">

              {/* Personal Advancement */}
              <div className="flex gap-4 p-5 rounded-xl bg-white border border-border/50 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Personal Advancement</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Personal advancement focuses on growing who you are — your mindset, habits, relationships, health, and emotional well-being. It is the intentional work of becoming a better version of yourself in the areas of life that matter most. This domain is for anyone ready to break old patterns and build a life aligned with their values and purpose.
                  </p>
                  <p className="text-sm text-primary/80 mt-2 italic font-bold">
                    Example: Committing to a daily discipline of physical exercise, journaling, and meaningful relationships to build lasting confidence and emotional resilience.
                  </p>
                </div>
              </div>

              {/* Professional Reinvention */}
              <div className="flex gap-4 p-5 rounded-xl bg-white border border-border/50 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Professional Reinvention</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Professional reinvention is the process of reshaping your career, business, or vocational calling to reflect your true gifts and direction. It may involve transitioning industries, launching a venture, developing new skills, or redefining your leadership identity. This domain is for those who sense that their work should be more meaningful, impactful, or fulfilling than it currently is.
                  </p>
                  <p className="text-sm text-primary/80 mt-2 italic font-bold">
                    Example: Leaving a corporate career to launch a coaching practice that leverages your expertise and life experience to help others navigate major transitions.
                  </p>
                </div>
              </div>

              {/* Spiritual Awareness */}
              <div className="flex gap-4 p-5 rounded-xl bg-white border border-border/50 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Spiritual Awareness</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Spiritual awareness is the deepening of your understanding of who you are, why you are here, and how you are connected to something greater than yourself. It encompasses faith, inner peace, moral clarity, and a sense of divine purpose that guides your decisions. This domain is for those seeking to move beyond surface-level living and anchor their transformation in a deeper, lasting truth.
                  </p>
                  <p className="text-sm text-primary/80 mt-2 italic font-bold">
                    Example: Developing a consistent practice of prayer, study, and reflection that brings clarity to your calling and shapes the way you lead, love, and serve others.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Interface */}
          <div className="lg:w-1/2 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Card className="p-8 shadow-2xl border-border/50 bg-white/80 backdrop-blur-xl rounded-3xl min-h-[500px]">
                {!generatedRoadmap ? (
                  <>
                    <div className="flex items-center gap-2 mb-8">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>

                    <div className="space-y-6">

                      {/* Upload Instructions */}
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
                        <p className="text-base font-semibold text-foreground leading-relaxed">
                          Upload all assessments, questionnaires, exercises, quizzes, and reflection assignments to create a more complete picture of your transformation journey and the framework guiding it.
                        </p>
                        <p className="text-base font-semibold text-foreground leading-relaxed">
                          Including these materials in the roadmap/framework assessment provides valuable context about your current strengths, needs, progress, and areas for growth.
                        </p>
                        <p className="text-base font-semibold text-foreground leading-relaxed">
                          It also helps identify patterns, clarify priorities, and ensure that the roadmap is personalized, actionable, and aligned with your goals.
                        </p>

                        {/* Upload Button */}
                        <div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf"
                            multiple
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full gap-2 border-dashed border-primary/40 hover:border-primary hover:bg-primary/5 cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <UploadCloud className="w-4 h-4 text-primary" />
                            Upload PDF Documents
                          </Button>
                        </div>

                        {/* Uploaded Files List */}
                        {uploadedFiles.length > 0 && (
                          <ul className="space-y-2">
                            {uploadedFiles.map(file => (
                              <li key={file.name} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white/70 border border-border/50">
                                <div className="flex items-center gap-2 min-w-0">
                                  <FileText className="w-4 h-4 text-primary shrink-0" />
                                  <span className="text-xs text-foreground truncate">{file.name}</span>
                                </div>
                                <button
                                  onClick={() => handleRemoveFile(file.name)}
                                  className="text-muted-foreground hover:text-destructive transition-colors shrink-0 cursor-pointer"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Select Category</label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger className="h-12 bg-white/50 border-primary/20 focus:ring-primary">
                            <SelectValue placeholder="Choose area of focus..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Personal Advancement">Personal Advancement</SelectItem>
                            <SelectItem value="Professional Reinvention">Professional Reinvention</SelectItem>
                            <SelectItem value="Spiritual Awareness">Spiritual Awareness</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="p-6 rounded-xl bg-muted/50 border border-dashed border-muted-foreground/20 min-h-[120px] flex flex-col items-center justify-center text-center gap-3">
                        {category ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-left w-full"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Wand2 className="w-4 h-4 text-primary animate-pulse" />
                              <span className="text-sm font-medium text-primary">Ready to Synthesize</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              We have analyzed your <strong>{Object.keys(purposeData).filter(k => purposeData[k]).length}</strong> journal entries, 
                              your preference data, and your focus plan.
                            </p>
                          </motion.div>
                        ) : (
                          <>
                            <Wand2 className="w-8 h-8 text-muted-foreground/50" />
                            <p className="text-sm text-muted-foreground/80">Select a category to begin synthesis</p>
                          </>
                        )}
                      </div>

                      {/* Error State */}
                      {error && (
                        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-red-800">Generation Failed</p>
                              <p className="text-sm text-red-700">{error}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <Button 
                        onClick={handleGenerate}
                        disabled={isGenerating || !category}
                        className="w-full h-12 text-lg font-medium bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 cursor-pointer"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Generating Roadmap...
                          </>
                        ) : (
                          "Generate Roadmap/Framework"
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-2">
                         <Sparkles className="w-5 h-5 text-primary" />
                         <h3 className="text-xl font-heading font-bold">Your Roadmap</h3>
                      </div>
                      <Button variant="ghost" size="sm" onClick={handleReset} className="cursor-pointer">
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Reset
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {/* Strategic Insight */}
                      {generatedRoadmap.strategicInsight && (
                        <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                          <h4 className="font-bold text-primary mb-1">Strategic Insight</h4>
                          <p className="text-sm text-foreground/80">{generatedRoadmap.strategicInsight}</p>
                        </div>
                      )}

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-3 bg-white/50 rounded border">
                           <p className="text-xs text-muted-foreground font-bold uppercase">Preference</p>
                           <p className="font-medium">{generatedRoadmap.preference || "Mixed"}</p>
                         </div>
                         <div className="p-3 bg-white/50 rounded border">
                           <p className="text-xs text-muted-foreground font-bold uppercase">Destination</p>
                           <p className="font-medium truncate">{generatedRoadmap.destination || "Purpose & Impact"}</p>
                         </div>
                      </div>

                      {/* Action Plan */}
                      {generatedRoadmap.actionPlan && generatedRoadmap.actionPlan.length > 0 && (
                        <div>
                          <h4 className="font-bold text-sm mb-2">Action Plan</h4>
                          <ul className="space-y-2">
                            {generatedRoadmap.actionPlan.map((action, i) => (
                              <li key={i} className="flex gap-2 text-sm items-start">
                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                <div>
                                  <span className="font-medium text-primary">{action.phase}:</span>{" "}
                                  <span className="font-medium">{action.title}</span>
                                  {action.description && (
                                    <p className="text-muted-foreground text-xs mt-0.5">{action.description}</p>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Key Metrics */}
                      {generatedRoadmap.keyMetrics && generatedRoadmap.keyMetrics.length > 0 && (
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                          <h4 className="font-bold text-sm text-blue-800 mb-2">Success Metrics</h4>
                          <ul className="space-y-1">
                            {generatedRoadmap.keyMetrics.map((metric, i) => (
                              <li key={i} className="text-xs text-blue-700 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                                {metric}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Motivational Close */}
                      {generatedRoadmap.motivationalClose && (
                        <div className="p-3 bg-gradient-to-r from-primary/10 to-purple-100 rounded-lg">
                          <p className="text-sm text-foreground/80 italic">
                            "{generatedRoadmap.motivationalClose}"
                          </p>
                        </div>
                      )}

                      <Button className="w-full mt-4 cursor-pointer" variant="outline">
                        <DownloadIcon className="w-4 h-4 mr-2" />
                        Save Roadmap
                      </Button>
                    </div>
                  </motion.div>
                )}
              </Card>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/30 rounded-full blur-xl -z-10" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 rounded-full blur-xl -z-10" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

function DownloadIcon(props: any) {
  return (
    <svg
      {...props}
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}