import { useUser } from "@/hooks/use-user";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Crown, Briefcase, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [location, setLocation] = useLocation();
  const { user } = useUser();
  const [skillsChecked, setSkillsChecked] = useState<string[]>([]);
  const [otherSkillText, setOtherSkillText] = useState("");

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

  // Determine if we are on the tasks page or projects page (or general)
  const isTasksPage = location === "/dashboard/tasks";
  const isProjectsPage = location === "/dashboard/projects";

  const getPageTitle = () => {
    if (isTasksPage) return "Tasks to Goals";
    if (isProjectsPage) return "Milestones to Projects";    
    return `Welcome, ${user?.username || "User"}`;
  };

  const getPageSubtitle = () => {
    if (isTasksPage) return "Track your daily tasks and long-term goals.";
    if (isProjectsPage) return "Visualize your project timelines and key milestones.";
    return "Here's your daily overview and transformation progress.";
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <div className="flex-1 md:ml-64 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-8 overflow-y-auto">
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200 px-8"
              onClick={() => setLocation("/discover-purpose")}
            >
              Start here
            </Button>
          </div>

          {/* Welcome Section */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">{getPageTitle()}</h1>
                <p className="text-muted-foreground">{getPageSubtitle()}</p>
              </div>
              <div className="flex gap-3">
                {/* View Reports hidden for Phase 1 - uncomment when Analytics is implemented
                <Button variant="outline">View Reports</Button>
                */}
                <Button className="gap-2 cursor-pointer" onClick={() => setLocation("/dashboard/journal")}>
                  <Plus className="w-4 h-4" />
                  New Entry
                </Button>
              </div>
            </div>

            {/* Upgrade Banner - Only show for non-admin EXPLORER or TRANSFORMER users */}
            {user && !user.isAdmin && user.plan !== "IMPLEMENTER" && (
              <Card className="border-2 border-primary/50 bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Crown className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">
                          {user.plan === "TRANSFORMER" 
                            ? "Unlock Step 3 & Final Blueprint" 
                            : "Unlock All Features"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {user.plan === "TRANSFORMER"
                            ? "Upgrade to Implementer for complete transformation access"
                            : "Upgrade to Transformer or Implementer to unlock all modules and features"}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="default" 
                      className="gap-2 cursor-pointer"
                      onClick={() => window.location.href = '/pricing'}
                    >
                      <Crown className="w-4 h-4" />
                      Upgrade Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Skills & Tasks */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      Skills to Build
                    </CardTitle>
                    <CardDescription>Based on your Day 4 Analysis</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {skillsChecked.length > 0 ? (
                      skillsChecked.map(skill => (
                        <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-sm bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                          {skill === "Other" && otherSkillText ? otherSkillText : skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground italic text-sm">No skills selected yet. Go to Analyze Change &gt; Day 4 to identify skills.</p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <Button 
                      onClick={() => setLocation("/dashboard/future-path")} 
                      className="w-full gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md h-12 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      Generate Career Options & Suggestions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Quick Actions */}
            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-none">
                <CardHeader>
                  <CardTitle className="text-lg">Daily Inspiration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm italic text-muted-foreground mb-4">
                    "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work."
                  </p>
                  <Button size="sm" variant="outline" className="w-full bg-white/50 hover:bg-white cursor-pointer" onClick={() => setLocation("/discover-purpose")}>
                    Start Your Journey
                  </Button>
                </CardContent>
              </Card>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}