import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, CheckCircle2, Clock, ChevronLeft, ChevronRight, Flag, Folder, CheckSquare, Target, Sparkles, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";

type EventType = "milestone" | "project" | "task" | "goal";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: EventType;
}

export default function DashboardPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [location, setLocation] = useLocation();
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

  // Mock data - In a real app this would come from a store or API
  const [events] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Project Alpha Launch",
      date: new Date(),
      type: "project"
    },
    {
      id: "2",
      title: "Q1 Milestone",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      type: "milestone"
    },
    {
      id: "3",
      title: "Website Redesign",
      date: new Date(new Date().setDate(new Date().getDate() + 10)),
      type: "project"
    },
    {
      id: "4",
      title: "Complete Module 3",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      type: "task"
    },
    {
      id: "5",
      title: "Career Pivot Goal",
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      type: "goal"
    },
    {
      id: "6",
      title: "Weekly Review",
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      type: "task"
    }
  ]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      const isSameDate = isSameDay(event.date, day);
      if (!isSameDate) return false;
      
      if (isTasksPage) {
        return event.type === "task" || event.type === "goal";
      }
      if (isProjectsPage) {
        return event.type === "milestone" || event.type === "project";
      }
      // Default dashboard shows all or a subset? Let's show all for now or stick to projects/milestones as that seems to be the "main" view requested previously
      return true; 
    });
  };

  const getPageTitle = () => {
    if (isTasksPage) return "Tasks to Goals";
    if (isProjectsPage) return "Milestones to Projects";
    return "Good Morning, John";
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
          
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">{getPageTitle()}</h1>
              <p className="text-muted-foreground">{getPageSubtitle()}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">View Reports</Button>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Entry
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Focus Score", value: "85%", icon: TrendingUp, color: "text-green-500", trend: "+5% from last week" },
              { label: "Tasks Completed", value: "12/15", icon: CheckCircle2, color: "text-blue-500", trend: "On track" },
              { label: "Journal Streak", value: "7 Days", icon: Clock, color: "text-orange-500", trend: "Keep it up!" },
            ].map((stat, i) => (
              <Card key={i} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.trend}
                  </p>
                </CardContent>
              </Card>
            ))}
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
                      className="w-full gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md h-12"
                    >
                      <Sparkles className="w-4 h-4" />
                      Generate Career Options & Suggestions
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50 cursor-pointer">
                        <div className="w-5 h-5 rounded-full border-2 border-primary/30" />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">Complete Weekly Reflection</h4>
                          <p className="text-xs text-muted-foreground">Due Today at 5:00 PM</p>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">High Priority</span>
                      </div>
                    ))}
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
                  <Button size="sm" variant="outline" className="w-full bg-white/50 hover:bg-white">
                    Read More
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