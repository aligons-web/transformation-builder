import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, ArrowRight, Bot, Loader2, BookOpen, Briefcase, Cpu, GraduationCap, Heart, Globe, TrendingUp, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function FuturePathPage() {
  const [isGenerating, setIsGenerating] = useState(true);
  const [activePersona, setActivePersona] = useState("all");

  useEffect(() => {
    // Simulate AI processing time
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const personas = [
    { id: "all", label: "Holistic View" },
    { id: "student", label: "College Students" },
    { id: "professional", label: "Professionals" },
    { id: "entrepreneur", label: "Entrepreneurs" },
    { id: "retiree", label: "Retirees" },
    { id: "veteran", label: "Veterans" }
  ];

  const futureTrends = [
    {
      icon: <Users className="w-5 h-5 text-indigo-500" />,
      title: "Church Ministry & Spirituality",
      desc: "The shift from attendance-based models to micro-communities and digital discipleship.",
      insight: "Your focus on 'People' and 'Leadership' positions you well for the coming wave of decentralized ministry. As VR churches and AI-assisted bible study grow, the need for authentic, human-led mentorship will skyrocket."
    },
    {
      icon: <Briefcase className="w-5 h-5 text-blue-500" />,
      title: "Business Development",
      desc: "Rise of the 'Purpose Economy' where profit meets social impact.",
      insight: "With your identified gap in 'Resources' but strength in 'Communication', consider low-capital, high-impact service models. The future favors businesses that solve community problems through scalable digital means."
    },
    {
      icon: <Cpu className="w-5 h-5 text-emerald-500" />,
      title: "Technology & AI",
      desc: "AI as a co-pilot for creativity and productivity, not a replacement.",
      insight: "Your 'Data' vs 'Intuition' balance suggests you can be a bridge—translating complex AI capabilities into human-centric solutions. Don't just use AI; teach others how it aligns with their purpose."
    },
    {
      icon: <Globe className="w-5 h-5 text-purple-500" />,
      title: "Social Media & VR",
      desc: "From 'scroll culture' to immersive, community-building experiences.",
      insight: "If you felt 'Lack of Network' was a barrier, the metaverse offers a reset button. Authentic storytelling (your strength) will outpace curated perfection in the next era of social platforms."
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-orange-500" />,
      title: "Higher Education",
      desc: "The unbundling of degrees into lifelong, skill-based micro-credentials.",
      insight: "For the 'Independent Learner' in you: traditional degrees are slowing down. Your ability to self-teach and curate your own curriculum is a superpower in the 2030 workforce."
    }
  ];

  const personaInsights = {
    student: "Focus on 'Adaptability Quotient' (AQ) over IQ. Your career path will likely include 5-7 different industries. Build a foundation of faith that remains constant while your job title changes.",
    professional: "The mid-career pivot is the new normal. Use your accumulated 'soft skills' (leadership, empathy) to navigate technical disruptions. Your experience is the anchor in the AI storm.",
    entrepreneur: "Solve for 'Loneliness' and 'Meaning'. The most successful startups of the next decade will be those that reconnect people to purpose and each other, utilizing tech as the conduit.",
    retiree: "The 'Third Act' is for mentorship. Your wisdom is a scarce resource in a data-rich world. Consider 'fractional leadership' or intergenerational consulting as a high-impact path.",
    veteran: "Your discipline and team-first mindset are exactly what the chaotic startup world needs. Translate 'Mission First' into 'Purpose Driven' business leadership."
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

          {isGenerating ? (
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
                  Analyzing Module 1 & 2 entries, bridging gaps, and forecasting future trends in ministry, tech, and business.
                </p>
              </div>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="animate-bounce delay-75">Processing Reflections</Badge>
                <Badge variant="outline" className="animate-bounce delay-150">Mapping Skills</Badge>
                <Badge variant="outline" className="animate-bounce delay-300">Forecasting Trends</Badge>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              
              {/* Hero Insight Card */}
              <Card className="bg-gradient-to-r from-primary/10 via-background to-background border-primary/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Sparkles className="w-6 h-6 text-primary" />
                    Your Transformation Trajectory
                  </CardTitle>
                  <CardDescription>Based on your inputs from Module 1 & 2</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <p className="text-lg text-foreground/90 leading-relaxed">
                    You are positioned as a <span className="font-bold text-primary">"Restorative Leader"</span>. 
                    Your analysis indicates a strong desire to bridge the gap between <span className="font-semibold">spiritual depth</span> and <span className="font-semibold">practical execution</span>.
                    While you identified "Lack of Time" and "Uncertainty" as barriers, your subconscious resilience suggests you thrive when a mission is clearly defined.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200">Ministry-Ready</Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Tech-Aware</Badge>
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200">Community Builder</Badge>
                  </div>
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
                              {activePersona === 'all' 
                                ? "The convergence of faith, technology, and purpose requires a multi-faceted approach. Your path involves integrating these domains rather than keeping them separate." 
                                : personaInsights[activePersona as keyof typeof personaInsights]
                              }
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Future Trends Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {futureTrends.map((trend, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-md transition-shadow duration-300">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-3 text-lg">
                          <div className="p-2 bg-muted rounded-lg">
                            {trend.icon}
                          </div>
                          {trend.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">{trend.desc}</p>
                        <div className="bg-primary/5 p-3 rounded-md border-l-2 border-primary">
                          <p className="text-xs font-medium text-primary/80">
                            <span className="font-bold mr-1">Your Path:</span> 
                            {trend.insight}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Action Plan */}
              <Card className="bg-slate-900 text-slate-50 border-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Strategic Next Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="text-green-400 font-mono text-sm mb-1">01. IMMEDIATE</div>
                      <h4 className="font-bold">Audit Your Digital Diet</h4>
                      <p className="text-sm text-slate-400">Replace 30 mins of passive consumption with active skill building in AI or Theology.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-blue-400 font-mono text-sm mb-1">02. SHORT TERM</div>
                      <h4 className="font-bold">Launch a Pilot</h4>
                      <p className="text-sm text-slate-400">Test your "Service Offer" with 3 people for free to validate your gap assessment.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-purple-400 font-mono text-sm mb-1">03. LONG TERM</div>
                      <h4 className="font-bold">Build Your Platform</h4>
                      <p className="text-sm text-slate-400">Establish a digital presence that showcases your unique intersection of skills.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center pt-8">
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-white">
                  <BookOpen className="w-4 h-4" />
                  Download Full Transformation Report (PDF)
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}