import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Moon, 
  Sun, 
  Zap, 
  Heart, 
  Save, 
  PenLine 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const journalPrompts = [
  {
    id: 1,
    category: "Daily Solitude",
    icon: Moon,
    color: "text-indigo-500",
    question: "Reflecting on your day, describe a moment of solitude where you felt truly at peace. What were you doing, and what thoughts came to mind?"
  },
  {
    id: 2,
    category: "Weekly Resonation",
    icon: Heart,
    color: "text-rose-500",
    question: "Looking back at this week, which activity resonated most deeply with your sense of purpose? Why did it stand out?"
  },
  {
    id: 3,
    category: "Monthly Inspiration",
    icon: Zap,
    color: "text-yellow-500",
    question: "Over the past month, who or what has been your biggest source of inspiration for your life transformation? How has it influenced you?"
  },
  {
    id: 4,
    category: "Hourly Awareness",
    icon: Clock,
    color: "text-blue-500",
    question: "In the last hour, what thought or feeling has been occupying your mind? Is it serving your growth or holding you back?"
  },
  {
    id: 5,
    category: "Daily Connection",
    icon: Sun,
    color: "text-orange-500",
    question: "What was the most meaningful interaction you had today? How did it contribute to your journey or someone else's?"
  },
  {
    id: 6,
    category: "Weekly Solitude",
    icon: Calendar,
    color: "text-purple-500",
    question: "During your quiet moments this week, what recurring idea or dream kept surfacing? What might it be trying to tell you?"
  },
  {
    id: 7,
    category: "Free Journaling",
    icon: PenLine,
    color: "text-green-500",
    question: "Free Journaling: Write whatever is on your mind. No prompts, no rules—just your thoughts flowing freely."
  }
];

export default function JournalPage() {
  const [entries, setEntries] = useState<Record<number, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    const savedEntries = localStorage.getItem("journal-entries");
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries));
      } catch (e) {
        console.error("Failed to parse journal entries", e);
      }
    }
  }, []);

  const handleEntryChange = (id: number, value: string) => {
    setEntries(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem("journal-entries", JSON.stringify(entries));
    toast({
      title: "Journal Saved",
      description: "Your thoughts have been securely captured.",
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto md:ml-64 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-primary" />
                Transformation Journal
              </h1>
              <p className="text-muted-foreground mt-2">
                Capture moments of solitude, resonance, and inspiration to fuel your journey.
              </p>
            </div>
            <Button onClick={handleSave} className="gap-2 shadow-md">
              <Save className="w-4 h-4" />
              Save Entries
            </Button>
          </div>

          <div className="grid gap-8">
            {journalPrompts.map((prompt) => (
              <Card key={prompt.id} className="border-l-4 hover:shadow-md transition-shadow duration-200" style={{ borderLeftColor: prompt.id === 7 ? '#22c55e' : undefined }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1 bg-background/50 backdrop-blur-sm">
                      <prompt.icon className={`w-3.5 h-3.5 ${prompt.color}`} />
                      <span className="text-xs font-medium text-foreground/80">{prompt.category}</span>
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-medium leading-relaxed">
                    {prompt.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="Reflect here..." 
                    className="min-h-[120px] resize-y bg-muted/20 focus:bg-background transition-colors text-base p-4 border-muted-foreground/20 focus:border-primary/50"
                    value={entries[prompt.id] || ""}
                    onChange={(e) => handleEntryChange(prompt.id, e.target.value)}
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center pt-8 pb-12">
            <Button size="lg" onClick={handleSave} className="px-8 shadow-lg bg-primary hover:bg-primary/90">
              Save All Reflections
            </Button>
          </div>

        </div>
      </main>
    </div>
  );
}