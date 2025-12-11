import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowLeft, Printer, Download, BookOpen, Quote, Lightbulb } from "lucide-react";
import { modules } from "@/lib/purpose-modules";
import { useEffect, useState } from "react";

export default function PurposeSummaryPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load answers from localStorage
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

  return (
    <div className="min-h-screen bg-background font-sans print:bg-white">
      <div className="print:hidden">
        <Navbar />
      </div>
      
      <main className="container mx-auto px-4 pt-24 pb-12 print:pt-8 print:max-w-none">
        <div className="max-w-4xl mx-auto mb-8 print:mb-4">
          <Link href="/discover-purpose">
            <Button variant="ghost" className="mb-6 gap-2 print:hidden hover:bg-transparent hover:text-primary p-0">
              <ArrowLeft className="w-4 h-4" />
              Back to Reflection
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 print:mb-6">
            <div>
              <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5 px-4 py-1 print:hidden">
                Your Journey
              </Badge>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                Purpose Reflection <span className="text-primary font-serif italic">Summary</span>
              </h1>
              <p className="text-muted-foreground mt-2 print:text-gray-600">
                A compilation of your insights, reflections, and discoveries.
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

        <div className="max-w-4xl mx-auto space-y-12 print:space-y-8">
          {modules.map((module) => {
            // Check if user has answered any question in this module
            const hasAnswers = module.questions.some((_, index) => {
                const key = `${module.id}-${index}`;
                return answers[key] && answers[key].trim().length > 0;
            });

            if (!hasAnswers) return null;

            return (
              <div key={module.id} className="break-inside-avoid">
                <div className="flex items-center gap-2 mb-4 border-b border-border pb-2 print:border-gray-300">
                   <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary print:bg-gray-100 print:text-black">
                     {module.id}
                   </div>
                   <h2 className="text-2xl font-heading font-bold">{module.title}</h2>
                </div>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm print:shadow-none print:border-none print:bg-transparent">
                  <CardContent className="p-6 print:p-0 space-y-6">
                     <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-primary/50 print:bg-gray-50 print:border-gray-300">
                        <div className="flex gap-2 text-muted-foreground italic text-sm mb-1 font-medium">
                            <Quote className="w-3 h-3" /> Module Statement
                        </div>
                        <p className="text-foreground/90 italic pl-5">"{module.statement}"</p>
                     </div>

                     <div className="space-y-6">
                        {module.questions.map((question, index) => {
                            const key = `${module.id}-${index}`;
                            const answer = answers[key];
                            
                            if (!answer || answer.trim().length === 0) return null;

                            return (
                                <div key={index} className="space-y-2">
                                    <h3 className="font-medium text-foreground text-lg">{question}</h3>
                                    <div className="bg-white p-4 rounded-md border border-border/60 text-muted-foreground whitespace-pre-wrap print:border-gray-200 print:text-black">
                                        {answer}
                                    </div>
                                </div>
                            );
                        })}
                     </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
          
          <div className="print:hidden mt-16 pt-8 border-t border-border">
            <Link href="/dashboard/analysis">
              <a className="block group cursor-pointer">
                <Card className="bg-primary/5 border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">
                  <CardContent className="p-6 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors">
                      <Lightbulb className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                        Ready for Transformation Analysis?
                      </h3>
                      <p className="text-muted-foreground mt-2">
                        Now that you've connected the dots, use our AI engine to get personalized insights and pattern recognition from your entries.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </Link>
          </div>

          {Object.keys(answers).length === 0 && (
             <div className="text-center py-12 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No reflections saved yet. Go back to the modules to start your journey.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}