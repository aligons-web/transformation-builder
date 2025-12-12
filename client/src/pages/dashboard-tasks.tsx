import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, CheckSquare, Target, Plus, TrendingUp, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type EventType = "task" | "goal";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: EventType;
}

export default function DashboardTasksPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock data for Tasks & Goals
  const [events] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Complete Module 3",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      type: "task"
    },
    {
      id: "2",
      title: "Career Pivot Goal",
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      type: "goal"
    },
    {
      id: "3",
      title: "Weekly Review",
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      type: "task"
    },
    {
      id: "4",
      title: "Update Resume",
      date: new Date(),
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
    return events.filter(event => isSameDay(event.date, day));
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto md:ml-64 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">Tasks to Goals</h1>
              <p className="text-muted-foreground mt-2">Track your daily tasks and long-term goals.</p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Task
            </Button>
          </div>

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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Task & Goal Calendar</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={prevMonth}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm font-medium w-32 text-center">
                      {format(currentDate, "MMMM yyyy")}
                    </span>
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={nextMonth}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-px bg-muted/20 rounded-lg overflow-hidden border border-border/50">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="bg-muted/50 p-2 text-center text-xs font-medium text-muted-foreground">
                        {day}
                      </div>
                    ))}
                    {calendarDays.map((day, dayIdx) => {
                      const dayEvents = getEventsForDay(day);
                      const isToday = isSameDay(day, new Date());
                      const isCurrentMonth = isSameMonth(day, currentDate);
                      
                      return (
                        <div 
                          key={day.toString()} 
                          className={cn(
                            "min-h-[100px] bg-card p-1 transition-colors hover:bg-accent/5",
                            !isCurrentMonth && "bg-muted/10 text-muted-foreground",
                            isToday && "bg-primary/5"
                          )}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={cn(
                              "text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full",
                              isToday ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                            )}>
                              {format(day, "d")}
                            </span>
                          </div>
                          <div className="space-y-1">
                            {dayEvents.map((event) => (
                              <div 
                                key={event.id}
                                className={cn(
                                  "text-[10px] p-1.5 rounded border truncate cursor-pointer transition-all hover:scale-[1.02]",
                                  event.type === "task" && "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
                                  event.type === "goal" && "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
                                )}
                                title={event.title}
                              >
                                <div className="flex items-center gap-1.5">
                                  {event.type === "task" && <CheckSquare className="w-3 h-3 shrink-0" />}
                                  {event.type === "goal" && <Target className="w-3 h-3 shrink-0" />}
                                  <span className="truncate font-medium">{event.title}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-4 mt-4 text-xs text-muted-foreground justify-end">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>Tasks</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <span>Goals</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
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
          </div>
        </div>
      </main>
    </div>
  );
}