import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Flag, Folder, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type EventType = "milestone" | "project";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: EventType;
  completed?: boolean;
}

export default function DashboardProjectsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Start with empty state - users add their own projects and milestones
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    type: "project",
    date: new Date()
  });

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

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date) return;

    const event: CalendarEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: newEvent.title,
      date: new Date(newEvent.date),
      type: newEvent.type as EventType,
      completed: false
    };

    setEvents([...events, event]);
    setIsDialogOpen(false);
    setNewEvent({ type: "project", date: new Date() });

    toast({
      title: "Entry Added",
      description: `Successfully added ${event.type}: ${event.title}`,
    });
  };

  const toggleEventComplete = (eventId: string) => {
    setEvents(events.map(e => 
      e.id === eventId ? { ...e, completed: !e.completed } : e
    ));
  };

  // Calculate real stats
  const totalProjects = events.filter(e => e.type === "project").length;
  const completedProjects = events.filter(e => e.type === "project" && e.completed).length;
  const totalMilestones = events.filter(e => e.type === "milestone").length;
  const completedMilestones = events.filter(e => e.type === "milestone" && e.completed).length;

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

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 cursor-pointer">
                  <Plus className="w-4 h-4" />
                  New Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Project or Milestone</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Entry Type</Label>
                    <Select 
                      value={newEvent.type} 
                      onValueChange={(value) => setNewEvent({...newEvent, type: value as EventType})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="project">
                          <div className="flex items-center gap-2">
                            <Folder className="w-4 h-4 text-green-500" />
                            <span>Project</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="milestone">
                          <div className="flex items-center gap-2">
                            <Flag className="w-4 h-4 text-purple-500" />
                            <span>Milestone</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g., Q1 Launch" 
                      value={newEvent.title || ""}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      value={newEvent.date ? format(newEvent.date, "yyyy-MM-dd") : ""}
                      onChange={(e) => setNewEvent({...newEvent, date: new Date(e.target.value)})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="cursor-pointer">Cancel</Button>
                  <Button onClick={handleCreateEvent} disabled={!newEvent.title || !newEvent.date} className="cursor-pointer">Save Entry</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Projects
                </CardTitle>
                <Folder className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalProjects > 0 ? `${completedProjects}/${totalProjects}` : "No projects yet"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalProjects > 0 
                    ? `${Math.round((completedProjects / totalProjects) * 100)}% completed`
                    : "Add your first project"
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Milestones
                </CardTitle>
                <Flag className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalMilestones > 0 ? `${completedMilestones}/${totalMilestones}` : "No milestones yet"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalMilestones > 0 
                    ? `${Math.round((completedMilestones / totalMilestones) * 100)}% reached`
                    : "Set your first milestone"
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Entries
                </CardTitle>
                <Plus className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{events.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Projects & milestones
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Project Calendar</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-7 w-7 cursor-pointer" onClick={prevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium w-32 text-center">
                  {format(currentDate, "MMMM yyyy")}
                </span>
                <Button variant="outline" size="icon" className="h-7 w-7 cursor-pointer" onClick={nextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {events.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-border/50 rounded-lg">
                  <Folder className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No projects or milestones yet</h3>
                  <p className="text-muted-foreground text-sm mb-4">Start planning your transformation journey</p>
                  <Button onClick={() => setIsDialogOpen(true)} className="cursor-pointer">
                    <Plus className="w-4 h-4 mr-2" />
                    Add your first entry
                  </Button>
                </div>
              ) : (
                <>
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
                                onClick={() => toggleEventComplete(event.id)}
                                className={cn(
                                  "text-[10px] p-1.5 rounded border truncate cursor-pointer transition-all hover:scale-[1.02]",
                                  event.type === "milestone" && !event.completed && "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
                                  event.type === "milestone" && event.completed && "bg-purple-50/50 text-purple-400 border-purple-100 line-through",
                                  event.type === "project" && !event.completed && "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
                                  event.type === "project" && event.completed && "bg-green-50/50 text-green-400 border-green-100 line-through"
                                )}
                                title={`${event.title} (click to toggle complete)`}
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
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}