import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Target, CheckSquare, Flag, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type EventType = "goal" | "task" | "milestone" | "project";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: EventType;
  description: string;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Complete Module 2",
      date: new Date(),
      type: "task",
      description: "Finish the capacity assessment"
    },
    {
      id: "2",
      title: "Career Transition",
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      type: "goal",
      description: "Define the new career path"
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    type: "task",
    date: new Date()
  });
  const { toast } = useToast();

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

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date) return;

    const event: CalendarEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: newEvent.title,
      date: new Date(newEvent.date),
      type: newEvent.type as EventType,
      description: newEvent.description || ""
    };

    setEvents([...events, event]);
    setIsDialogOpen(false);
    setNewEvent({ type: "task", date: new Date() });
    
    toast({
      title: "Entry Added",
      description: `Successfully added ${event.type}: ${event.title}`,
    });
  };

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
              <h1 className="text-3xl font-heading font-bold text-foreground">Calendar</h1>
              <p className="text-muted-foreground mt-2">Track your goals and tasks timeline</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4" />
                  New Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Calendar Entry</DialogTitle>
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
                        <SelectItem value="task">
                          <div className="flex items-center gap-2">
                            <CheckSquare className="w-4 h-4 text-blue-500" />
                            <span>Task</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="goal">
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-orange-500" />
                            <span>Goal</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="milestone">
                          <div className="flex items-center gap-2">
                            <Flag className="w-4 h-4 text-purple-500" />
                            <span>Milestone</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="project">
                          <div className="flex items-center gap-2">
                            <Folder className="w-4 h-4 text-green-500" />
                            <span>Project</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g., Complete Research Phase" 
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
                  
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Add details..."
                      value={newEvent.description || ""}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateEvent} disabled={!newEvent.title || !newEvent.date}>Save Entry</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="border-border/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-medium">
                {format(currentDate, "MMMM yyyy")}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-px bg-muted/20 rounded-lg overflow-hidden border border-border/50">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="bg-muted/50 p-2 text-center text-sm font-medium text-muted-foreground">
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
                        "min-h-[120px] bg-card p-2 transition-colors hover:bg-accent/5",
                        !isCurrentMonth && "bg-muted/10 text-muted-foreground",
                        isToday && "bg-primary/5"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={cn(
                          "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full",
                          isToday ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                        )}>
                          {format(day, "d")}
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {dayEvents.map((event) => (
                          <div 
                            key={event.id}
                            className={cn(
                              "text-xs p-1.5 rounded-md border truncate cursor-pointer transition-all hover:scale-[1.02]",
                              event.type === "goal" && "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
                              event.type === "task" && "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
                              event.type === "milestone" && "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
                              event.type === "project" && "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                            )}
                            title={event.title}
                          >
                            <div className="flex items-center gap-1.5">
                              {event.type === "goal" && <Target className="w-3 h-3 shrink-0" />}
                              {event.type === "task" && <CheckSquare className="w-3 h-3 shrink-0" />}
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
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}