import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { 
  CheckCircle2, 
  Target, 
  Flag, 
  FolderCheck, 
  Clock, 
  FileText, 
  BrainCircuit,
  TrendingUp,
  Calendar
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock Data
const sessionDataDaily = [
  { name: "Mon", minutes: 45 },
  { name: "Tue", minutes: 30 },
  { name: "Wed", minutes: 60 },
  { name: "Thu", minutes: 25 },
  { name: "Fri", minutes: 50 },
  { name: "Sat", minutes: 90 },
  { name: "Sun", minutes: 40 },
];

const sessionDataWeekly = [
  { name: "Week 1", minutes: 320 },
  { name: "Week 2", minutes: 280 },
  { name: "Week 3", minutes: 450 },
  { name: "Week 4", minutes: 390 },
];

const sessionDataMonthly = [
  { name: "Jan", minutes: 1200 },
  { name: "Feb", minutes: 1450 },
  { name: "Mar", minutes: 1100 },
  { name: "Apr", minutes: 1600 },
  { name: "May", minutes: 1350 },
  { name: "Jun", minutes: 1500 },
];

const engagementData = [
  { name: "Reflections", value: 15, unit: "mins/mod" },
  { name: "Quizzes", value: 5, unit: "mins/quiz" },
  { name: "Text Entry", value: 250, unit: "words/entry" },
];

const progressData = [
  { name: "Completed", value: 75 },
  { name: "Remaining", value: 25 },
];

const COLORS = ["#8b5cf6", "#e2e8f0"]; // Primary Purple and Slate-200

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("daily");

  const getSessionData = () => {
    switch (timeRange) {
      case "weekly": return sessionDataWeekly;
      case "monthly": return sessionDataMonthly;
      default: return sessionDataDaily;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto md:ml-64 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">Analytics & Progress</h1>
              <p className="text-muted-foreground mt-2">Track your transformation journey and engagement metrics.</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border/50">
              <Calendar className="w-4 h-4" />
              <span>Last updated: Just now</span>
            </div>
          </div>

          {/* Key Progress Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-sm border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                  Tasks Completed
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 / 15</div>
                <Progress value={80} className="h-2 mt-3 bg-blue-100" indicatorClassName="bg-blue-500" />
                <p className="text-xs text-muted-foreground mt-2">80% Completion Rate</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-l-4 border-l-orange-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                  Goals Achieved
                  <Target className="w-4 h-4 text-orange-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3 / 5</div>
                <Progress value={60} className="h-2 mt-3 bg-orange-100" indicatorClassName="bg-orange-500" />
                <p className="text-xs text-muted-foreground mt-2">60% Success Rate</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                  Milestones Reached
                  <Flag className="w-4 h-4 text-purple-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2 / 8</div>
                <Progress value={25} className="h-2 mt-3 bg-purple-100" indicatorClassName="bg-purple-500" />
                <p className="text-xs text-muted-foreground mt-2">25% Journey Progress</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                  Projects Completed
                  <FolderCheck className="w-4 h-4 text-green-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1 / 3</div>
                <Progress value={33} className="h-2 mt-3 bg-green-100" indicatorClassName="bg-green-500" />
                <p className="text-xs text-muted-foreground mt-2">33% Execution Rate</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Session Time Chart */}
            <Card className="lg:col-span-2 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Time Spent on Platform</CardTitle>
                    <CardDescription>Track your daily, weekly, and monthly engagement.</CardDescription>
                  </div>
                  <Tabs defaultValue="daily" value={timeRange} onValueChange={setTimeRange}>
                    <TabsList>
                      <TabsTrigger value="daily">Daily</TabsTrigger>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getSessionData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 12 }} 
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                      />
                      <Tooltip 
                        cursor={{ fill: '#f1f5f9' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar 
                        dataKey="minutes" 
                        fill="#8b5cf6" 
                        radius={[4, 4, 0, 0]} 
                        barSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Engagement Stats */}
            <div className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Engagement Breakdown</CardTitle>
                  <CardDescription>Average metrics per activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-blue-50/50 hover:bg-blue-50 transition-colors">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Reflection Time</p>
                      <h4 className="text-xl font-bold text-foreground">15 min <span className="text-xs font-normal text-muted-foreground">/ module</span></h4>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 rounded-lg bg-purple-50/50 hover:bg-purple-50 transition-colors">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                      <BrainCircuit className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Quiz Duration</p>
                      <h4 className="text-xl font-bold text-foreground">5 min <span className="text-xs font-normal text-muted-foreground">/ quiz</span></h4>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Text Entry Volume</p>
                      <h4 className="text-xl font-bold text-foreground">250 words <span className="text-xs font-normal text-muted-foreground">/ response</span></h4>
                    </div>
                  </div>

                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Insight
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground/90 leading-relaxed">
                    You're most active on <span className="font-bold">Wednesdays</span>. Your reflection depth has increased by <span className="font-bold">20%</span> this week compared to last week. Keep up the momentum!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}