import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowLeft, Printer, Download, Target, Lightbulb, MapPin, Zap, Clock, Brain, Compass, Sparkles, Wand2, ArrowRight } from "lucide-react";
import { modules } from "@/lib/purpose-modules";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

export default function FinalSummaryPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedAnswers = localStorage.getItem("purpose-reflections");
    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch (e) {
        console.error("Failed to parse saved answers", e);
      }
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // Mock Data for Visualizations
  const timeUseData = [
    { name: "Highly Structured", value: 35, color: "#3b82f6" },
    { name: "Intentional", value: 25, color: "#10b981" },
    { name: "Relax Focused", value: 20, color: "#f97316" },
    { name: "Personal Activity", value: 20, color: "#ef4444" }
  ];

  const preferenceData = [
    { name: "People", value: 40, color: "#f97316" },
    { name: "Things", value: 15, color: "#3b82f6" },
    { name: "Data", value: 25, color: "#8b5cf6" },
    { name: "Mixed", value: 20, color: "#10b981" }
  ];

  return (
    <div className="min-h-screen bg-background font-sans print:bg-white">
      <div className="print:hidden">
        <Navbar />
      </div>
      
      <main className="container mx-auto px-4 pt-24 pb-12 print:pt-8 print:max-w-none">
        <div className="max-w-6xl mx-auto mb-8 print:mb-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-6 gap-2 print:hidden hover:bg-transparent hover:text-primary p-0">
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
              <Button variant="outline" className="gap-2" onClick={handlePrint}>
                <Printer className="w-4 h-4" />
                Print
              </Button>
              <Button className="gap-2">
                <Download className="w-4 h-4" />
                Export PDF
              </Button>
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
              {modules.slice(0, 4).map((module) => { // Showing first 4 modules as highlight
                 const firstQuestion = module.questions[0];
                 const key = `${module.id}-0`;
                 const answer = answers[key];
                 
                 return (
                   <Card key={module.id} className="bg-card/50 backdrop-blur-sm">
                     <CardHeader className="pb-2">
                       <CardTitle className="text-lg font-medium text-primary">{module.title}</CardTitle>
                     </CardHeader>
                     <CardContent>
                       <p className="text-sm font-medium mb-2 text-muted-foreground">{firstQuestion}</p>
                       <div className="text-sm italic text-foreground/80 bg-muted/30 p-3 rounded border-l-2 border-primary/30 min-h-[60px]">
                         {answer || "No entry recorded yet."}
                       </div>
                     </CardContent>
                   </Card>
                 );
              })}
            </div>
            <div className="flex justify-center">
               <Link href="/discover-purpose/summary">
                 <Button variant="link" className="text-primary">View Full Purpose Summary <ArrowRight className="w-4 h-4 ml-1"/></Button>
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
                  <CardTitle>Top Skills identified</CardTitle>
                  <CardDescription>Your strongest assets for transformation.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Leadership", "Communication", "Strategic Planning", "Mentoring", "Public Speaking", "Problem Solving"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm bg-primary/5 hover:bg-primary/10 text-primary border-primary/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-8 p-4 bg-orange-50 border border-orange-100 rounded-lg">
                    <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" /> Insight
                    </h4>
                    <p className="text-sm text-orange-800/80">
                      Your strong preference for <strong>People</strong> combined with <strong>Leadership</strong> skills suggests a path in coaching, management, or community organization.
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
                      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">Highly Structured</Badge>
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
                        <p className="text-xs uppercase tracking-wider text-yellow-600 font-bold mb-1">Urgency</p>
                        <p className="text-xl font-heading font-bold text-yellow-800">Pending Urgent</p>
                     </div>
                     <div className="space-y-2">
                        <p className="text-xs font-bold text-muted-foreground">KEY BARRIERS</p>
                        <ul className="text-sm text-foreground/80 list-disc list-inside">
                          <li>Financial runway</li>
                          <li>Lack of routine</li>
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
                           <p className="text-sm bg-green-50 p-2 rounded border border-green-100">Professional Leadership Role</p>
                        </div>
                        <div>
                           <p className="text-xs font-bold text-green-600 mb-1">ENVIRONMENT</p>
                           <p className="text-sm bg-green-50 p-2 rounded border border-green-100">Home Office & Community Hub</p>
                        </div>
                     </div>
                  </CardContent>
                </Card>
            </div>
          </section>

          {/* SECTION 4: PROJECTED ROADMAP */}
          <section className="py-12 bg-primary/5 -mx-4 px-4 md:-mx-12 md:px-12 rounded-3xl border border-primary/10">
             <div className="max-w-4xl mx-auto text-center mb-12">
                <Badge className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90">Final Output</Badge>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Your Projected Roadmap</h2>
                <p className="text-lg text-muted-foreground">
                  Synthesizing your Purpose, Skills, and Focus into a clear path forward.
                </p>
             </div>

             <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <Card className="bg-background border-primary/20 shadow-lg relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-orange-500"></div>
                   <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                         <Wand2 className="w-5 h-5 text-primary" />
                         Strategic Recommendation
                      </CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <p className="text-foreground/80 leading-relaxed">
                         Based on your journey, we recommend a <strong>Professional Reinvention</strong> focused on <strong>Leadership & Coaching</strong>.
                      </p>
                      <ul className="space-y-2">
                         <li className="flex items-start gap-2 text-sm">
                            <CheckSquare className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                            <span>Leverage your "People" preference to build a network.</span>
                         </li>
                         <li className="flex items-start gap-2 text-sm">
                            <CheckSquare className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                            <span>Use your "Structured" time style to create a certification study plan.</span>
                         </li>
                         <li className="flex items-start gap-2 text-sm">
                            <CheckSquare className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                            <span>Address "Financial" barriers by starting as a side-project.</span>
                         </li>
                      </ul>
                   </CardContent>
                </Card>

                <div className="space-y-4">
                   <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-border shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">1</div>
                      <div>
                         <h4 className="font-bold">Immediate Action</h4>
                         <p className="text-sm text-muted-foreground">Define your coaching niche by next Friday.</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-border shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">2</div>
                      <div>
                         <h4 className="font-bold">Short-term Goal</h4>
                         <p className="text-sm text-muted-foreground">Complete 1 online course on Leadership.</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-border shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">3</div>
                      <div>
                         <h4 className="font-bold">Long-term Vision</h4>
                         <p className="text-sm text-muted-foreground">Launch your own consultancy within 12 months.</p>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="flex justify-center mt-12">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-foreground text-background hover:bg-foreground/90 shadow-xl">
                   Save Full Blueprint
                </Button>
             </div>
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
