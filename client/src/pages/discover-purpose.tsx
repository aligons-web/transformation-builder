import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, ChevronRight, BookOpen, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

// Content derived from "Understanding Your Path"
const modules = [
  {
    id: 1,
    title: "Uncommon Beginnings",
    description: "Reflect on your origins and how early life experiences shape your resilience.",
    statement: "My background, no matter how humble or chaotic, has equipped me with unique survival skills and perspectives. Like the author's father who pursued dreams despite challenges, I can find creative ways to move forward.",
    questions: [
      "What are the 'uncommon' aspects of your upbringing that set you apart?",
      "Identify a challenge from your childhood that taught you resilience.",
      "How have your family's choices influenced your current view of success?"
    ]
  },
  {
    id: 2,
    title: "Young and Full of Energy",
    description: "Channeling youthful enthusiasm into productive avenues.",
    statement: "Energy without direction can lead to chaos, but harnessed energy creates momentum. I must learn to direct my passion towards my purpose.",
    questions: [
      "Where are you currently spending most of your energy?",
      "Describe a time when your enthusiasm opened a door for you.",
      "What distractions are draining your vitality right now?"
    ]
  },
  {
    id: 3,
    title: "Gaining Traction",
    description: "Moving from activity to progress.",
    statement: "Movement isn't always progress. Gaining traction means my efforts are finally starting to yield tangible results in the direction of my destiny.",
    questions: [
      "What is one area of your life where you feel you are finally moving forward?",
      "Identify the habits that are helping you gain traction.",
      "What friction points are still slowing you down?"
    ]
  },
  {
    id: 4,
    title: "While in Your Dungeon",
    description: "Finding purpose in the darkest moments.",
    statement: "The dungeon is not a tomb; it is a womb for transformation. Even in isolation or difficulty, I am being prepared for something greater.",
    questions: [
      "Do you feel 'stuck' or isolated right now? If so, what might this season be teaching you?",
      "How can you maintain hope when your circumstances look bleak?",
      "Write a letter to your future self about what you are overcoming today."
    ]
  },
  {
    id: 5,
    title: "Attitude that Opens Doors",
    description: "The role of mindset in opportunity.",
    statement: "My aptitude may get me in the room, but my attitude keeps me there. A posture of gratitude and willingness to learn attracts favor.",
    questions: [
      "How would others describe your attitude in high-pressure situations?",
      "Identify a recent situation where a shift in perspective changed the outcome.",
      "What is one attitude adjustment you can make today to open a new door?"
    ]
  },
  {
    id: 6,
    title: "Clues of Vision that Point to Your Future",
    description: "Recognizing the signs of your calling.",
    statement: "My future leaves breadcrumbs in my present. By paying attention to what excites me and what grieves me, I find clues to my ultimate assignment.",
    questions: [
      "What recurring dreams or desires have stayed with you over the years?",
      "When do you feel most 'alive' and aligned with your true self?",
      "List three 'clues' from your past that point to your potential future."
    ]
  },
  {
    id: 7,
    title: "What is Your Thirst Quotient?",
    description: "Measuring your desire for change.",
    statement: "Desire is the engine of transformation. I must be thirsty enough for change to endure the discomfort of growth.",
    questions: [
      "On a scale of 1-10, how desperate are you for change in your life?",
      "What are you willing to sacrifice to reach your next level?",
      "Is your current environment feeding your thirst or quenching your spirit?"
    ]
  },
  {
    id: 8,
    title: "Birthing Purpose Out of the Unexpected",
    description: "When life doesn't go according to plan.",
    statement: " interruptions are often invitations. My purpose may not look like what I imagined, but it will fit me perfectly.",
    questions: [
      "Describe an unexpected event that redirected your path.",
      "How can you find purpose in a situation you didn't choose?",
      "What good has come out of a 'bad' surprise in your life?"
    ]
  },
  {
    id: 9,
    title: "Connecting the Dots",
    description: "Seeing the full picture of your journey.",
    statement: "Nothing is wasted. Every chapter, every setback, and every victory is a dot that connects to form the masterpiece of my life.",
    questions: [
      "How do your past experiences (positive and negative) connect to your current passion?",
      "If your life was a book, what would the theme of the current chapter be?",
      "Write a vision statement that connects your past skills with your future impact."
    ]
  }
];

export default function DiscoverPurposePage() {
  const [activeModule, setActiveModule] = useState(modules[0]);
  const [isRecording, setIsRecording] = useState<number | null>(null);

  const toggleRecording = (index: number) => {
    if (isRecording === index) {
      setIsRecording(null);
    } else {
      setIsRecording(index);
      // Mock speech recognition start
      setTimeout(() => setIsRecording(null), 3000); // Auto stop mock
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5 px-4 py-1">
            Understanding Your Path
          </Badge>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Guided <span className="text-primary font-serif italic">Reflection</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the chapters of your life through guided modules derived from "Understanding Your Path." Reflect, record, and connect the dots.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4">
            <Card className="sticky top-24 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Modules</CardTitle>
                <CardDescription>Select a chapter to begin reflection</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[60vh]">
                  <div className="flex flex-col p-2 gap-1">
                    {modules.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => setActiveModule(module)}
                        className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between group ${
                          activeModule.id === module.id
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${
                             activeModule.id === module.id ? "border-white/30 bg-white/20" : "border-border bg-background"
                          }`}>
                            {module.id}
                          </div>
                          <span className="truncate max-w-[180px]">{module.title}</span>
                        </div>
                        {activeModule.id === module.id && (
                          <ChevronRight className="w-4 h-4 animate-in fade-in slide-in-from-left-1" />
                        )}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-primary/10 shadow-lg bg-white/80 backdrop-blur-md">
                  <CardHeader className="pb-6 border-b border-border/50">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <BookOpen className="w-5 h-5" />
                      <span className="font-medium">Chapter {activeModule.id}</span>
                    </div>
                    <CardTitle className="text-3xl font-heading">{activeModule.title}</CardTitle>
                    <CardDescription className="text-lg mt-2">{activeModule.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-8 space-y-8">
                    <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl">
                      <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Module Statement
                      </h3>
                      <p className="text-foreground/80 italic leading-relaxed">
                        "{activeModule.statement}"
                      </p>
                    </div>

                    <div className="space-y-8">
                      <h3 className="font-heading font-semibold text-xl">Reflection Questions</h3>
                      
                      {activeModule.questions.map((question, index) => (
                        <div key={index} className="space-y-3">
                          <label className="text-sm font-medium text-muted-foreground block">
                            {question}
                          </label>
                          <div className="relative group">
                            <Textarea 
                              placeholder="Type your reflection here..." 
                              className="min-h-[120px] resize-none bg-background/50 focus:bg-background transition-all p-4 pr-12 text-base leading-relaxed"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              className={`absolute right-2 top-2 transition-colors ${isRecording === index ? 'text-red-500 bg-red-50' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'}`}
                              onClick={() => toggleRecording(index)}
                              title="Speech to Text"
                            >
                              <Mic className={`w-5 h-5 ${isRecording === index ? 'animate-pulse' : ''}`} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button size="lg" className="shadow-lg shadow-primary/20">
                        Save Reflections
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}