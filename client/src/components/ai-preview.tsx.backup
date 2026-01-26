import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Briefcase, Heart, Zap, Target, Clock, MapPin, ArrowRight, Loader2, CheckCircle2, Lightbulb, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";

export function AiPreview() {
  const [category, setCategory] = useState<string>("");
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState<any>(null);

  // Data State
  const [purposeData, setPurposeData] = useState<Record<string, string>>({});
  const [analysisData, setAnalysisData] = useState<any>({});
  const [focusData, setFocusData] = useState<any>({});

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
        const analysisText = localStorage.getItem("analysis-text");
        
        setAnalysisData({
          preference: preference ? JSON.parse(preference) : {},
          subconscious: subconscious ? JSON.parse(subconscious) : {},
          skills: skills ? JSON.parse(skills) : [],
          text: analysisText ? JSON.parse(analysisText) : {}
        });

        // Focus
        const focusTimeUse = localStorage.getItem("focus-timeuse");
        const focusText = localStorage.getItem("focus-text");

        setFocusData({
          timeUse: focusTimeUse ? JSON.parse(focusTimeUse) : {},
          text: focusText ? JSON.parse(focusText) : {}
        });

      } catch (e) {
        console.error("Error loading data", e);
      }
    };
    loadData();
  }, []);

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

  const handleGenerate = () => {
    if (!category) return;
    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      // Analyze Preference
      const prefCounts = { People: 0, Things: 0, Data: 0, Mixed: 0 };
      if (analysisData.preference) {
         Object.values(analysisData.preference).forEach((val: any) => {
            if (val in prefCounts) prefCounts[val as keyof typeof prefCounts]++;
         });
      }
      const topPreference = Object.keys(prefCounts).reduce((a, b) => prefCounts[a as keyof typeof prefCounts] > prefCounts[b as keyof typeof prefCounts] ? a : b);

      // Analyze Focus
      const barriers = Object.keys(focusData.text || {}).filter(k => k.startsWith('m4-')).map(k => focusData.text[k]).filter(Boolean);
      const destinations = Object.keys(focusData.text || {}).filter(k => k.startsWith('m5-')).map(k => focusData.text[k]).filter(Boolean);

      setGeneratedRoadmap({
        preference: topPreference,
        barriers: barriers.length > 0 ? barriers.slice(0, 2) : ["Uncertainty", "Time management"],
        destinations: destinations.length > 0 ? destinations[0] : "A life of purpose and impact",
        recommendation: category === 'professional' 
          ? `Leverage your natural affinity for ${topPreference} to pivot into a leadership role.` 
          : category === 'personal' 
            ? `Focus on structured habits to overcome your identified barriers.`
            : `Connect your spiritual insights with daily service to others.`
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <section className="py-12 bg-muted/30 relative overflow-hidden">
      {/* Decorative blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 space-y-16">
        
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
                  className="gap-2 font-heading"
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
              <span className="text-primary">Roadmap</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Select a life domain you want to transform. Our AI engine analyzes your inputs from Discover Purpose, Analyze Change, and Clarify Focus to generate a personalized roadmap.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: Heart, text: "Personal Advancement" },
                { icon: Briefcase, text: "Professional Reinvention" },
                { icon: Zap, text: "Spiritual Awareness" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/60 border border-white/60 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interface Mockup */}
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
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Select Category</label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger className="h-12 bg-white/50 border-primary/20 focus:ring-primary">
                            <SelectValue placeholder="Choose area of focus..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="personal">Personal Advancement</SelectItem>
                            <SelectItem value="professional">Professional Reinvention</SelectItem>
                            <SelectItem value="spiritual">Spiritual Awareness</SelectItem>
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
                              We have analyzed your <strong>{Object.keys(purposeData).length}</strong> journal entries, your preference for <strong>{analysisData.preference ? "People/Things/Data" : "Change"}</strong>, and your <strong>{focusData.text ? "Focus Plan" : "Goals"}</strong>.
                            </p>
                          </motion.div>
                        ) : (
                          <>
                            <Wand2 className="w-8 h-8 text-muted-foreground/50" />
                            <p className="text-sm text-muted-foreground/80">Select a category to begin synthesis</p>
                          </>
                        )}
                      </div>

                      <Button 
                        onClick={handleGenerate}
                        disabled={isGenerating || !category}
                        className="w-full h-12 text-lg font-medium bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Synthesizing Data...
                          </>
                        ) : (
                          "Generate Roadmap"
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
                      <Button variant="ghost" size="sm" onClick={() => setGeneratedRoadmap(null)}>Reset</Button>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                        <h4 className="font-bold text-primary mb-1">Strategic Insight</h4>
                        <p className="text-sm text-foreground/80">{generatedRoadmap.recommendation}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-3 bg-white/50 rounded border">
                           <p className="text-xs text-muted-foreground font-bold uppercase">Preference</p>
                           <p className="font-medium">{generatedRoadmap.preference}</p>
                         </div>
                         <div className="p-3 bg-white/50 rounded border">
                           <p className="text-xs text-muted-foreground font-bold uppercase">Destination</p>
                           <p className="font-medium truncate">{generatedRoadmap.destinations}</p>
                         </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm mb-2">Action Plan</h4>
                        <ul className="space-y-2">
                           <li className="flex gap-2 text-sm items-start">
                             <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                             <span>Address barrier: "{generatedRoadmap.barriers[0]}"</span>
                           </li>
                           <li className="flex gap-2 text-sm items-start">
                             <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                             <span>Schedule time for "Module 3" activities.</span>
                           </li>
                           <li className="flex gap-2 text-sm items-start">
                             <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                             <span>Review progress in 7 days.</span>
                           </li>
                        </ul>
                      </div>
                      
                      <Button className="w-full mt-4" variant="outline">
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
