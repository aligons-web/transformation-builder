import { useUser } from "@/hooks/use-user";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, ArrowRight, Bot, Loader2, Clock, RefreshCw, AlertCircle, AlertTriangle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { LockedFeature } from "@/components/LockedFeature";
import { useAiAnalysis } from "@/hooks/use-ai-analysis";
import lifeTransformationBookCover from "@assets/newcovertouse_1780441406692.png";

const skillsList = [
  "Computer Skills", "Communication", "Social Media",
  "Using AI", "Design Software", "Book publish",
  "Business Start", "Website", "Video",
  "MS Office", "Online Course", "Remote Tools",
  "Leadership", "Learning Strategy", "Other"
];

const resourcesList = [
  "Lack of money", "Lack of support", "Lack of tools",
  "Lack of time", "Lack of knowledge", "Lack of network",
  "Lack of skills", "Lack of focus", "Lack of motivation",
  "Lack of creative ideas"
];

const timeUseQuiz = [
  {
    question: "After work, you most often:",
    options: [
      { value: "A", label: "Follow a set routine (e.g., meal prep, exercise, chores)" },
      { value: "B", label: "Take an online course or read about a new topic" },
      { value: "C", label: "Watch TV, play games, or browse social media" },
      { value: "D", label: "Meet friends or family for social time" }
    ]
  },
  {
    question: "An hour after work is given to:",
    options: [
      { value: "A", label: "Exercising or organizing your space" },
      { value: "B", label: "Practicing a language, coding, or instrument" },
      { value: "C", label: "Scrolling through social media or streaming content" },
      { value: "D", label: "Chatting or gaming with friends" }
    ]
  },
  {
    question: "Over the past week, you've mostly:",
    options: [
      { value: "A", label: "Maintained healthy routines and habits" },
      { value: "B", label: "Learned something new or practiced a skill" },
      { value: "C", label: "Focused on entertainment and relaxation" },
      { value: "D", label: "Socialized or attended gatherings" }
    ]
  },
  {
    question: "If you have a free evening, you:",
    options: [
      { value: "A", label: "Plan and complete productive tasks" },
      { value: "B", label: "Research a topic of interest or work on self-improvement" },
      { value: "C", label: "Order takeout and watch your favorite show" },
      { value: "D", label: "Try a new restaurant or activity with others" }
    ]
  }
];

const subconsciousQuiz = [
  {
    question: "When faced with a sudden challenge, you tend to:",
    options: [
      { value: "SL1", label: "Act on gut instinct without thinking." },
      { value: "SL2", label: "React based on how you feel in the moment." },
      { value: "CL1", label: "Pause to analyze the situation logically." },
      { value: "CL2", label: "Consider the possible outcomes before deciding." }
    ]
  },
  {
    question: "When meeting someone new, you:",
    options: [
      { value: "SL1", label: "Instantly judge them based on appearance." },
      { value: "SL2", label: "Notice your emotional response to their energy." },
      { value: "CL1", label: "Ask questions to understand them better." },
      { value: "CL2", label: "Reflect on first impressions before forming opinion." }
    ]
  },
  {
    question: "When you make a mistake, your first reaction is to:",
    options: [
      { value: "SL1", label: "Blame circumstances without thinking." },
      { value: "SL2", label: "Feel embarrassed or upset." },
      { value: "CL1", label: "Analyze what went wrong." },
      { value: "CL2", label: "Consider how you can learn from the experience." }
    ]
  },
  {
    question: "When making a big decision, you:",
    options: [
      { value: "SL1", label: "Go with your initial impulse." },
      { value: "SL2", label: "Let your mood guide your choice." },
      { value: "CL1", label: "Weigh the pros and cons." },
      { value: "CL2", label: "Take time to align the decision with your long-term goals." }
    ]
  },
  {
    question: "When you receive criticism, you:",
    options: [
      { value: "SL1", label: "Instinctively defend yourself." },
      { value: "SL2", label: "Feel hurt or offended." },
      { value: "CL1", label: "Try to understand the feedback logically." },
      { value: "CL2", label: "Reflect on whether the criticism can help you grow." }
    ]
  },
  {
    question: "When you wake up in the morning, your thoughts are:",
    options: [
      { value: "SL1", label: "On autopilot, following your routine." },
      { value: "SL2", label: "Influenced by your mood or dreams." },
      { value: "CL1", label: "Focused on planning your day." },
      { value: "CL2", label: "Thoughtful, reviewing goals or intentions for the day." }
    ]
  },
  {
    question: "When learning something new, you:",
    options: [
      { value: "SL1", label: "Mimic what others do without thinking." },
      { value: "SL2", label: "Rely on how comfortable or uncomfortable it feels." },
      { value: "CL1", label: "Break down the steps logically." },
      { value: "CL2", label: "Reflect on how it fits into your bigger picture." }
    ]
  },
  {
    question: "When resolving conflict, you:",
    options: [
      { value: "SL1", label: "React automatically, maybe defensively." },
      { value: "SL2", label: "Let your emotions lead the conversation." },
      { value: "CL1", label: "Try to stay objective and reasoned." },
      { value: "CL2", label: "Consider the other person's perspective and your values." }
    ]
  },
  {
    question: "When you feel stressed, you:",
    options: [
      { value: "SL1", label: "Fall into old habits without realizing." },
      { value: "SL2", label: "Notice your emotions intensify." },
      { value: "CL1", label: "Use problem-solving strategies." },
      { value: "CL2", label: "Practice mindfulness or intentional coping techniques." }
    ]
  },
  {
    question: "When setting goals, you:",
    options: [
      { value: "SL1", label: "Choose whatever comes to mind first." },
      { value: "SL2", label: "Set goals based on what feels good right now." },
      { value: "CL1", label: "Make specific, measurable plans." },
      { value: "CL2", label: "Align your goals with your deeper purpose." }
    ]
  }
];

const preferenceQuiz = [
  {
    question: "When given a group project, you prefer to:",
    options: [
      { value: "People", label: "Lead group discussions & coordinate team." },
      { value: "Things", label: "Handle the technical or hands-on aspects." },
      { value: "Data", label: "Organize and analyze the project data." },
      { value: "Mixed", label: "Support wherever needed." }
    ]
  },
  {
    question: "Which activity sounds most appealing to you?",
    options: [
      { value: "People", label: "Mentoring or teaching others." },
      { value: "Things", label: "Building or repairing something." },
      { value: "Data", label: "Creating spreadsheets or reports." },
      { value: "Mixed", label: "Planning a schedule." }
    ]
  },
  {
    question: "In your free time, you're most likely to:",
    options: [
      { value: "People", label: "Attend social gatherings or network." },
      { value: "Things", label: "Work on DIY or craft projects." },
      { value: "Data", label: "Solve puzzles or play strategy games." },
      { value: "Mixed", label: "Read or watch documentaries." }
    ]
  },
  {
    question: "Your ideal work environment is:",
    options: [
      { value: "People", label: "Collaborative and team-oriented." },
      { value: "Things", label: "Hands-on and practical." },
      { value: "Data", label: "Quiet and focused on analysis." },
      { value: "Mixed", label: "Flexible and varied." }
    ]
  },
  {
    question: "When faced with a problem, you usually:",
    options: [
      { value: "People", label: "Talk it through with others." },
      { value: "Things", label: "Try to fix or adjust something physically." },
      { value: "Data", label: "Gather and review information." },
      { value: "Mixed", label: "Take a break and come back to it later." }
    ]
  },
  {
    question: "You feel most accomplished when you:",
    options: [
      { value: "People", label: "Help someone achieve their goal." },
      { value: "Things", label: "Complete a physical task or project." },
      { value: "Data", label: "Find a pattern or solution in data." },
      { value: "Mixed", label: "Finish a variety of small tasks." }
    ]
  },
  {
    question: "Which task would you choose?",
    options: [
      { value: "People", label: "Mediating a conflict." },
      { value: "Things", label: "Operating or fixing equipment." },
      { value: "Data", label: "Auditing financial records." },
      { value: "Mixed", label: "Organizing an event." }
    ]
  },
  {
    question: "You are most comfortable:",
    options: [
      { value: "People", label: "In a group, sharing ideas." },
      { value: "Things", label: "Using tools or technology." },
      { value: "Data", label: "Working with numbers or information." },
      { value: "Mixed", label: "Doing a mix of activities." }
    ]
  },
  {
    question: "Others often ask you for help with:",
    options: [
      { value: "People", label: "Advice or support." },
      { value: "Things", label: "Setting up or repairing devices." },
      { value: "Data", label: "Analyzing or interpreting information." },
      { value: "Mixed", label: "Organizing or planning." }
    ]
  },
  {
    question: "You're most likely to volunteer for:",
    options: [
      { value: "People", label: "Leading a team or committee." },
      { value: "Things", label: "Setting up equipment or logistics." },
      { value: "Data", label: "Managing records or tracking progress." },
      { value: "Mixed", label: "Coordinating communications." }
    ]
  }
];

const successTypes = [
  "A highly knowledgeable Entrepreneur",
  "A disciplined Independent Learner",
  "An advanced Technology User",
  "A published book Author",
  "A Social Media Strategist",
  "A successful Online Business Owner",
  "A highly effective Teacher, Instructor, or Trainer",
  "A Strategist to build wealth",
  "An independent learner as a Digital Media Artist",
  "A Financial Investor Strategist",
  "A highly effective Communicator"
];

// Types for AI response
interface TransformationAnalysisResponse {
  subconsciousInsight?: {
    pattern?: string;
    description?: string;
    recommendation?: string;
  };
  timeUseInsight?: {
    type?: string;
    description?: string;
    recommendation?: string;
  };
  workStyleInsight?: {
    preference?: string;
    description?: string;
    careerSuggestions?: string[];
  };
  resourceGaps?: {
    primaryGap?: string;
    strategy?: string;
  };
  transformationRecommendation?: {
    focus?: string;
    rationale?: string;
    immediateAction?: string;
  };
  overallInsight?: string;
}

export default function TransformationAnalysisPage() {
  const { user, isLoading: userLoading } = useUser();
  const [activeTab, setActiveTab] = useState("module1");
  const [subconsciousAnswers, setSubconsciousAnswers] = useState<Record<number, string>>({});
  const [preferenceAnswers, setPreferenceAnswers] = useState<Record<number, string>>({});
  const [isRecording, setIsRecording] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [skillsChecked, setSkillsChecked] = useState<string[]>([]);
  const [resourcesChecked, setResourcesChecked] = useState<string[]>([]);
  const [timeUseAnswers, setTimeUseAnswers] = useState<Record<number, string>>({});
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [successChecked, setSuccessChecked] = useState<string[]>([]);
  const [otherSuccessText, setOtherSuccessText] = useState("");
  const [otherSkillText, setOtherSkillText] = useState("");
  const [aiAnalysisResult, setAiAnalysisResult] = useState<TransformationAnalysisResponse | null>(null);

  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef<string | null>(null);
  const [, setLocation] = useLocation();

  const { analyze, isLoading: isAnalyzing, error: aiError, result: aiResult } = useAiAnalysis();

  // Keep ref in sync
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
    load("analysis-subconscious", setSubconsciousAnswers);
    load("analysis-preference", setPreferenceAnswers);
    load("analysis-timeuse", setTimeUseAnswers);
    load("analysis-skills", setSkillsChecked);
    load("analysis-resources", setResourcesChecked);
    load("analysis-text", setTextAnswers);
    load("analysis-success", setSuccessChecked);
    load("analysis-success-other", setOtherSuccessText);
    load("analysis-skill-other", setOtherSkillText);

    // Load cached AI result
    const cachedAi = localStorage.getItem("analysis-ai-result");
    if (cachedAi) {
      try {
        const { result, timestamp } = JSON.parse(cachedAi);
        const hoursSinceCache = (Date.now() - timestamp) / (1000 * 60 * 60);
        if (hoursSinceCache < 24) {
          setAiAnalysisResult(result);
          setShowAnalysis(true);
        }
      } catch (e) {
        console.error("Failed to parse cached AI result", e);
      }
    }
  }, []);

  useEffect(() => { localStorage.setItem("analysis-subconscious", JSON.stringify(subconsciousAnswers)); }, [subconsciousAnswers]);
  useEffect(() => { localStorage.setItem("analysis-preference", JSON.stringify(preferenceAnswers)); }, [preferenceAnswers]);
  useEffect(() => { localStorage.setItem("analysis-timeuse", JSON.stringify(timeUseAnswers)); }, [timeUseAnswers]);
  useEffect(() => { localStorage.setItem("analysis-skills", JSON.stringify(skillsChecked)); }, [skillsChecked]);
  useEffect(() => { localStorage.setItem("analysis-resources", JSON.stringify(resourcesChecked)); }, [resourcesChecked]);
  useEffect(() => { localStorage.setItem("analysis-text", JSON.stringify(textAnswers)); }, [textAnswers]);
  useEffect(() => { localStorage.setItem("analysis-success", JSON.stringify(successChecked)); }, [successChecked]);
  useEffect(() => { localStorage.setItem("analysis-success-other", JSON.stringify(otherSuccessText)); }, [otherSuccessText]);
  useEffect(() => { localStorage.setItem("analysis-skill-other", JSON.stringify(otherSkillText)); }, [otherSkillText]);

  // Cache AI result when received
  useEffect(() => {
    if (aiResult?.structured) {
      const cacheData = {
        result: aiResult.structured,
        timestamp: Date.now()
      };
      localStorage.setItem("analysis-ai-result", JSON.stringify(cacheData));
      setAiAnalysisResult(aiResult.structured as TransformationAnalysisResponse);
      setShowAnalysis(true);
    }
  }, [aiResult]);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: any) => {
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
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [toast]);

  const calculatePreferenceResults = () => {
    const counts = { People: 0, Things: 0, Data: 0, Mixed: 0 };
    Object.values(preferenceAnswers).forEach(val => {
      if (val in counts) counts[val as keyof typeof counts]++;
    });
    return [
      { name: "People", value: counts.People, color: "#f97316" },
      { name: "Things", value: counts.Things, color: "#3b82f6" },
      { name: "Data", value: counts.Data, color: "#8b5cf6" },
      { name: "Mixed", value: counts.Mixed, color: "#10b981" }
    ];
  };

  const calculateSubconsciousResults = () => {
    let subCount = 0;
    let conCount = 0;

    Object.values(subconsciousAnswers).forEach(val => {
      if (val.startsWith("SL")) subCount++;
      if (val.startsWith("CL")) conCount++;
    });

    return { subCount, conCount };
  };

  const preferenceData = calculatePreferenceResults();
  const { subCount, conCount } = calculateSubconsciousResults();

  const handleAnalyze = async () => {
    // Gather all data
    const analysisData = {
      subconsciousAnswers,
      preferenceAnswers,
      timeUseAnswers,
      skillsChecked,
      resourcesChecked,
      successChecked,
      textAnswers,
      otherSuccessText,
      otherSkillText
    };

    // Clear cached result to get fresh analysis
    localStorage.removeItem("analysis-ai-result");
    setAiAnalysisResult(null);

    await analyze("transformation-analysis", analysisData);
  };

  const handleRegenerate = () => {
    localStorage.removeItem("analysis-ai-result");
    setAiAnalysisResult(null);
    setShowAnalysis(false);
    handleAnalyze();
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <div className="flex-1 md:ml-64 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-8 overflow-y-auto">
          {/* ✅ Wrap entire page content in LockedFeature */}
          <LockedFeature
            requiredPlan="TRANSFORMER"
            featureName="Change Analysis"
            description="Unlock AI-powered analysis tools to understand what needs to change in your life"
            isAdmin={user?.isAdmin}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                  Step 2: Analyze <span className="text-primary font-serif italic">Change</span>
                </h1>
                <div className="h-6" />
                <p className="text-xl text-muted-foreground">Deep dive into understanding what transformation you need.</p>
              </div>
              <a 
                href="https://www.amazon.com/LIFE-Transformation-Intentionally-Focused-Everyday/dp/B0FBL8WTQP/ref=sr_1_1?crid=CQRE3281JMMJ&dib=eyJ2IjoiMSJ9._MC2RTkT1fZIPJEQhTz0ijaXvgtB8hhRapB-H0BpeInGjHj071QN20LucGBJIEps.0AaZi-gZm6Slqv0UzYZPYeb8h1PLkGgpQcX2K93j-f4&dib_tag=se&keywords=alexander+ligons+transformation+workbook&qid=1780441263&sprefix=%2Caps%2C213&sr=8-1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="shrink-0 hover:opacity-90 transition-opacity cursor-pointer"
                title="Purchase LIFE Transformation Workbook on Amazon"
              >
                <img 
                  src={lifeTransformationBookCover} 
                  alt="LIFE Transformation Workbook by Alexander Ligons" 
                  className="w-24 h-auto rounded-md shadow-md hover:shadow-lg transition-shadow"
                />
              </a>
            </div>

            {/* LocalStorage Warning */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 mb-6">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold mb-1">Your data is saved locally in this browser</p>
                <p className="text-amber-700">
                  To avoid losing your work, don't clear your browser data or use a different browser/device.
                </p>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 mb-8 h-auto md:h-12 bg-muted/50 p-1 gap-2 md:gap-0">
                <TabsTrigger value="module1" className="text-base">Module 1: Why is transformation needed?</TabsTrigger>
                <TabsTrigger value="module2" className="text-base">Module 2: What will be your transformation?</TabsTrigger>
              </TabsList>

              <TabsContent value="module1" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Subconscious Level Quiz
                    </CardTitle>
                    <CardDescription>
                      Understanding how you react to challenges helps identify subconscious patterns.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {subconsciousQuiz.map((item, index) => (
                      <div key={index} className="space-y-3">
                        <Label className="text-base">{index + 1}. {item.question}</Label>
                        <RadioGroup 
                          onValueChange={(val) => setSubconsciousAnswers(prev => ({...prev, [index]: val}))}
                          value={subconsciousAnswers[index]}
                        >
                          {item.options.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.value} id={`sub-${index}-${option.value}`} />
                              <Label htmlFor={`sub-${index}-${option.value}`} className="font-normal cursor-pointer">
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Time Use Analysis
                    </CardTitle>
                    <CardDescription>
                      How you spend your free time reveals your true priorities.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {timeUseQuiz.map((item, index) => (
                      <div key={index} className="space-y-3">
                        <Label className="text-base">{index + 1}. {item.question}</Label>
                        <RadioGroup 
                          onValueChange={(val) => setTimeUseAnswers(prev => ({...prev, [index]: val}))}
                          value={timeUseAnswers[index]}
                        >
                          {item.options.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.value} id={`time-${index}-${option.value}`} />
                              <Label htmlFor={`time-${index}-${option.value}`} className="font-normal cursor-pointer">
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Bot className="w-5 h-5 text-primary" />
                      Resources Assessment
                    </CardTitle>
                    <CardDescription>
                      Check all the resources you currently feel you are lacking.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {resourcesList.map((resource) => (
                        <div key={resource} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`res-${resource}`}
                            checked={resourcesChecked.includes(resource)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setResourcesChecked(prev => [...prev, resource]);
                              } else {
                                setResourcesChecked(prev => prev.filter(r => r !== resource));
                              }
                            }}
                          />
                          <Label htmlFor={`res-${resource}`} className="font-normal cursor-pointer">{resource}</Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button onClick={() => setActiveTab("module2")} className="gap-2 cursor-pointer">
                    Continue to Module 2
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="module2" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Bot className="w-5 h-5 text-primary" />
                      Your Preferences (People, Things, Data)
                    </CardTitle>
                    <CardDescription>
                      Identify your natural work style and preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {preferenceQuiz.map((item, index) => (
                      <div key={index} className="space-y-3">
                        <Label className="text-base">{index + 1}. {item.question}</Label>
                        <RadioGroup 
                          onValueChange={(val) => setPreferenceAnswers(prev => ({...prev, [index]: val}))}
                          value={preferenceAnswers[index]}
                        >
                          {item.options.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.value} id={`pref-${index}-${option.value}`} />
                              <Label htmlFor={`pref-${index}-${option.value}`} className="font-normal cursor-pointer">
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Skills to Build</CardTitle>
                    <CardDescription>Select skills you want to develop.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {skillsList.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`skill-${skill}`}
                            checked={skillsChecked.includes(skill)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSkillsChecked(prev => [...prev, skill]);
                              } else {
                                setSkillsChecked(prev => prev.filter(s => s !== skill));
                              }
                            }}
                          />
                          <Label htmlFor={`skill-${skill}`} className="font-normal cursor-pointer">{skill}</Label>
                        </div>
                      ))}
                    </div>
                    {skillsChecked.includes("Other") && (
                      <Textarea 
                        placeholder="Please specify other skills..."
                        value={otherSkillText}
                        onChange={(e) => setOtherSkillText(e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Success Types</CardTitle>
                    <CardDescription>Select the types of success that resonate with you.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {successTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`success-${type}`}
                            checked={successChecked.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSuccessChecked(prev => [...prev, type]);
                              } else {
                                setSuccessChecked(prev => prev.filter(s => s !== type));
                              }
                            }}
                          />
                          <Label htmlFor={`success-${type}`} className="font-normal cursor-pointer">{type}</Label>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4">
                      <Label className="mb-2 block">Other Success Type:</Label>
                      <Textarea 
                        placeholder="Describe your own definition of success..."
                        value={otherSuccessText}
                        onChange={(e) => setOtherSuccessText(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                   <Button 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing}
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-primary/20 cursor-pointer"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Bot className="mr-2 h-4 w-4" />
                        Generate AI Analysis
                      </>
                    )}
                  </Button>
                </div>

                {/* Error State */}
                {aiError && !isAnalyzing && (
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-red-100 rounded-full">
                          <AlertCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-red-800 mb-2">Analysis Failed</h3>
                          <p className="text-red-700 mb-4">{aiError}</p>
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

                {showAnalysis && aiAnalysisResult && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Card className="border-primary/20 bg-primary/5">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Bot className="w-5 h-5 text-primary" />
                            AI Pattern Recognition
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Subconscious Insight */}
                          {aiAnalysisResult.subconsciousInsight && (
                            <div>
                              <h4 className="font-semibold mb-1">Subconscious Drivers</h4>
                              <div className="h-4 bg-muted rounded-full overflow-hidden flex">
                                <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${(subCount / (subCount + conCount || 1)) * 100}%` }} />
                                <div className="bg-purple-500 h-full transition-all duration-1000" style={{ width: `${(conCount / (subCount + conCount || 1)) * 100}%` }} />
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>Impulsive ({subCount})</span>
                                <span>Logical ({conCount})</span>
                              </div>
                              <p className="text-sm mt-2 text-muted-foreground">
                                {aiAnalysisResult.subconsciousInsight.description}
                              </p>
                              {aiAnalysisResult.subconsciousInsight.recommendation && (
                                <p className="text-sm mt-2 text-primary font-medium">
                                  💡 {aiAnalysisResult.subconsciousInsight.recommendation}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Work Style Preference */}
                          {aiAnalysisResult.workStyleInsight && (
                            <div>
                               <h4 className="font-semibold mb-1">Work Style Preference</h4>
                               <div className="h-[200px] w-full">
                                 <ResponsiveContainer width="100%" height="100%">
                                   <BarChart data={preferenceData}>
                                     <XAxis dataKey="name" fontSize={12} />
                                     <YAxis fontSize={12} />
                                     <Tooltip />
                                     <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                       {preferenceData.map((entry, index) => (
                                         <Cell key={`cell-${index}`} fill={entry.color} />
                                       ))}
                                     </Bar>
                                   </BarChart>
                                 </ResponsiveContainer>
                               </div>
                               <p className="text-sm mt-2 text-muted-foreground">
                                 {aiAnalysisResult.workStyleInsight.description}
                               </p>
                               {aiAnalysisResult.workStyleInsight.careerSuggestions && aiAnalysisResult.workStyleInsight.careerSuggestions.length > 0 && (
                                 <div className="mt-2">
                                   <p className="text-xs font-semibold text-primary mb-1">Career Suggestions:</p>
                                   <ul className="text-sm text-muted-foreground">
                                     {aiAnalysisResult.workStyleInsight.careerSuggestions.map((suggestion, i) => (
                                       <li key={i} className="flex items-center gap-1">
                                         <span className="w-1 h-1 rounded-full bg-primary"></span>
                                         {suggestion}
                                       </li>
                                     ))}
                                   </ul>
                                 </div>
                               )}
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="border-primary/20 bg-gradient-to-br from-white to-primary/5">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary" />
                            Transformation Insight
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Time Use Insight */}
                          {aiAnalysisResult.timeUseInsight && (
                            <div className="p-4 bg-white/60 rounded-lg border border-primary/10">
                              <h4 className="font-semibold text-primary mb-1">{aiAnalysisResult.timeUseInsight.type}</h4>
                              <p className="text-sm text-foreground/80">{aiAnalysisResult.timeUseInsight.description}</p>
                              {aiAnalysisResult.timeUseInsight.recommendation && (
                                <p className="text-sm mt-2 text-primary font-medium">
                                  💡 {aiAnalysisResult.timeUseInsight.recommendation}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Resource Gaps */}
                          {aiAnalysisResult.resourceGaps && (
                            <div className="space-y-2">
                               <h4 className="font-semibold">Resource Gap Strategy:</h4>
                               <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                                 <p className="text-sm font-medium text-amber-800">
                                   Primary Gap: {aiAnalysisResult.resourceGaps.primaryGap}
                                 </p>
                                 <p className="text-sm text-amber-700 mt-1">
                                   {aiAnalysisResult.resourceGaps.strategy}
                                 </p>
                               </div>
                            </div>
                          )}

                          {/* Transformation Recommendation */}
                          {aiAnalysisResult.transformationRecommendation && (
                            <div className="pt-4 border-t border-primary/10">
                              <h4 className="font-semibold mb-2">Your Transformation Focus:</h4>
                              <p className="text-sm font-medium text-primary">
                                {aiAnalysisResult.transformationRecommendation.focus}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {aiAnalysisResult.transformationRecommendation.rationale}
                              </p>
                              {aiAnalysisResult.transformationRecommendation.immediateAction && (
                                <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-100">
                                  <p className="text-sm font-medium text-green-800">
                                    🎯 This Week: {aiAnalysisResult.transformationRecommendation.immediateAction}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          <Button 
                            className="w-full mt-4 cursor-pointer" 
                            onClick={() => setLocation("/actionable-focus")}
                          >
                            Proceed to Clarify Focus
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Overall Insight */}
                    {aiAnalysisResult.overallInsight && (
                      <Card className="border-primary/20 bg-gradient-to-r from-indigo-50 to-purple-50">
                        <CardContent className="p-6">
                          <p className="text-foreground/90 leading-relaxed italic">
                            "{aiAnalysisResult.overallInsight}"
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    {/* Regenerate Button */}
                    <div className="flex justify-center">
                      <Button 
                        variant="outline" 
                        onClick={handleRegenerate}
                        disabled={isAnalyzing}
                        className="gap-2 cursor-pointer"
                      >
                        <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
                        Regenerate Analysis
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </LockedFeature>
        </main>
      </div>
    </div>
  );
}