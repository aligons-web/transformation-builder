import { useUser } from "@/hooks/useUser";
import { PLANS } from "@shared/config/plans";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, ArrowRight, Mic, BarChart2, BookOpen, Bot, Loader2, Clock, MicOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { LockedStep } from "@/components/LockedStep";

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

export default function TransformationAnalysisPage() {
  // 🔐 PLAN ACCESS CHECK - Must be at the top, before other hooks
  const { user, loading } = useUser();
  const userPlan = (user?.plan ?? "explorer") as keyof typeof PLANS;
  const canAccessStep2 = PLANS[userPlan]?.access?.step2 ?? false;

  // All other hooks
  const [activeTab, setActiveTab] = useState("module1");
  const [subconsciousAnswers, setSubconsciousAnswers] = useState<Record<number, string>>({});
  const [preferenceAnswers, setPreferenceAnswers] = useState<Record<number, string>>({});
  const [isRecording, setIsRecording] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [skillsChecked, setSkillsChecked] = useState<string[]>([]);
  const [resourcesChecked, setResourcesChecked] = useState<string[]>([]);
  const [timeUseAnswers, setTimeUseAnswers] = useState<Record<number, string>>({});
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [successChecked, setSuccessChecked] = useState<string[]>([]);
  const [otherSuccessText, setOtherSuccessText] = useState("");
  const [otherSkillText, setOtherSkillText] = useState("");
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const [, setLocation] = useLocation();

  // All useEffect hooks
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

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;

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

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
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
      toast({ title: "Recording Stopped", description: "Your speech has been captured." });
    } else {
      if (isRecording !== null) recognitionRef.current.stop();
      setIsRecording(id);
      recognitionRef.current.start();
      toast({ title: "Listening...", description: "Speak clearly into your microphone." });
    }
  };

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

  const calculateTimeUseResult = () => {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    Object.values(timeUseAnswers).forEach(val => {
      if (val in counts) counts[val as keyof typeof counts]++;
    });

    const max = Math.max(...Object.values(counts));
    const types = Object.keys(counts).filter(k => counts[k as keyof typeof counts] === max);

    if (Object.keys(timeUseAnswers).length < 4) return null;

    if (types.includes("A")) return { type: "A", title: "Highly Disciplined & Self-Driven", desc: "You value structure and productivity." };
    if (types.includes("B")) return { type: "B", title: "Independent Learner", desc: "You prioritize skill development and growth." };
    if (types.includes("C")) return { type: "C", title: "Relaxation Focused", desc: "You tend to prioritize entertainment and downtime." };
    if (types.includes("D")) return { type: "D", title: "Socially Connected", desc: "You value shared experiences and connection." };
    return null;
  };

  const timeUseResult = calculateTimeUseResult();

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowAnalysis(true);
    }, 2000);
  };

  // ✅ NOW it's safe to return conditionally (after all hooks have run)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Loading your plan…</span>
      </div>
    );
  }

  if (!canAccessStep2) {
    return (
      <LockedStep
        stepTitle="Step 2: Analyze Change"
        requiredPlan="Transformer"
        description="You've discovered your purpose. The next step is analyzing what must change and how to move forward."
        ctaLabel="Upgrade to Transformer"
        ctaHref="/pricing"
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <div className="flex-1 md:ml-64 flex flex-col">
        <DashboardHeader title="Step 2: Analyze Change" />

        <main className="flex-1 p-6 space-y-8 overflow-y-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">Step 2: Analyze Change</h1>
              <p className="text-muted-foreground">Deep dive into Modules 1 & 2 of the Life Transformation Workbook.</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-muted/50 p-1">
              <TabsTrigger value="module1" className="text-base">Module 1: Why is transformation needed?</TabsTrigger>
              <TabsTrigger value="module2" className="text-base">Module 2: What will be your transformation?</TabsTrigger>
            </TabsList>

            {/* Add your TabsContent components here */}
          </Tabs>
        </main>
      </div>
    </div>
  );
}