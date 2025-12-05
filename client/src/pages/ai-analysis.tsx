import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wand2, ArrowRight, CheckCircle2, BarChart } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiAnalysisPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasResult(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <div className="flex-1 md:ml-64 flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-6 space-y-8 overflow-y-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">AI Transformation Engine</h1>
              <p className="text-muted-foreground">Analyze your journal entries to discover your path.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Input */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="h-full border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Context Input
                  </CardTitle>
                  <CardDescription>
                    Describe your current situation, frustrations, and dreams.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    placeholder="I feel stuck in my current role as a marketing manager. I love creativity but hate the corporate politics. I've always wanted to..." 
                    className="min-h-[300px] resize-none bg-muted/30 focus:bg-background transition-all border-border/50 focus:border-primary/50 p-4 leading-relaxed"
                  />
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Focus Area</label>
                    <div className="flex flex-wrap gap-2">
                      {["Career Reinvention", "Skill Gap Analysis", "Purpose Discovery"].map((tag) => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full h-12 text-lg gap-2 mt-4" 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Wand2 className="w-5 h-5 animate-spin" />
                        Analyzing Patterns...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5" />
                        Generate Insights
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Results */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {!hasResult ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-muted-foreground/20 rounded-xl bg-muted/5 text-center space-y-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                      <BarChart className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-xl font-medium text-foreground">Ready to Analyze</h3>
                    <p className="text-muted-foreground max-w-md">
                      Enter your thoughts on the left to generate a personalized transformation roadmap, skill analysis, and actionable next steps.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { title: "Core Strength", value: "Creative Strategy", color: "text-purple-500" },
                        { title: "Hidden Potential", value: "Teaching / Mentoring", color: "text-blue-500" },
                        { title: "Readiness Score", value: "High (85%)", color: "text-green-500" }
                      ].map((stat, i) => (
                        <Card key={i} className="bg-card/50 backdrop-blur-sm">
                          <CardContent className="p-6 text-center">
                            <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                            <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Detailed Analysis Tabs */}
                    <Tabs defaultValue="roadmap" className="w-full">
                      <TabsList className="w-full justify-start h-12 bg-muted/50 p-1 mb-6">
                        <TabsTrigger value="roadmap" className="flex-1 md:flex-none px-8">Roadmap</TabsTrigger>
                        <TabsTrigger value="skills" className="flex-1 md:flex-none px-8">Skills Gap</TabsTrigger>
                        <TabsTrigger value="actions" className="flex-1 md:flex-none px-8">Action Plan</TabsTrigger>
                      </TabsList>

                      <TabsContent value="roadmap">
                        <Card>
                          <CardHeader>
                            <CardTitle>Reinvention Roadmap</CardTitle>
                            <CardDescription>Phased approach to your new career path.</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {[
                              { phase: "Phase 1: Exploration", time: "Month 1-2", desc: "Conduct informational interviews and start a side project." },
                              { phase: "Phase 2: Skill Building", time: "Month 3-4", desc: "Take a course on Digital Product Design and build a portfolio." },
                              { phase: "Phase 3: Transition", time: "Month 5-6", desc: "Begin applying for roles and leverage network for referrals." }
                            ].map((step, i) => (
                              <div key={i} className="flex gap-4 pb-6 border-l-2 border-primary/20 pl-6 relative last:pb-0">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold text-foreground">{step.phase}</h4>
                                    <Badge variant="outline">{step.time}</Badge>
                                  </div>
                                  <p className="text-muted-foreground">{step.desc}</p>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="skills">
                        <Card>
                          <CardHeader>
                            <CardTitle>Skills Analysis</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {[
                                { skill: "Strategic Planning", level: 90, type: "Transferable" },
                                { skill: "Project Management", level: 85, type: "Transferable" },
                                { skill: "UX Research", level: 40, type: "Gap" },
                                { skill: "Prototyping Tools", level: 30, type: "Gap" },
                              ].map((skill, i) => (
                                <div key={i} className="space-y-1">
                                  <div className="flex justify-between text-sm">
                                    <span className="font-medium">{skill.skill}</span>
                                    <span className={skill.type === "Gap" ? "text-orange-500" : "text-green-500"}>{skill.type}</span>
                                  </div>
                                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full ${skill.type === "Gap" ? "bg-orange-400" : "bg-green-500"}`} 
                                      style={{ width: `${skill.level}%` }} 
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="actions">
                        <Card>
                          <CardHeader>
                            <CardTitle>Immediate Next Steps</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {[
                                "Update LinkedIn profile with new headline",
                                "Reach out to 3 mentors in the target industry",
                                "Complete the 'Values Assessment' module",
                                "Draft initial project proposal"
                              ].map((action, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/50">
                                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                                  <span className="text-sm">{action}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}