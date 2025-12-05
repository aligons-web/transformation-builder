import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sparkles, ArrowRight, Mic, BarChart2, BookOpen, Bot, Loader2, CheckSquare, Clock } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Checkbox } from "@/components/ui/checkbox";

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
      { value: "CL2", label: "Consider the other person’s perspective and your values." }
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
  const [activeTab, setActiveTab] = useState("module1");
  const [subconsciousAnswers, setSubconsciousAnswers] = useState<Record<number, string>>({});
  const [preferenceAnswers, setPreferenceAnswers] = useState<Record<number, string>>({});
  const [isRecording, setIsRecording] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [skillsChecked, setSkillsChecked] = useState<string[]>([]);
  const [resourcesChecked, setResourcesChecked] = useState<string[]>([]);
  const [timeUseAnswers, setTimeUseAnswers] = useState<Record<number, string>>({});

  const toggleRecording = (id: string) => {
    if (isRecording === id) {
      setIsRecording(null);
    } else {
      setIsRecording(id);
      setTimeout(() => setIsRecording(null), 3000);
    }
  };

  const calculatePreferenceResults = () => {
    const counts = { People: 0, Things: 0, Data: 0, Mixed: 0 };
    Object.values(preferenceAnswers).forEach(val => {
      if (val in counts) counts[val as keyof typeof counts]++;
    });
    return [
      { name: "People", value: counts.People, color: "#f97316" }, // Orange
      { name: "Things", value: counts.Things, color: "#3b82f6" }, // Blue
      { name: "Data", value: counts.Data, color: "#8b5cf6" },   // Purple
      { name: "Mixed", value: counts.Mixed, color: "#10b981" }  // Emerald
    ];
  };

  const calculateSubconsciousResults = () => {
    let subCount = 0; // A & B (SL1 & SL2)
    let conCount = 0; // C & D (CL1 & CL2)
    
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

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <div className="flex-1 md:ml-64 flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-6 space-y-8 overflow-y-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">Transformation Analysis</h1>
              <p className="text-muted-foreground">Deep dive into Modules 1 & 2 of the Life Transformation Workbook.</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-muted/50 p-1">
              <TabsTrigger value="module1" className="text-base">Module 1: Why is transformation needed?</TabsTrigger>
              <TabsTrigger value="module2" className="text-base">Module 2: What will be your transformation?</TabsTrigger>
            </TabsList>

            <TabsContent value="module1" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    The Foundation of Change
                  </CardTitle>
                  <CardDescription>
                    "Why" is the first question we look at to understand the questions produced that relate to your transformation efforts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl">
                    <h3 className="font-bold text-foreground mb-2">Module Statement</h3>
                    <p className="text-foreground/80 italic">
                      "Change is inevitable—life delivers unexpected turns, and how we respond defines our trajectory. Reacting leaves us scrambling; being proactive empowers us to control outcomes."
                    </p>
                  </div>

                  <div className="space-y-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className="text-primary border-primary">Day 1</Badge>
                      <h3 className="font-heading font-semibold text-xl">Subconscious vs. Conscious Mind Quiz</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Understand your default reaction to challenges.</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-8">
                        {subconsciousQuiz.map((q, i) => (
                          <div key={i} className="space-y-4">
                            <Label className="text-base">{i + 1}. {q.question}</Label>
                            <RadioGroup 
                              onValueChange={(val) => setSubconsciousAnswers(prev => ({ ...prev, [i]: val }))}
                              className="space-y-2"
                            >
                              {q.options.map((opt, j) => (
                                <div key={j} className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                                  <RadioGroupItem value={opt.value} id={`m1-q${i}-opt${j}`} />
                                  <Label htmlFor={`m1-q${i}-opt${j}`} className="flex-1 cursor-pointer font-normal">
                                    {opt.label} <span className="text-xs text-muted-foreground ml-2">({opt.value})</span>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        ))}
                      </div>
                      
                      <div className="lg:col-span-1">
                         <div className="sticky top-6">
                           <Card className="bg-muted/30 border-primary/20">
                             <CardHeader className="pb-2">
                               <CardTitle className="text-lg">Results Tally</CardTitle>
                               <CardDescription>See which mind is more active in your decision-making.</CardDescription>
                             </CardHeader>
                             <CardContent className="space-y-6 pt-4">
                               <div className="space-y-2">
                                 <div className="flex justify-between items-center text-sm font-medium">
                                   <span>Subconscious (A's & B's)</span>
                                   <span className="text-2xl font-bold text-primary">{subCount}</span>
                                 </div>
                                 <div className="h-2 bg-background rounded-full overflow-hidden">
                                   <div 
                                     className="h-full bg-primary transition-all duration-500 ease-out"
                                     style={{ width: `${(subCount / 10) * 100}%` }}
                                   />
                                 </div>
                                 <p className="text-xs text-muted-foreground">Instinctive, automatic, emotional, associative.</p>
                               </div>

                               <div className="space-y-2">
                                 <div className="flex justify-between items-center text-sm font-medium">
                                   <span>Conscious (C's & D's)</span>
                                   <span className="text-2xl font-bold text-blue-500">{conCount}</span>
                                 </div>
                                 <div className="h-2 bg-background rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-blue-500 transition-all duration-500 ease-out"
                                      style={{ width: `${(conCount / 10) * 100}%` }}
                                    />
                                 </div>
                                 <p className="text-xs text-muted-foreground">Rational, logical, reflective, intentional.</p>
                               </div>

                               <div className="bg-background p-4 rounded-lg border border-border text-center mt-4">
                                 <div className="text-sm font-medium text-muted-foreground mb-1">Total Score</div>
                                 <div className="font-mono text-lg">
                                   A/B: <span className="font-bold text-primary">{subCount}</span> + C/D: <span className="font-bold text-blue-500">{conCount}</span> = 10
                                 </div>
                               </div>
                             </CardContent>
                           </Card>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Day 2: Considerations for Transformation */}
                  <div className="space-y-6 pt-8 border-t border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className="text-primary border-primary">Day 2</Badge>
                      <h3 className="font-heading font-semibold text-xl">Considerations for Transformation</h3>
                    </div>
                    {[
                      "Are there areas of brokenness or sin that must be addressed?",
                      "If an elevated level of dissatisfaction currently exists, what is the root of it?",
                      "What are the long-term consequences of not changing?",
                      "What underlying beliefs or values have been confronted to determine the need for transformation?",
                      "Additional Notes (Influences, values, principles):"
                    ].map((q, i) => (
                      <div key={i} className="space-y-2">
                        <Label>{q}</Label>
                        <div className="relative">
                          <Textarea placeholder="Reflect and write here..." className="min-h-[80px] pr-12" />
                          <Button
                            size="icon"
                            variant="ghost"
                            className={`absolute right-2 top-2 ${isRecording === `d2-${i}` ? 'text-red-500' : 'text-muted-foreground'}`}
                            onClick={() => toggleRecording(`d2-${i}`)}
                          >
                            <Mic className={`w-4 h-4 ${isRecording === `d2-${i}` ? 'animate-pulse' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Day 3: Reflection */}
                  <div className="space-y-6 pt-8 border-t border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className="text-primary border-primary">Day 3</Badge>
                      <h3 className="font-heading font-semibold text-xl">Reflection & Reaction</h3>
                    </div>
                    {[
                      "Have you experienced an unexpected and undesirable development?",
                      "Did you react? If so, describe the reaction.",
                      "How can you take initiative practically and spiritually?",
                      "How do you maneuver until your doors of opportunity open?",
                      "What will be your position and posture despite the difficulties confronting you?"
                    ].map((q, i) => (
                      <div key={i} className="space-y-2">
                        <Label>{q}</Label>
                        <div className="relative">
                          <Textarea placeholder="Reflect and write here..." className="min-h-[80px] pr-12" />
                          <Button
                            size="icon"
                            variant="ghost"
                            className={`absolute right-2 top-2 ${isRecording === `d3-${i}` ? 'text-red-500' : 'text-muted-foreground'}`}
                            onClick={() => toggleRecording(`d3-${i}`)}
                          >
                            <Mic className={`w-4 h-4 ${isRecording === `d3-${i}` ? 'animate-pulse' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="bg-muted/30 p-6 rounded-xl border border-border mt-6">
                      <Label className="text-base font-semibold mb-4 block">How do you view challenges?</Label>
                      <RadioGroup className="space-y-3">
                        {[
                          "As opportunities to grow.",
                          "As necessary, but stressful.",
                          "As obstacles that slow me down.",
                          "As things to avoid if possible."
                        ].map((opt, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <RadioGroupItem value={opt} id={`d3-mcq-${i}`} />
                            <Label htmlFor={`d3-mcq-${i}`} className="font-normal cursor-pointer">{opt}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Day 4: Understanding Experiences */}
                  <div className="space-y-6 pt-8 border-t border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className="text-primary border-primary">Day 4</Badge>
                      <h3 className="font-heading font-semibold text-xl">Understanding Our Experiences</h3>
                    </div>
                    <div className="bg-blue-50/50 p-4 rounded-lg text-sm text-blue-900 mb-4">
                      <p className="italic">"The path of common things creates a blindness to new possibilities."</p>
                    </div>
                    {[
                      "What experiences have you encountered that can hinder you moving forward to a new version of yourself?",
                      "List the things below that you have discovered about yourself from days 1 – 4.",
                      "Reflect and journal how you could decide to embrace challenges."
                    ].map((q, i) => (
                      <div key={i} className="space-y-2">
                        <Label>{q}</Label>
                        <div className="relative">
                          <Textarea placeholder="Reflect and write here..." className="min-h-[80px] pr-12" />
                          <Button
                            size="icon"
                            variant="ghost"
                            className={`absolute right-2 top-2 ${isRecording === `d4-${i}` ? 'text-red-500' : 'text-muted-foreground'}`}
                            onClick={() => toggleRecording(`d4-${i}`)}
                          >
                            <Mic className={`w-4 h-4 ${isRecording === `d4-${i}` ? 'animate-pulse' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Day 5: Breaking Barriers */}
                  <div className="space-y-6 pt-8 border-t border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className="text-primary border-primary">Day 5</Badge>
                      <h3 className="font-heading font-semibold text-xl">Breaking Barriers</h3>
                    </div>
                    {[
                      "How will invisible boundaries, oppositions, fences, walls, and ideas (mental barriers) negatively impact or impede your progress to transformation?",
                      "Write positive statements that contribute to essential change.",
                      "Include scriptural references for your positive statements and incorporate them into your personal prayer."
                    ].map((q, i) => (
                      <div key={i} className="space-y-2">
                        <Label>{q}</Label>
                        <div className="relative">
                          <Textarea placeholder="Reflect and write here..." className="min-h-[80px] pr-12" />
                          <Button
                            size="icon"
                            variant="ghost"
                            className={`absolute right-2 top-2 ${isRecording === `d5-${i}` ? 'text-red-500' : 'text-muted-foreground'}`}
                            onClick={() => toggleRecording(`d5-${i}`)}
                          >
                            <Mic className={`w-4 h-4 ${isRecording === `d5-${i}` ? 'animate-pulse' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Day 6: Perspectives */}
                  <div className="space-y-6 pt-8 border-t border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className="text-primary border-primary">Day 6</Badge>
                      <h3 className="font-heading font-semibold text-xl">Perspectives</h3>
                    </div>
                    <div className="space-y-2">
                      <Label>Imagine you were sharing with your child your last words. What would those words be?</Label>
                      <div className="relative">
                        <Textarea placeholder="Write your legacy words here..." className="min-h-[120px] pr-12 italic" />
                        <Button
                          size="icon"
                          variant="ghost"
                          className={`absolute right-2 top-2 ${isRecording === `d6-1` ? 'text-red-500' : 'text-muted-foreground'}`}
                          onClick={() => toggleRecording(`d6-1`)}
                        >
                          <Mic className={`w-4 h-4 ${isRecording === `d6-1` ? 'animate-pulse' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Day 7: Thinking & Reflecting */}
                  <div className="space-y-6 pt-8 border-t border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className="text-primary border-primary">Day 7</Badge>
                      <h3 className="font-heading font-semibold text-xl">Thinking & Reflecting</h3>
                    </div>
                    {[
                      "Why now? What are the opportunities in your opposition?",
                      "Is there a sense of urgency or a specific catalyst (job loss, major unexpected life events, etc.) for change?",
                      "What opportunities for a fulfilled life are you losing by delaying your LIFE Transformation?",
                      "Is there a prominent level of intolerance to remain in the current situation or a strong awareness that there is a fulfilling life to tap into?"
                    ].map((q, i) => (
                      <div key={i} className="space-y-2">
                        <Label>{q}</Label>
                        <div className="relative">
                          <Textarea placeholder="Reflect and write here..." className="min-h-[80px] pr-12" />
                          <Button
                            size="icon"
                            variant="ghost"
                            className={`absolute right-2 top-2 ${isRecording === `d7-${i}` ? 'text-red-500' : 'text-muted-foreground'}`}
                            onClick={() => toggleRecording(`d7-${i}`)}
                          >
                            <Mic className={`w-4 h-4 ${isRecording === `d7-${i}` ? 'animate-pulse' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Biblical Foundations & AI Analysis */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-border">
                    
                    {/* Biblical Foundations */}
                    <Card className="bg-amber-50/50 border-amber-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-900">
                          <BookOpen className="w-5 h-5" />
                          Biblical Foundations
                        </CardTitle>
                        <CardDescription className="text-amber-700/80">
                          Scriptural pillars for your transformation journey.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                        {[
                          { ref: "Daniel 1:8", text: "But Daniel resolved not to defile himself with the royal food and wine..." },
                          { ref: "Genesis 40:8", text: "Then Joseph said to them, 'Do not interpretations belong to God? Tell me your dreams.'" },
                          { ref: "Nehemiah 1:3-4", text: "...When I heard these things, I sat down and wept. For some days I mourned and fasted and prayed..." },
                          { ref: "1 Corinthians 2:14", text: "The person without the Spirit does not accept the things that come from the Spirit of God..." },
                          { ref: "Matthew 16:26", text: "For what profit is it to a man if he gains the whole world, and loses his own soul?" },
                          { ref: "Philippians 2:13", text: "For it is God who works in you to will and to act in order to fulfill his good purpose." },
                          { ref: "2 Corinthians 5:17", text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!" },
                          { ref: "Romans 8:14", text: "For those who are led by the Spirit of God are the children of God." },
                          { ref: "Esther 4:14", text: "...And who knows but that you have come to your royal position for such a time as this?" },
                          { ref: "Isaiah 54:17", text: "no weapon forged against you will prevail, and you will refute every tongue that accuses you." }
                        ].map((scripture, i) => (
                          <div key={i} className="space-y-1">
                            <h4 className="font-semibold text-amber-900 text-sm">{scripture.ref}</h4>
                            <p className="text-sm text-amber-800 italic">"{scripture.text}"</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* AI Analysis */}
                    <Card className="bg-gradient-to-br from-primary/5 to-blue-50/50 border-primary/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary">
                          <Sparkles className="w-5 h-5" />
                          AI Spiritual Analysis
                        </CardTitle>
                        <CardDescription>
                          Get spiritual insights connecting your journal entries to biblical principles.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {!showAnalysis ? (
                          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                            <div className="p-4 bg-background rounded-full shadow-sm">
                              <Bot className="w-8 h-8 text-primary/60" />
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-semibold text-lg">Ready to analyze your reflections?</h4>
                              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                                Our AI will review your responses and provide scriptural correlations and encouragement.
                              </p>
                            </div>
                            <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full max-w-xs">
                              {isAnalyzing ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Analyzing...
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-4 h-4 mr-2" />
                                  Generate Insight
                                </>
                              )}
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-primary/10 shadow-sm space-y-4">
                              <div className="flex items-start gap-3">
                                <Sparkles className="w-5 h-5 text-primary mt-1 shrink-0" />
                                <div className="space-y-2">
                                  <h4 className="font-semibold text-primary">Analysis Summary</h4>
                                  <p className="text-sm text-foreground/80 leading-relaxed">
                                    Your reflections indicate a strong desire for <span className="font-medium text-primary">purpose-driven change</span>, similar to Nehemiah's burden for restoration.
                                    The barrier you identified in Day 5 aligns with the need for <span className="font-medium text-primary">mental renewal</span> mentioned in Romans 12:2.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="space-y-3 pt-2">
                                <h5 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Key Correlations</h5>
                                <ul className="space-y-3">
                                  <li className="text-sm flex gap-3 items-start">
                                    <div className="min-w-1.5 h-1.5 rounded-full bg-amber-400 mt-2" />
                                    <span>
                                      <strong>Your Struggle:</strong> "Fear of the unknown" <br/>
                                      <strong>Scripture:</strong> <em>Isaiah 54:17</em> reminds you that no weapon formed against you shall prosper.
                                    </span>
                                  </li>
                                  <li className="text-sm flex gap-3 items-start">
                                    <div className="min-w-1.5 h-1.5 rounded-full bg-blue-400 mt-2" />
                                    <span>
                                      <strong>Your Motivation:</strong> "Wanting to leave a legacy" <br/>
                                      <strong>Scripture:</strong> <em>Esther 4:14</em> suggests you may be in this position "for such a time as this."
                                    </span>
                                  </li>
                                </ul>
                              </div>

                              <Button variant="outline" onClick={() => setShowAnalysis(false)} className="w-full text-xs mt-2">
                                Analyze Again
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="module2" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-primary" />
                    Defining Your Transformation
                  </CardTitle>
                  <CardDescription>
                    Identify your target and understand your natural preferences for working with People, Things, or Data.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  
                  {/* Transformation Target Selection */}
                  <div className="space-y-4">
                    <h3 className="font-heading font-semibold text-xl">Identify Your Transformation Target</h3>
                    <p className="text-sm text-muted-foreground">Select the outcome that best identifies your target success.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {successTypes.map((type, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <input type="checkbox" id={`success-${i}`} className="rounded border-gray-300 text-primary focus:ring-primary" />
                          <Label htmlFor={`success-${i}`} className="font-normal cursor-pointer">{type}</Label>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2">
                         <input type="checkbox" id="success-other" className="rounded border-gray-300 text-primary focus:ring-primary" />
                         <Label htmlFor="success-other" className="font-normal cursor-pointer">Other (Specify in notes)</Label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border"></div>

                  {/* Preference Assessment */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="font-heading font-semibold text-xl">Skill Preference Assessment</h3>
                      <p className="text-sm text-muted-foreground">For each question, choose the option that best identifies your preference.</p>
                      
                      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
                        {preferenceQuiz.map((q, i) => (
                          <div key={i} className="space-y-3 p-4 rounded-lg bg-muted/30">
                            <Label className="font-medium">{i + 1}. {q.question}</Label>
                            <RadioGroup 
                              onValueChange={(val) => setPreferenceAnswers(prev => ({ ...prev, [i]: val }))}
                              className="space-y-2"
                            >
                              {q.options.map((opt, j) => (
                                <div key={j} className="flex items-center space-x-2">
                                  <RadioGroupItem value={opt.value} id={`m2-q${i}-opt${j}`} />
                                  <Label htmlFor={`m2-q${i}-opt${j}`} className="font-normal cursor-pointer text-sm">
                                    {opt.label}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="font-heading font-semibold text-xl">Your Preference Profile</h3>
                      <Card className="bg-muted/20 border-none shadow-inner">
                        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px]">
                          {Object.keys(preferenceAnswers).length > 0 ? (
                            <div className="w-full h-[300px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={preferenceData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                  <XAxis type="number" allowDecimals={false} />
                                  <YAxis dataKey="name" type="category" />
                                  <Tooltip cursor={{fill: 'transparent'}} />
                                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                    {preferenceData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Bar>
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          ) : (
                            <div className="text-center text-muted-foreground">
                              <BarChart2 className="w-12 h-12 mx-auto mb-2 opacity-20" />
                              <p>Complete the assessment to see your results chart.</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      
                      <div className="bg-primary/5 p-4 rounded-lg">
                        <h4 className="font-bold text-sm mb-2">Interpretation Guide:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li><strong className="text-orange-500">People:</strong> Naturally thrives working with others.</li>
                          <li><strong className="text-blue-500">Things:</strong> Focus on equipment, materials, technology.</li>
                          <li><strong className="text-purple-500">Data:</strong> Focus on facts, statistics, information.</li>
                          <li><strong className="text-emerald-500">Mixed:</strong> Versatile combination of preferences.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className="text-primary border-primary">Day 2</Badge>
                      <h3 className="font-heading font-semibold text-xl">Capacity to Help Others</h3>
                    </div>
                    {[
                      "What area(s) of life will be transformed (e.g. communication, career, relationships, health, finances, personal growth, etc.)?",
                      "What will your transformation contribute to?",
                      "What specific behaviors or habits need to change?",
                      "What skills or knowledge will you need to acquire?"
                    ].map((q, i) => (
                      <div key={i} className="space-y-2">
                        <Label>{q}</Label>
                        <div className="relative">
                          <Textarea placeholder="Type your response..." className="min-h-[80px] pr-12" />
                          <Button
                            size="icon"
                            variant="ghost"
                            className={`absolute right-2 top-2 ${isRecording === `m2-d2-${i}` ? 'text-red-500' : 'text-muted-foreground'}`}
                            onClick={() => toggleRecording(`m2-d2-${i}`)}
                          >
                            <Mic className={`w-4 h-4 ${isRecording === `m2-d2-${i}` ? 'animate-pulse' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Day 3: Filling the Gaps */}
                  <div className="space-y-6 pt-8 border-t border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className="text-primary border-primary">Day 3</Badge>
                      <h3 className="font-heading font-semibold text-xl">Filling the Gaps</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Identify areas that require attention and a plan of action.</p>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[600px] border-collapse">
                        <thead>
                          <tr className="bg-muted/50 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            <th className="p-3 border-b">Deficiency Area</th>
                            <th className="p-3 border-b">Offering Difficulty</th>
                            <th className="p-3 border-b">Subconscious Barrier</th>
                            <th className="p-3 border-b">Attitude</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {[1, 2, 3].map((row) => (
                            <tr key={row}>
                              <td className="p-2 align-top">
                                <RadioGroup defaultValue="">
                                  <div className="space-y-2 pt-1">
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="people" id={`da-people-${row}`} />
                                      <Label htmlFor={`da-people-${row}`} className="font-normal cursor-pointer">People</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="things" id={`da-things-${row}`} />
                                      <Label htmlFor={`da-things-${row}`} className="font-normal cursor-pointer">Things</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="data" id={`da-data-${row}`} />
                                      <Label htmlFor={`da-data-${row}`} className="font-normal cursor-pointer">Data</Label>
                                    </div>
                                  </div>
                                </RadioGroup>
                              </td>
                              <td className="p-2 align-top">
                                <select className="w-full h-[40px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                  <option value="">Select...</option>
                                  <option value="product">Building a Product</option>
                                  <option value="service">Providing a Service</option>
                                  <option value="both">Service and Product Offer</option>
                                </select>
                              </td>
                              <td className="p-2"><Textarea className="min-h-[60px] text-sm" placeholder="Comfort zone..." /></td>
                              <td className="p-2">
                                <select className="w-full h-[60px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                  <option value="">Select...</option>
                                  <option value="uncertain">Uncertain/Reactive</option>
                                  <option value="growth">Growth/Improvement</option>
                                  <option value="resilient">Resilient/Proactive</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label>Strategies to Close Gaps</Label>
                      <Textarea placeholder="Journal your thoughts, adjustments, or plans..." className="min-h-[100px]" />
                    </div>
                  </div>

                  {/* Day 4: Skills & Tools */}
                  <div className="space-y-6 pt-8 border-t border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className="text-primary border-primary">Day 4</Badge>
                      <h3 className="font-heading font-semibold text-xl">Determining Skills Needed</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">Skills/Tools Checklist</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {skillsList.map((skill) => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`skill-${skill}`} 
                              checked={skillsChecked.includes(skill)}
                              onCheckedChange={(checked) => {
                                if (checked) setSkillsChecked([...skillsChecked, skill]);
                                else setSkillsChecked(skillsChecked.filter(s => s !== skill));
                              }}
                            />
                            <Label htmlFor={`skill-${skill}`} className="text-sm font-normal cursor-pointer">{skill}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      <Label>Discoveries from Days 1-3 & Essential Tools</Label>
                      <div className="relative">
                        <Textarea placeholder="List things that profoundly got your attention..." className="min-h-[100px] pr-12" />
                        <Button size="icon" variant="ghost" className="absolute right-2 top-2 text-muted-foreground">
                          <Mic className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <h4 className="font-medium text-sm">Resources & Qualities Constraints</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {resourcesList.map((resource) => (
                          <div key={resource} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`res-${resource}`}
                              checked={resourcesChecked.includes(resource)}
                              onCheckedChange={(checked) => {
                                if (checked) setResourcesChecked([...resourcesChecked, resource]);
                                else setResourcesChecked(resourcesChecked.filter(r => r !== resource));
                              }}
                            />
                            <Label htmlFor={`res-${resource}`} className="text-sm font-normal cursor-pointer">{resource}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Day 5: Sacrifices */}
                  <div className="space-y-6 pt-8 border-t border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className="text-primary border-primary">Day 5</Badge>
                      <h3 className="font-heading font-semibold text-xl">Considering Sacrifices</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h4 className="font-medium text-sm">Time-Use Assessment</h4>
                        {timeUseQuiz.map((q, i) => (
                          <div key={i} className="space-y-3 p-4 rounded-lg bg-muted/30">
                            <Label className="font-medium">{q.question}</Label>
                            <RadioGroup 
                              onValueChange={(val) => setTimeUseAnswers(prev => ({ ...prev, [i]: val }))}
                              className="space-y-2"
                            >
                              {q.options.map((opt, j) => (
                                <div key={j} className="flex items-center space-x-2">
                                  <RadioGroupItem value={opt.value} id={`tu-q${i}-opt${j}`} />
                                  <Label htmlFor={`tu-q${i}-opt${j}`} className="font-normal cursor-pointer text-sm">
                                    {opt.label}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-6">
                        <h4 className="font-medium text-sm">Analysis & Reflection</h4>
                        <Card className="bg-blue-50/50 border-blue-100">
                          <CardContent className="p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
                            {timeUseResult ? (
                              <div className="space-y-2 animate-in fade-in zoom-in duration-500">
                                <Clock className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                                <h5 className="font-bold text-lg text-blue-900">{timeUseResult.title}</h5>
                                <p className="text-sm text-blue-800">{timeUseResult.desc}</p>
                              </div>
                            ) : (
                              <div className="text-muted-foreground">
                                <Clock className="w-12 h-12 mx-auto mb-2 opacity-20" />
                                <p className="text-sm">Complete the assessment to see your time-use profile.</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        <div className="space-y-2">
                          <Label>What sacrifices might be necessary?</Label>
                          <div className="relative">
                            <Textarea placeholder="Reflect on delayed gratification..." className="min-h-[120px] pr-12" />
                            <Button size="icon" variant="ghost" className="absolute right-2 top-2 text-muted-foreground">
                              <Mic className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Biblical Foundations & AI Analysis for Module 2 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-border">
                    
                    {/* Biblical Foundations */}
                    <Card className="bg-amber-50/50 border-amber-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-900">
                          <BookOpen className="w-5 h-5" />
                          Biblical Foundations
                        </CardTitle>
                        <CardDescription className="text-amber-700/80">
                          Scriptural pillars for defining your transformation.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                        {[
                          { ref: "Genesis 1:27", text: "So God created mankind in his own image, in the image of God he created them..." },
                          { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
                          { ref: "Philippians 4:11", text: "I am not saying this because I am in need, for I have learned to be content whatever the circumstances." },
                          { ref: "Psalms 1:1-3", text: "Blessed is the one... whose delight is in the law of the Lord... That person is like a tree planted by streams of water..." },
                          { ref: "Romans 12:2", text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind." }
                        ].map((scripture, i) => (
                          <div key={i} className="space-y-1">
                            <h4 className="font-semibold text-amber-900 text-sm">{scripture.ref}</h4>
                            <p className="text-sm text-amber-800 italic">"{scripture.text}"</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* AI Analysis */}
                    <Card className="bg-gradient-to-br from-primary/5 to-blue-50/50 border-primary/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary">
                          <Sparkles className="w-5 h-5" />
                          AI Spiritual Analysis
                        </CardTitle>
                        <CardDescription>
                          Get spiritual insights connecting your skills and sacrifices to biblical principles.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {!showAnalysis ? (
                          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                            <div className="p-4 bg-background rounded-full shadow-sm">
                              <Bot className="w-8 h-8 text-primary/60" />
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-semibold text-lg">Ready to analyze your path?</h4>
                              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                                Our AI will review your preferences, gaps, and sacrifices to provide encouragement.
                              </p>
                            </div>
                            <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full max-w-xs">
                              {isAnalyzing ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Analyzing...
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-4 h-4 mr-2" />
                                  Generate Insight
                                </>
                              )}
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-primary/10 shadow-sm space-y-4">
                              <div className="flex items-start gap-3">
                                <Sparkles className="w-5 h-5 text-primary mt-1 shrink-0" />
                                <div className="space-y-2">
                                  <h4 className="font-semibold text-primary">Analysis Summary</h4>
                                  <p className="text-sm text-foreground/80 leading-relaxed">
                                    Your preference for <span className="font-medium text-primary">People</span> and desire to overcome "Lack of time" suggests a call to <span className="font-medium text-primary">relational stewardship</span>.
                                    Like Nehemiah who organized people to rebuild, your skills in Leadership can be used for restoration.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="space-y-3 pt-2">
                                <h5 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Key Correlations</h5>
                                <ul className="space-y-3">
                                  <li className="text-sm flex gap-3 items-start">
                                    <div className="min-w-1.5 h-1.5 rounded-full bg-amber-400 mt-2" />
                                    <span>
                                      <strong>Your Sacrifice:</strong> "Giving up leisure time" <br/>
                                      <strong>Scripture:</strong> <em>Philippians 3:8</em> speaks to counting all things as loss for the surpassing worth of knowing Christ.
                                    </span>
                                  </li>
                                  <li className="text-sm flex gap-3 items-start">
                                    <div className="min-w-1.5 h-1.5 rounded-full bg-blue-400 mt-2" />
                                    <span>
                                      <strong>Your Strength:</strong> "Communication" <br/>
                                      <strong>Scripture:</strong> <em>Proverbs 25:11</em> - "A word fitly spoken is like apples of gold in settings of silver."
                                    </span>
                                  </li>
                                </ul>
                              </div>

                              <Button variant="outline" onClick={() => setShowAnalysis(false)} className="w-full text-xs mt-2">
                                Analyze Again
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
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