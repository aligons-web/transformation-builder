import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, ChevronRight, BookOpen, Save, Compass, Lightbulb, MicOff, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Content derived from "Understanding Your Path"
// imported from lib/purpose-modules.ts to share with summary page
import { modules } from "@/lib/purpose-modules";

export default function DiscoverPurposePage() {
  const [activeModule, setActiveModule] = useState(modules[0]);
  const [isRecording, setIsRecording] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { toast } = useToast();
  
  // Refs for speech recognition
  const recognitionRef = useRef<any>(null);

  // Load answers from localStorage on mount
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
          const key = `${activeModule.id}-${isRecording}`;
          setAnswers(prev => ({
            ...prev,
            [key]: (prev[key] || '') + ' ' + finalTranscript
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
      
      recognitionRef.current.onend = () => {
         // If we're still supposed to be recording but it stopped (e.g. silence), restart
         // Not strictly necessary for this mockup but good practice
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [activeModule.id, isRecording, toast]);

  const toggleRecording = (index: number) => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive"
      });
      return;
    }

    if (isRecording === index) {
      recognitionRef.current.stop();
      setIsRecording(null);
      toast({
        title: "Recording Stopped",
        description: "Your speech has been captured.",
      });
    } else {
      // If recording another field, stop that one first
      if (isRecording !== null) {
        recognitionRef.current.stop();
      }
      
      setIsRecording(index);
      recognitionRef.current.start();
      toast({
        title: "Listening...",
        description: "Speak clearly into your microphone.",
      });
    }
  };

  const handleTextChange = (index: number, value: string) => {
    const key = `${activeModule.id}-${index}`;
    setAnswers(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveReflections = () => {
    localStorage.setItem("purpose-reflections", JSON.stringify(answers));
    toast({
      title: "Reflections Saved",
      description: "Your answers have been securely saved to your local device.",
    });
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
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 transition-colors">
                  <Compass className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl font-heading font-semibold">
                  Discover Purpose
                </CardTitle>
                <div className="h-4" />
                <CardTitle className="text-lg">Modules</CardTitle>
                <CardDescription>Select a chapter to begin reflection</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[60vh]">
                  <div className="flex flex-col p-2 gap-1">
                    {modules.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => {
                            setActiveModule(module);
                            if (isRecording !== null) {
                                if (recognitionRef.current) recognitionRef.current.stop();
                                setIsRecording(null);
                            }
                        }}
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
                
                <div className="p-4 pt-2 border-t border-border/50">
                  <Link href="/dashboard/analysis">
                    <a className="block group cursor-pointer">
                      <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-all">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Lightbulb className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Transformation Analysis</h4>
                          <p className="text-xs text-muted-foreground mt-1 leading-snug">
                            Get personalized insights and pattern recognition from your entries.
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
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
                              placeholder="Type your reflection here or use the microphone..." 
                              className="min-h-[120px] resize-none bg-background/50 focus:bg-background transition-all p-4 pr-12 text-base leading-relaxed"
                              value={answers[`${activeModule.id}-${index}`] || ''}
                              onChange={(e) => handleTextChange(index, e.target.value)}
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              className={`absolute right-2 top-2 transition-colors ${isRecording === index ? 'text-red-500 bg-red-50 hover:bg-red-100' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'}`}
                              onClick={() => toggleRecording(index)}
                              title={isRecording === index ? "Stop Recording" : "Start Recording"}
                            >
                              {isRecording === index ? (
                                <MicOff className="w-5 h-5 animate-pulse" />
                              ) : (
                                <Mic className="w-5 h-5" />
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-4 gap-4">
                      {activeModule.id === 9 && (
                        <Link href="/discover-purpose/summary">
                          <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5 gap-2">
                            <FileText className="w-4 h-4" />
                            Summary
                          </Button>
                        </Link>
                      )}
                      <Button size="lg" className="shadow-lg shadow-primary/20" onClick={handleSaveReflections}>
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