import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Plus, TrendingUp, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <div className="flex-1 md:ml-64 flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-6 space-y-8 overflow-y-auto">
          
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">Good Morning, John</h1>
              <p className="text-muted-foreground">Here's your daily overview and transformation progress.</p>
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
            
            {/* Left Column: Content Calendar & Tasks */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Content Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] rounded-xl border border-dashed border-muted-foreground/20 flex items-center justify-center text-muted-foreground bg-muted/10">
                    Calendar Component Placeholder (FullCalendar or similar)
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

            {/* Right Column: Calendar Widget & Quick Actions */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-4 flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow-none w-full"
                  />
                </CardContent>
              </Card>

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