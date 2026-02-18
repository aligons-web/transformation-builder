import { useUser } from "@/hooks/use-user";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Target, MapPin, Mic, AlertCircle, ArrowRight, ArrowLeft, Sparkles, MicOff, AlertTriangle } from "lucide-react";
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

  // ✅ Check access to Step 3
  const canAccessStep3 = (() => {
    // Admin bypass - handles both 1 and true
    if (user?.isAdmin) {
      console.log('✅ Admin access granted to Step 3');
      return true;
    }

    // Check plan
    const planRank: Record<string, number> = {
      EXPLORER: 1,
      TRANSFORMER: 2,
      IMPLEMENTER: 3,
      FOUNDER: 3,  // Full access for founders
    };

    const userPlan = user?.plan || "EXPLORER";
    const hasAccess = planRank[userPlan] >= 3; // Need IMPLEMENTER (rank 3)
    console.log('📋 Step 3 access check:', { userPlan, hasAccess });
    return hasAccess;
  })();

  const [activeTab, setActiveTab] = useState("module3");
  const [, setLocation] = useLocation();
  const [timeUseAnswers, setTimeUseAnswers] = useState<Record<number, string>>({});
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const [isRecording, setIsRecording] = useState<string | null>(null);

  // ✅ FIX: Add ref to track current recording state
  const isRecordingRef = useRef<string | null>(null);

  // ✅ FIX: Keep ref in sync with state
  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

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

  // ✅ FIX: Initialize speech recognition once, read from ref in handler
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: any) => {
      // ✅ FIX: Read from ref instead of stale closure variable
      const currentRecording = isRecordingRef.current;
      if (currentRecording === null) return;

      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        setTextAnswers(prev => ({
          ...prev,
          [currentRecording]: (prev[currentRecording] || '') + ' ' + finalTranscript
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

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [toast]);

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

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Loading...</span>
      </div>
    );
  }

  // ✅ Access denied - show upgrade prompt
  if (!canAccessStep3) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md text-center space-y-6 bg-white rounded-lg shadow-xl p-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold">Step 3: Clarify Focus</h1>
          <p className="text-muted-foreground">
            This step requires the Implementer plan to access modules 3, 4, and 5.
          </p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => window.location.href = '/pricing'}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer"
            >
              Upgrade to Implementer
            </button>
            <button 
              onClick={() => window.history.back()}
              className="w-full border px-6 py-2 rounded-lg cursor-pointer"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Main content - user has access
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <div className="flex-1 md:ml-64 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-8 overflow-y-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">Step 3: Clarify Focus</h1>
              <p className="text-muted-foreground">Modules 3, 4, & 5: How, When, and Where of Transformation.</p>
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8 h-auto md:h-12 bg-muted/50 p-1 gap-2 md:gap-0">
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
                            value={timeUseAnswers[i]}
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
                              className={`absolute right-2 top-2 cursor-pointer ${isRecording === `m3-${i}` ? 'text-red-500 bg-red-50 hover:bg-red-100' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'}`}
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
                    <Button onClick={() => setActiveTab("module4")} className="gap-2 cursor-pointer">
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
                              className={`absolute right-2 top-6 cursor-pointer ${isRecording === `m4-${i}` ? 'text-red-500 bg-red-50 hover:bg-red-100' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'}`}
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
                    <Button variant="outline" onClick={() => setActiveTab("module3")} className="gap-2 cursor-pointer">
                      <ArrowLeft className="w-4 h-4" />
                      Previous: How?
                    </Button>
                    <Button onClick={() => setActiveTab("module5")} className="gap-2 cursor-pointer">
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
                            className={`absolute right-2 top-2 cursor-pointer ${isRecording === `m5-${i}` ? 'text-red-500 bg-red-50 hover:bg-red-100' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'}`}
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
                    <Button variant="outline" onClick={() => setActiveTab("module4")} className="gap-2 cursor-pointer">
                      <ArrowLeft className="w-4 h-4" />
                      Previous: When?
                    </Button>
                    <Button 
                      className="gap-2 bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
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