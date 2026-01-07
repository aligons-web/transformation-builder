import { useUser } from "@/hooks/use-user";
import { PLANS } from "@shared/config/plans";
import { LockedStep } from "@/components/LockedStep";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Target, Clock, MapPin, Mic, AlertCircle, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, MicOff } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const timeUseQuiz = [
  {
    question: "After work, you most often:",
    options: [
      { value: "Routine", label: "Follow a set routine (e.g., meal prep, exercise)." },
      { value: "Learning", label: "Take an online course or read about a new topic." },
      { value: "Entertainment", label: "Watch TV, play games, or browse social media." },
      { value: "Social", label: "Meet friends or family for social time." }
    ]
  },
  {
    question: "An hour after work is most likely given to:",
    options: [
      { value: "Routine", label: "Exercise or organize your space." },
      { value: "Learning", label: "Practice a new language or skill." },
      { value: "Entertainment", label: "Scroll through social media." },
      { value: "Social", label: "Chat or play games with friends." }
    ]
  },
  {
    question: "Over the past week, you've mostly:",
    options: [
      { value: "Routine", label: "Maintained healthy routines and habits." },
      { value: "Learning", label: "Learned something new or practiced a skill." },
      { value: "Entertainment", label: "Focused on entertainment and relaxation." },
      { value: "Social", label: "Socialized or attended gatherings." }
    ]
  },
  {
    question: "If you have a free evening, you:",
    options: [
      { value: "Routine", label: "Plan and complete productive tasks." },
      { value: "Learning", label: "Research a topic of interest or work on self-improvement." },
      { value: "Entertainment", label: "Order takeout and watch your favorite show." },
      { value: "Social", label: "Try a new restaurant or activity with others." }
    ]
  }
];

const urgencyLevels = [
  { level: "Casually pending", desc: "My current situation is not problematic, but I do want change.", color: "bg-blue-100 text-blue-800" },
  { level: "Pending urgent", desc: "My current situation is bearable; some issues but not intolerable.", color: "bg-yellow-100 text-yellow-800" },
  { level: "Nearly urgent", desc: "My situation has posed multiple friction points.", color: "bg-orange-100 text-orange-800" },
  { level: "Highly urgent", desc: "My situation has presented unexpected changes that are not well-received.", color: "bg-red-100 text-red-800" }
];

export default function ActionableFocusPage() {
  const { user, isLoading } = useUser();

  // ✅ CRITICAL: Check admin status FIRST before checking plan
  const canAccessStep3 = (() => {
    // If admin, always grant access
    if (user?.isAdmin) {
      console.log('✅ Admin access granted to Step 3');
      return true;
    }

    // Otherwise check plan
    const userPlan = (user?.plan ?? "explorer") as keyof typeof PLANS;
    const hasAccess = PLANS[userPlan]?.access?.step3 ?? false;
    console.log('📋 Plan check for Step 3:', { userPlan, hasAccess });
    return hasAccess;
  })();

  const [activeTab, setActiveTab] = useState("module3");
  const [, setLocation] = useLocation();
  const [timeUseAnswers, setTimeUseAnswers] = useState<Record<number, string>>({});
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const [isRecording, setIsRecording] = useState<string | null>(null);

  useEffect(() => {
    const load = (key: string, setter: any) => {
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          setter(JSON.parse(saved));
        } catch (e) {
          console.error(`Failed to parse ${key}`, e);
        }
      }
    };
    load("focus-timeuse", setTimeUseAnswers);
    load("focus-text", setTextAnswers);
  }, []);

  useEffect(() => { localStorage.setItem("focus-timeuse", JSON.stringify(timeUseAnswers)); }, [timeUseAnswers]);
  useEffect(() => { localStorage.setItem("focus-text", JSON.stringify(textAnswers)); }, [textAnswers]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        if (isRecording === null) return;

        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setTextAnswers(prev => ({
            ...prev,
            [isRecording]: (prev[isRecording] || '') + ' ' + finalTranscript
          }));
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(null);
        toast({
          title: "Microphone Error",
          description: "Could not access microphone. Please check permissions.",
          variant: "destructive"
        });
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isRecording, toast]);

  const toggleRecording = (id: string) => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive"
      });
      return;
    }

    if (isRecording === id) {
      recognitionRef.current.stop();
      setIsRecording(null);
      toast({
        title: "Recording Stopped",
        description: "Your speech has been captured.",
      });
    } else {
      if (isRecording !== null) {
        recognitionRef.current.stop();
      }

      setIsRecording(id);
      recognitionRef.current.start();
      toast({
        title: "Listening...",
        description: "Speak clearly into your microphone.",
      });
    }
  };

  const calculateTimeUseResults = () => {
    const counts = { Routine: 0, Learning: 0, Entertainment: 0, Social: 0 };
    Object.values(timeUseAnswers).forEach(val => {
      if (val in counts) counts[val as keyof typeof counts]++;
    });

    const hasAnswers = Object.keys(timeUseAnswers).length > 0;
    const baseValue = hasAnswers ? 0 : 25;

    return [
      { name: "Highly Structured", value: hasAnswers ? counts.Routine : baseValue, color: "#3b82f6" },
      { name: "Intentional", value: hasAnswers ? counts.Learning : baseValue, color: "#10b981" },
      { name: "Relax Focused", value: hasAnswers ? counts.Entertainment : baseValue, color: "#f97316" },
      { name: "Personal Activity", value: hasAnswers ? counts.Social : baseValue, color: "#ef4444" }
    ];
  };

  const timeUseData = calculateTimeUseResults();

  // ✅ FEATURE GATE: Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Loading...</span>
      </div>
    );
  }

  // ✅ FEATURE GATE: Check access
  // if (!canAccessStep3) {
   // return (
   //   <LockedStep
   //     stepTitle="Step 3: Clarify Focus"
    //    requiredPlan="Implementer"
    //    description="You've analyzed what needs to change. Now implement your // transformation with structure and accountability."
    //    isAdmin={user?.isAdmin}
   //   />
  //  );
 // }

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <div className="flex-1 md:ml-64 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-8 overflow-y-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Step 3: Clarify <span className="text-primary font-serif italic">Focus</span>
              </h1>
              <div className="h-6" />
              <p className="text-xl text-muted-foreground">Modules 3, 4, & 5: How, When, and Where of Transformation.</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-12 bg-muted/50 p-1">
              <TabsTrigger value="module3" className="text-base">Module 3: How?</TabsTrigger>
              <TabsTrigger value="module4" className="text-base">Module 4: When?</TabsTrigger>
              <TabsTrigger value="module5" className="text-base">Module 5: Where?</TabsTrigger>
            </TabsList>

            {/* MODULE 3 */}
            <TabsContent value="module3" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Experiencing Transformation
                  </CardTitle>
                  <CardDescription>
                    Moving from Chronos (chronological time) to Kairos (opportune time) through daily discipline.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl">
                    <h3 className="font-bold text-foreground mb-2">Module Statement</h3>
                    <p className="text-foreground/80 italic">
                      "Transformation is like a butterfly in a cocoon. The final production is not visible during the passing of time (chronos), but the daily activity prepares you for the opportune moment (kairos)."
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="font-heading font-semibold text-xl">Time-Use Assessment</h3>
                      <p className="text-sm text-muted-foreground">Where is your time going? Select the option that best describes you.</p>

                      {timeUseQuiz.map((q, i) => (
                        <div key={i} className="space-y-3 p-4 rounded-lg bg-muted/30">
                          <Label className="font-medium mb-4 block">{i + 1}. {q.question}</Label>
                          <RadioGroup 
                            onValueChange={(val) => setTimeUseAnswers(prev => ({ ...prev, [i]: val }))}
                            className="space-y-2"
                          >
                            {q.options.map((opt, j) => (
                              <div key={j} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt.value} id={`m3-q${i}-opt${j}`} />
                                <Label htmlFor={`m3-q${i}-opt${j}`} className="font-normal cursor-pointer text-sm">
                                  {opt.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-6">
                       <h3 className="font-heading font-semibold text-xl">Time Allocation Profile</h3>
                       <Card className="bg-muted/20 border-none shadow-inner">
                        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px]">
                          <div className="w-full h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={timeUseData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={80}
                                  paddingAngle={5}
                                  dataKey="value"
                                >
                                  {timeUseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                      <div className="space-y-2">
                        <h3 className="font-heading font-semibold">Milestone Planning</h3>
                        <p className="text-sm text-muted-foreground">List 3-5 daily activities that represent movement towards your future.</p>
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="relative">
                            <Textarea 
                              placeholder={`Daily Activity ${i}...`} 
                              className="min-h-[60px] pr-12" 
                              value={textAnswers[`m3-${i}`] || ""}
                              onChange={(e) => setTextAnswers(prev => ({ ...prev, [`m3-${i}`]: e.target.value }))}
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              className={`absolute right-2 top-2 ${isRecording === `m3-${i}` ? 'text-red-500 bg-red-50 hover:bg-red-100' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'}`}
                              onClick={() => toggleRecording(`m3-${i}`)}
                              title={isRecording === `m3-${i}` ? "Stop Recording" : "Start Recording"}
                            >
                              {isRecording === `m3-${i}` ? (
                                <MicOff className="w-4 h-4 animate-pulse" />
                              ) : (
                                <Mic className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={() => setActiveTab("module4")} className="gap-2">
                      Next: When?
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* MODULE 4 */}
            <TabsContent value="module4" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    When Will Your Transformation Begin?
                  </CardTitle>
                  <CardDescription>
                    Assessing urgency and overcoming barriers.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="font-heading font-semibold text-xl">Urgency Assessment</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {urgencyLevels.map((level, i) => (
                        <div key={i} className={`p-4 rounded-lg border-2 border-transparent hover:border-primary/50 cursor-pointer transition-all ${level.color}`}>
                          <h4 className="font-bold mb-2">{level.level}</h4>
                          <p className="text-sm opacity-90">{level.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6 pt-6 border-t border-border">
                    <h3 className="font-heading font-semibold text-xl">Addressing Barriers</h3>
                    <p className="text-sm text-muted-foreground">List 3-6 things that you immediately need to deal with that hinder progress.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="relative">
                           <Label className="mb-1 block text-xs text-muted-foreground">Barrier {i}</Label>
                           <Textarea 
                             placeholder="Describe hindrance..." 
                             className="min-h-[80px] pr-12" 
                             value={textAnswers[`m4-${i}`] || ""}
                             onChange={(e) => setTextAnswers(prev => ({ ...prev, [`m4-${i}`]: e.target.value }))}
                           />
                            <Button
                              size="icon"
                              variant="ghost"
                              className={`absolute right-2 top-6 ${isRecording === `m4-${i}` ? 'text-red-500 bg-red-50 hover:bg-red-100' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'}`}
                              onClick={() => toggleRecording(`m4-${i}`)}
                              title={isRecording === `m4-${i}` ? "Stop Recording" : "Start Recording"}
                            >
                              {isRecording === `m4-${i}` ? (
                                <MicOff className="w-4 h-4 animate-pulse" />
                              ) : (
                                <Mic className="w-4 h-4" />
                              )}
                            </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setActiveTab("module3")} className="gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Previous: How?
                    </Button>
                    <Button onClick={() => setActiveTab("module5")} className="gap-2">
                      Next: Where?
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* MODULE 5 */}
            <TabsContent value="module5" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Where Will Transformation Take You?
                  </CardTitle>
                  <CardDescription>
                    Defining destinations and designing your environment for success.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                   <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl">
                    <h3 className="font-bold text-foreground mb-2">Module Statement</h3>
                    <p className="text-foreground/80 italic">
                      "Your transformation has multiple destinations: Internal (mind/spirit), Purpose (calling/assignment), and Service (contribution to others)."
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h3 className="font-heading font-semibold text-xl">Designing Your Environment</h3>
                    {[
                      "What physical or virtual spaces will support where your transformation is taking you?",
                      "How can your environment be redesigned for success?",
                      "What support, guidance, or accountability do you need?"
                    ].map((q, i) => (
                      <div key={i} className="space-y-2">
                        <Label>{q}</Label>
                        <div className="relative">
                          <Textarea 
                            placeholder="Type your response..." 
                            className="min-h-[100px] pr-12" 
                            value={textAnswers[`m5-${i}`] || ""}
                            onChange={(e) => setTextAnswers(prev => ({ ...prev, [`m5-${i}`]: e.target.value }))}
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            className={`absolute right-2 top-2 ${isRecording === `m5-${i}` ? 'text-red-500 bg-red-50 hover:bg-red-100' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'}`}
                            onClick={() => toggleRecording(`m5-${i}`)}
                            title={isRecording === `m5-${i}` ? "Stop Recording" : "Start Recording"}
                          >
                            {isRecording === `m5-${i}` ? (
                              <MicOff className="w-4 h-4 animate-pulse" />
                            ) : (
                              <Mic className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setActiveTab("module4")} className="gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Previous: When?
                    </Button>
                    <Button 
                      className="gap-2 bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={() => setLocation("/ai-transformation-engine")}
                    >
                      <Sparkles className="w-4 h-4" />
                      Journey Insights
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </main>
      </div>
    </div>
  );
}