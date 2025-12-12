import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Flag, Folder, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type EventType = "milestone" | "project";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: EventType;
}

export default function DashboardProjectsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock data for Projects & Milestones
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
      title: "Beta Testing Phase",
      date: new Date(new Date().setDate(new Date().getDate() + 15)),
      type: "milestone"
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
              <h1 className="text-3xl font-heading font-bold text-foreground">Milestones to Projects</h1>
              <p className="text-muted-foreground mt-2">Visualize your project timelines and key milestones.</p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>

          <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Project Calendar</CardTitle>
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
                              event.type === "milestone" && "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
                              event.type === "project" && "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                            )}
                            title={event.title}
                          >
                            <div className="flex items-center gap-1.5">
                              {event.type === "milestone" && <Flag className="w-3 h-3 shrink-0" />}
                              {event.type === "project" && <Folder className="w-3 h-3 shrink-0" />}
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
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>Milestones</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Projects</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}