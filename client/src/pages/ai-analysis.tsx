import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sparkles, ArrowRight, Mic, BarChart2, BookOpen } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

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

                  <div className="space-y-6">
                    <h3 className="font-heading font-semibold text-xl">Reflection Questions</h3>
                    {[
                      "Why is personal transformation necessary for you right now?",
                      "Why has there been such disruption, dissatisfaction, or disorientation at this stage in your life?",
                      "Are there areas of brokenness or sin that must be addressed?",
                      "What are the long-term consequences of NOT changing?"
                    ].map((q, i) => (
                      <div key={i} className="space-y-2">
                        <Label>{q}</Label>
                        <div className="relative">
                          <Textarea placeholder="Type your response..." className="min-h-[100px] pr-12" />
                          <Button
                            size="icon"
                            variant="ghost"
                            className={`absolute right-2 top-2 ${isRecording === `m1-${i}` ? 'text-red-500' : 'text-muted-foreground'}`}
                            onClick={() => toggleRecording(`m1-${i}`)}
                          >
                            <Mic className={`w-4 h-4 ${isRecording === `m1-${i}` ? 'animate-pulse' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6 pt-6 border-t border-border">
                    <h3 className="font-heading font-semibold text-xl">Subconscious vs. Conscious Mind Quiz</h3>
                    <p className="text-sm text-muted-foreground">Understand your default reaction to challenges.</p>
                    
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
                    <h3 className="font-heading font-semibold text-xl">Module 2 Reflection</h3>
                    {[
                      "What area(s) of life will be transformed (e.g. communication, career, relationships)?",
                      "What specific behaviors or habits need to change?",
                      "What skills or knowledge will you need to acquire?"
                    ].map((q, i) => (
                      <div key={i} className="space-y-2">
                        <Label>{q}</Label>
                        <div className="relative">
                          <Textarea placeholder="Type your response..." className="min-h-[100px] pr-12" />
                          <Button
                            size="icon"
                            variant="ghost"
                            className={`absolute right-2 top-2 ${isRecording === `m2-r${i}` ? 'text-red-500' : 'text-muted-foreground'}`}
                            onClick={() => toggleRecording(`m2-r${i}`)}
                          >
                            <Mic className={`w-4 h-4 ${isRecording === `m2-r${i}` ? 'animate-pulse' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    ))}
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