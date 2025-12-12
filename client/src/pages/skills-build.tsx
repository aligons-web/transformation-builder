import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { Briefcase, Sparkles, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SkillsBuildPage() {
  const [skillsChecked, setSkillsChecked] = useState<string[]>([]);
  const [otherSkillText, setOtherSkillText] = useState("");
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const savedSkills = localStorage.getItem("analysis-skills");
    if (savedSkills) {
      try {
        setSkillsChecked(JSON.parse(savedSkills));
      } catch (e) {
        console.error("Failed to parse skills", e);
      }
    }
    
    const savedOther = localStorage.getItem("analysis-skill-other");
    if (savedOther) {
      try {
        setOtherSkillText(JSON.parse(savedOther));
      } catch (e) {
        console.error("Failed to parse other skill", e);
      }
    }
  }, []);

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto md:ml-64 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-primary" />
              Skills to Build
            </h1>
            <p className="text-muted-foreground mt-2">
              Identify and develop the key skills needed for your transformation journey.
            </p>
          </div>

          <Card className="border-l-4 border-l-primary shadow-sm bg-blue-50/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="w-5 h-5 text-primary" />
                Overview & Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                This section focuses on bridging the gap between where you are and where you want to be. 
                Based on your reflections in the "Analyze Change" phase (specifically Day 4), we track the 
                skills you've identified as critical for your next chapter.
              </p>
              <p>
                <strong className="text-foreground">How it works:</strong> Once you have completed the previous analysis parts 
                and identified your core skills, this page will unlock AI-driven suggestions for potential 
                career paths, volunteer opportunities, or new vocations that align with your unique profile.
              </p>
              <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg border border-border/50">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Complete the "Analyze Change" module to populate this list.</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Identified Skills</CardTitle>
              <CardDescription>Skills you selected to focus on during your transformation analysis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {skillsChecked.length > 0 ? (
                  skillsChecked.map(skill => (
                    <Badge key={skill} variant="secondary" className="px-4 py-2 text-base bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                      {skill === "Other" && otherSkillText ? otherSkillText : skill}
                    </Badge>
                  ))
                ) : (
                  <div className="text-center py-8 w-full">
                    <p className="text-muted-foreground italic mb-4">No skills identified yet.</p>
                    <Link href="/dashboard/analysis">
                      <Button variant="outline" className="gap-2">
                        Go to Change Analysis
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
              
              {skillsChecked.length > 0 && (
                <div className="pt-6 border-t border-border/50 mt-4">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 text-center space-y-4">
                    <h3 className="font-semibold text-lg text-indigo-900">Ready to explore possibilities?</h3>
                    <p className="text-indigo-700/80 max-w-lg mx-auto">
                      Based on these skills, our AI can now suggest concrete future paths tailored to you.
                    </p>
                    <Button 
                      onClick={() => setLocation("/dashboard/future-path")} 
                      size="lg"
                      className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md transition-all hover:scale-105"
                    >
                      <Sparkles className="w-4 h-4" />
                      Generate Career Options & Suggestions
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}