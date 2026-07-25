import { useState, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
  isWithinInterval,
  addDays,
} from "date-fns";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Target,
  Plus,
  TrendingUp,
  CheckCircle2,
  Repeat,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Flame,
  Circle,
  ArrowUpCircle,
  ArrowRightCircle,
  ArrowDownCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  completed: boolean;
  createdAt: Date;
}

type Priority = "high" | "medium" | "low";

interface Task {
  id: string;
  goalId: string | null; // null = standalone task
  title: string;
  date: Date; // start date (or single date for one-time)
  completed: boolean;
  priority: Priority;
  // Recurrence
  isRecurring: boolean;
  recurrenceType: "daily" | "weekly" | null;
  recurrenceDays: number[]; // 0=Sun … 6=Sat (used when recurrenceType=weekly)
  // For recurring tasks, track which dates were completed
  completedDates: string[]; // "yyyy-MM-dd" strings
  createdAt: Date;
}

interface WeeklyReflection {
  id: string;
  weekStart: string; // "yyyy-MM-dd"
  accomplished: string;
  obstacles: string;
  nextWeekFocus: string;
  createdAt: Date;
}

// A rendered calendar instance (could be from a one-time or recurring task)
interface CalendarInstance {
  task: Task;
  date: Date;
  isCompleted: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function genId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function dateKey(d: Date): string {
  return format(d, "yyyy-MM-dd");
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; icon: typeof ArrowUpCircle; color: string }
> = {
  high: { label: "High", icon: ArrowUpCircle, color: "text-red-500" },
  medium: { label: "Medium", icon: ArrowRightCircle, color: "text-amber-500" },
  low: { label: "Low", icon: ArrowDownCircle, color: "text-slate-400" },
};

/**
 * Generate all calendar instances for tasks within a date range.
 * One-time tasks produce a single instance on their date.
 * Recurring tasks produce instances on every matching day in the range.
 */
function generateInstances(
  tasks: Task[],
  rangeStart: Date,
  rangeEnd: Date
): CalendarInstance[] {
  const instances: CalendarInstance[] = [];
  const allDays = eachDayOfInterval({ start: rangeStart, end: rangeEnd });

  for (const task of tasks) {
    if (!task.isRecurring) {
      // One-time task – show on its date if within range
      if (
        isWithinInterval(task.date, { start: rangeStart, end: rangeEnd }) ||
        isSameDay(task.date, rangeStart) ||
        isSameDay(task.date, rangeEnd)
      ) {
        instances.push({
          task,
          date: task.date,
          isCompleted: task.completed,
        });
      }
    } else {
      // Recurring – generate on matching days from the task start date onward
      for (const day of allDays) {
        if (day < task.date) continue; // don't show before the commitment started

        let matches = false;
        if (task.recurrenceType === "daily") {
          matches = true;
        } else if (task.recurrenceType === "weekly") {
          matches = task.recurrenceDays.includes(getDay(day));
        }

        if (matches) {
          instances.push({
            task,
            date: day,
            isCompleted: task.completedDates.includes(dateKey(day)),
          });
        }
      }
    }
  }

  return instances;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DashboardTasksPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isReflectionOpen, setIsReflectionOpen] = useState(false);
  const [expandedGoals, setExpandedGoals] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // --- Data state ---
  const [goals, setGoals] = useLocalStorage<Goal[]>("tb-tasks-goals", []);
  const [tasks, setTasks] = useLocalStorage<Task[]>("tb-tasks-tasks", []);
  const [reflections, setReflections] = useLocalStorage<WeeklyReflection[]>("tb-tasks-reflections", []);
  

  // --- Create-dialog state ---
  type CreateMode = "task" | "goal";
  const [createMode, setCreateMode] = useState<CreateMode>("task");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDate, setFormDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [formGoalId, setFormGoalId] = useState<string>("none");
  const [formPriority, setFormPriority] = useState<Priority>("medium");
  const [formIsRecurring, setFormIsRecurring] = useState(false);
  const [formRecurrenceType, setFormRecurrenceType] = useState<
    "daily" | "weekly"
  >("weekly");
  const [formRecurrenceDays, setFormRecurrenceDays] = useState<number[]>([]);

  // --- Reflection-dialog state ---
  const [refAccomplished, setRefAccomplished] = useState("");
  const [refObstacles, setRefObstacles] = useState("");
  const [refNextFocus, setRefNextFocus] = useState("");

  // --- Calendar math ---
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calStart, end: calEnd });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // --- Calendar instances ---
  const instances = useMemo(
    () => generateInstances(tasks, calStart, calEnd),
    [tasks, calStart, calEnd]
  );

  const getInstancesForDay = (day: Date) =>
    instances.filter((inst) => isSameDay(inst.date, day));

  // --- Stats ---
  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.completed).length;

  const thisWeekStart = startOfWeek(new Date());
  const thisWeekEnd = endOfWeek(new Date());
  const thisWeekInstances = generateInstances(tasks, thisWeekStart, thisWeekEnd);
  const thisWeekCompleted = thisWeekInstances.filter((i) => i.isCompleted).length;
  const thisWeekTotal = thisWeekInstances.length;
  const inputConsistency =
    thisWeekTotal > 0 ? Math.round((thisWeekCompleted / thisWeekTotal) * 100) : 0;

  // Goal progress: % of linked tasks completed (one-time) or overall recurring completion
  function goalProgress(goalId: string): number {
    const linked = tasks.filter((t) => t.goalId === goalId);
    if (linked.length === 0) return 0;

    let done = 0;
    let total = 0;
    for (const t of linked) {
      if (!t.isRecurring) {
        total += 1;
        if (t.completed) done += 1;
      } else {
        // Count recurring instances from creation to now
        const end = new Date();
        const insts = generateInstances([t], t.date, end);
        total += insts.length;
        done += insts.filter((i) => i.isCompleted).length;
      }
    }
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }

  // Current streak: consecutive days with all scheduled instances completed
  const streak = useMemo(() => {
    let count = 0;
    let day = new Date();
    // Start from yesterday if today isn't over yet
    day = addDays(day, -1);
    for (let i = 0; i < 365; i++) {
      const dayInsts = generateInstances(tasks, day, day);
      if (dayInsts.length === 0) {
        day = addDays(day, -1);
        continue; // skip days with nothing scheduled
      }
      if (dayInsts.every((inst) => inst.isCompleted)) {
        count++;
        day = addDays(day, -1);
      } else {
        break;
      }
    }
    return count;
  }, [tasks]);

  // --- Handlers ---

  function resetCreateForm() {
    setFormTitle("");
    setFormDescription("");
    setFormDate(format(new Date(), "yyyy-MM-dd"));
    setFormGoalId("none");
    setFormPriority("medium");
    setFormIsRecurring(false);
    setFormRecurrenceType("weekly");
    setFormRecurrenceDays([]);
    setCreateMode("task");
  }

  function handleCreate() {
    if (!formTitle.trim() || !formDate) return;

    if (createMode === "goal") {
      const goal: Goal = {
        id: genId(),
        title: formTitle.trim(),
        description: formDescription.trim(),
        targetDate: new Date(formDate),
        completed: false,
        createdAt: new Date(),
      };
      setGoals((prev) => [...prev, goal]);
      toast({
        title: "Goal Created",
        description: `"${goal.title}" added with target date ${format(goal.targetDate, "MMM d, yyyy")}`,
      });
    } else {
      const task: Task = {
        id: genId(),
        goalId: formGoalId === "none" ? null : formGoalId,
        title: formTitle.trim(),
        date: new Date(formDate),
        completed: false,
        priority: formPriority,
        isRecurring: formIsRecurring,
        recurrenceType: formIsRecurring ? formRecurrenceType : null,
        recurrenceDays: formIsRecurring ? formRecurrenceDays : [],
        completedDates: [],
        createdAt: new Date(),
      };
      setTasks((prev) => [...prev, task]);

      const goalName =
        task.goalId ? goals.find((g) => g.id === task.goalId)?.title : null;
      toast({
        title: task.isRecurring ? "Input Commitment Created" : "Task Added",
        description: goalName
          ? `"${task.title}" linked to "${goalName}"`
          : `"${task.title}" added`,
      });
    }

    setIsCreateOpen(false);
    resetCreateForm();
  }

  function toggleInstance(task: Task, date: Date) {
    const key = dateKey(date);

    if (!task.isRecurring) {
      // One-time task – toggle completed
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, completed: !t.completed } : t
        )
      );
    } else {
      // Recurring – toggle this date in completedDates
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id !== task.id) return t;
          const has = t.completedDates.includes(key);
          return {
            ...t,
            completedDates: has
              ? t.completedDates.filter((d) => d !== key)
              : [...t.completedDates, key],
          };
        })
      );
    }
  }

  function toggleGoalComplete(goalId: string) {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId ? { ...g, completed: !g.completed } : g
      )
    );
  }

  function toggleGoalExpand(goalId: string) {
    setExpandedGoals((prev) => {
      const next = new Set(prev);
      if (next.has(goalId)) next.delete(goalId);
      else next.add(goalId);
      return next;
    });
  }

  function toggleRecurrenceDay(day: number) {
    setFormRecurrenceDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort()
    );
  }

  function handleSaveReflection() {
    if (!refAccomplished.trim() && !refObstacles.trim() && !refNextFocus.trim())
      return;

    const reflection: WeeklyReflection = {
      id: genId(),
      weekStart: dateKey(thisWeekStart),
      accomplished: refAccomplished.trim(),
      obstacles: refObstacles.trim(),
      nextWeekFocus: refNextFocus.trim(),
      createdAt: new Date(),
    };
    setReflections((prev) => [...prev, reflection]);
    setRefAccomplished("");
    setRefObstacles("");
    setRefNextFocus("");
    setIsReflectionOpen(false);
    toast({
      title: "Reflection Saved",
      description: `Week of ${format(thisWeekStart, "MMM d")} recorded`,
    });
  }

  // --- Derived data for the sidebar panel ---
  const standaloneTasks = tasks.filter((t) => !t.goalId && !t.isRecurring);
  const recurringTasks = tasks.filter((t) => t.isRecurring);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto md:ml-64 p-8">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* ---- Header ---- */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Tasks to Goals
              </h1>
              <p className="text-muted-foreground mt-1">
                Link daily actions to the outcomes they serve.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Weekly Reflection */}
              <Dialog open={isReflectionOpen} onOpenChange={setIsReflectionOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 cursor-pointer">
                    <ClipboardList className="w-4 h-4" />
                    <span className="hidden sm:inline">Weekly Reflection</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>
                      Weekly Reflection — {format(thisWeekStart, "MMM d")} to{" "}
                      {format(thisWeekEnd, "MMM d")}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label>What did you accomplish this week?</Label>
                      <Textarea
                        placeholder="Tasks completed, progress made, wins…"
                        value={refAccomplished}
                        onChange={(e) => setRefAccomplished(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>What got in the way?</Label>
                      <Textarea
                        placeholder="Scheduling conflicts, energy, distractions, unclear next steps…"
                        value={refObstacles}
                        onChange={(e) => setRefObstacles(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>What will you focus on next week?</Label>
                      <Textarea
                        placeholder="Top priorities, adjustments to your plan…"
                        value={refNextFocus}
                        onChange={(e) => setRefNextFocus(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsReflectionOpen(false)}
                      className="cursor-pointer"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSaveReflection} className="cursor-pointer">
                      Save Reflection
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Create Entry */}
              <Dialog
                open={isCreateOpen}
                onOpenChange={(open) => {
                  setIsCreateOpen(open);
                  if (!open) resetCreateForm();
                }}
              >
                <DialogTrigger asChild>
                  <Button className="gap-2 cursor-pointer">
                    <Plus className="w-4 h-4" />
                    New Entry
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[480px]">
                  <DialogHeader>
                    <DialogTitle>
                      {createMode === "goal" ? "Create a Goal" : "Create a Task"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">

                    {/* Mode selector */}
                    <div className="grid gap-2">
                      <Label>What are you adding?</Label>
                      <Select
                        value={createMode}
                        onValueChange={(v) => setCreateMode(v as CreateMode)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="goal">
                            <div className="flex items-center gap-2">
                              <Target className="w-4 h-4 text-orange-500" />
                              <span>Goal — an outcome you're working toward</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="task">
                            <div className="flex items-center gap-2">
                              <CheckSquare className="w-4 h-4 text-blue-500" />
                              <span>Task — an action that moves you forward</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Title */}
                    <div className="grid gap-2">
                      <Label htmlFor="create-title">Title</Label>
                      <Input
                        id="create-title"
                        placeholder={
                          createMode === "goal"
                            ? "e.g., Launch online course"
                            : "e.g., Write chapter outline"
                        }
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                      />
                    </div>

                    {/* Description (goals only) */}
                    {createMode === "goal" && (
                      <div className="grid gap-2">
                        <Label htmlFor="create-desc">
                          Description{" "}
                          <span className="text-muted-foreground font-normal">
                            (optional)
                          </span>
                        </Label>
                        <Textarea
                          id="create-desc"
                          placeholder="What does success look like?"
                          value={formDescription}
                          onChange={(e) => setFormDescription(e.target.value)}
                          rows={2}
                        />
                      </div>
                    )}

                    {/* Date */}
                    <div className="grid gap-2">
                      <Label htmlFor="create-date">
                        {createMode === "goal"
                          ? "Target Date"
                          : formIsRecurring
                            ? "Starts On"
                            : "Date"}
                      </Label>
                      <Input
                        id="create-date"
                        type="date"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                      />
                    </div>

                    {/* ---- Task-specific fields ---- */}
                    {createMode === "task" && (
                      <>
                        {/* Link to goal */}
                        {goals.length > 0 && (
                          <div className="grid gap-2">
                            <Label>Link to Goal</Label>
                            <Select
                              value={formGoalId}
                              onValueChange={setFormGoalId}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="No goal (standalone)" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">
                                  No goal (standalone)
                                </SelectItem>
                                {goals
                                  .filter((g) => !g.completed)
                                  .map((g) => (
                                    <SelectItem key={g.id} value={g.id}>
                                      <div className="flex items-center gap-2">
                                        <Target className="w-3 h-3 text-orange-500" />
                                        {g.title}
                                      </div>
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {/* Priority */}
                        <div className="grid gap-2">
                          <Label>Priority</Label>
                          <Select
                            value={formPriority}
                            onValueChange={(v) => setFormPriority(v as Priority)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {(
                                Object.entries(PRIORITY_CONFIG) as [
                                  Priority,
                                  (typeof PRIORITY_CONFIG)[Priority],
                                ][]
                              ).map(([key, cfg]) => {
                                const Icon = cfg.icon;
                                return (
                                  <SelectItem key={key} value={key}>
                                    <div className="flex items-center gap-2">
                                      <Icon className={cn("w-4 h-4", cfg.color)} />
                                      {cfg.label}
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Recurring toggle */}
                        <div className="grid gap-2">
                          <Label>Recurring Input Commitment</Label>
                          <Button
                            type="button"
                            variant={formIsRecurring ? "default" : "outline"}
                            className="justify-start gap-2 cursor-pointer"
                            onClick={() =>
                              setFormIsRecurring((prev) => !prev)
                            }
                          >
                            <Repeat className="w-4 h-4" />
                            {formIsRecurring
                              ? "This is a recurring commitment"
                              : "Make this recurring"}
                          </Button>
                        </div>

                        {/* Recurrence config */}
                        {formIsRecurring && (
                          <div className="grid gap-3 pl-2 border-l-2 border-primary/20">
                            <div className="grid gap-2">
                              <Label>Frequency</Label>
                              <Select
                                value={formRecurrenceType}
                                onValueChange={(v) =>
                                  setFormRecurrenceType(
                                    v as "daily" | "weekly"
                                  )
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="daily">
                                    Every day
                                  </SelectItem>
                                  <SelectItem value="weekly">
                                    Specific days each week
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {formRecurrenceType === "weekly" && (
                              <div className="grid gap-2">
                                <Label>Which days?</Label>
                                <div className="flex gap-1.5">
                                  {DAY_LABELS.map((label, idx) => (
                                    <button
                                      key={idx}
                                      type="button"
                                      onClick={() => toggleRecurrenceDay(idx)}
                                      className={cn(
                                        "w-9 h-9 rounded-full text-xs font-medium transition-colors cursor-pointer",
                                        formRecurrenceDays.includes(idx)
                                          ? "bg-primary text-primary-foreground"
                                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                                      )}
                                    >
                                      {label.charAt(0)}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsCreateOpen(false);
                        resetCreateForm();
                      }}
                      className="cursor-pointer"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreate}
                      disabled={
                        !formTitle.trim() ||
                        !formDate ||
                        (formIsRecurring &&
                          formRecurrenceType === "weekly" &&
                          formRecurrenceDays.length === 0)
                      }
                      className="cursor-pointer"
                    >
                      {createMode === "goal" ? "Create Goal" : "Add Task"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* ---- Stats ---- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Goals
                </CardTitle>
                <Target className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalGoals > 0
                    ? `${completedGoals}/${totalGoals}`
                    : "—"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalGoals > 0
                    ? `${Math.round((completedGoals / totalGoals) * 100)}% achieved`
                    : "Set your first goal"}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  This Week
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {thisWeekTotal > 0
                    ? `${thisWeekCompleted}/${thisWeekTotal}`
                    : "—"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {thisWeekTotal > 0
                    ? "tasks completed"
                    : "Nothing scheduled"}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Input Consistency
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {thisWeekTotal > 0 ? `${inputConsistency}%` : "—"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {thisWeekTotal > 0
                    ? "of commitments kept"
                    : "Add recurring tasks"}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Streak
                </CardTitle>
                <Flame className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {streak > 0 ? `${streak}d` : "—"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {streak > 0
                    ? "consecutive days"
                    : "Complete a day to start"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* ---- Main grid: Calendar + Goals panel ---- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Calendar</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 cursor-pointer"
                      onClick={prevMonth}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm font-medium w-32 text-center">
                      {format(currentDate, "MMMM yyyy")}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 cursor-pointer"
                      onClick={nextMonth}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-px bg-muted/20 rounded-lg overflow-hidden border border-border/50">
                    {DAY_LABELS.map((day) => (
                      <div
                        key={day}
                        className="bg-muted/50 p-2 text-center text-xs font-medium text-muted-foreground"
                      >
                        {day}
                      </div>
                    ))}
                    {calendarDays.map((day) => {
                      const dayInstances = getInstancesForDay(day);
                      const isToday = isSameDay(day, new Date());
                      const isCurrentMonth = isSameMonth(day, currentDate);

                      // Also show goal target dates
                      const dayGoals = goals.filter((g) =>
                        isSameDay(g.targetDate, day)
                      );

                      return (
                        <div
                          key={day.toString()}
                          className={cn(
                            "min-h-[100px] bg-card p-1 transition-colors hover:bg-accent/5",
                            !isCurrentMonth &&
                              "bg-muted/10 text-muted-foreground",
                            isToday && "bg-primary/5"
                          )}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span
                              className={cn(
                                "text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full",
                                isToday
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground"
                              )}
                            >
                              {format(day, "d")}
                            </span>
                          </div>
                          <div className="space-y-0.5">
                            {/* Goal target dates */}
                            {dayGoals.map((goal) => (
                              <div
                                key={goal.id}
                                onClick={() => toggleGoalComplete(goal.id)}
                                className={cn(
                                  "text-[10px] p-1 rounded border truncate cursor-pointer transition-all hover:scale-[1.02]",
                                  !goal.completed
                                    ? "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
                                    : "bg-orange-50/50 text-orange-400 border-orange-100 line-through"
                                )}
                                title={`Goal: ${goal.title}`}
                              >
                                <div className="flex items-center gap-1">
                                  <Target className="w-3 h-3 shrink-0" />
                                  <span className="truncate font-medium">
                                    {goal.title}
                                  </span>
                                </div>
                              </div>
                            ))}

                            {/* Task instances */}
                            {dayInstances.map((inst, i) => {
                              const PriorityIcon =
                                PRIORITY_CONFIG[inst.task.priority].icon;
                              return (
                                <div
                                  key={`${inst.task.id}-${i}`}
                                  onClick={() =>
                                    toggleInstance(inst.task, inst.date)
                                  }
                                  className={cn(
                                    "text-[10px] p-1 rounded border truncate cursor-pointer transition-all hover:scale-[1.02]",
                                    !inst.isCompleted
                                      ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                                      : "bg-blue-50/50 text-blue-400 border-blue-100 line-through"
                                  )}
                                  title={`${inst.task.title}${inst.task.isRecurring ? " (recurring)" : ""} — click to toggle`}
                                >
                                  <div className="flex items-center gap-1">
                                    {inst.task.isRecurring ? (
                                      <Repeat className="w-3 h-3 shrink-0" />
                                    ) : (
                                      <CheckSquare className="w-3 h-3 shrink-0" />
                                    )}
                                    <span className="truncate font-medium">
                                      {inst.task.title}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground justify-end">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <span>Goal targets</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>Tasks</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Repeat className="w-3 h-3" />
                      <span>Recurring</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ---- Goals & Tasks Panel ---- */}
            <div className="space-y-6">

              {/* Goals with linked tasks */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-orange-500" />
                    Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {goals.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground text-sm mb-3">
                        No goals yet
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCreateMode("goal");
                          setIsCreateOpen(true);
                        }}
                        className="cursor-pointer"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create your first goal
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {goals.map((goal) => {
                        const progress = goalProgress(goal.id);
                        const linkedTasks = tasks.filter(
                          (t) => t.goalId === goal.id
                        );
                        const isExpanded = expandedGoals.has(goal.id);

                        return (
                          <div
                            key={goal.id}
                            className={cn(
                              "rounded-lg border p-3 transition-colors",
                              goal.completed
                                ? "border-green-200 bg-green-50/30"
                                : "border-border"
                            )}
                          >
                            <div
                              className="flex items-start gap-3 cursor-pointer"
                              onClick={() => toggleGoalExpand(goal.id)}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleGoalComplete(goal.id);
                                }}
                                className="mt-0.5 cursor-pointer"
                              >
                                {goal.completed ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : (
                                  <Circle className="w-5 h-5 text-muted-foreground" />
                                )}
                              </button>
                              <div className="flex-1 min-w-0">
                                <h4
                                  className={cn(
                                    "font-medium text-sm",
                                    goal.completed &&
                                      "line-through text-muted-foreground"
                                  )}
                                >
                                  {goal.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  Target: {format(goal.targetDate, "MMM d, yyyy")}
                                </p>
                                {linkedTasks.length > 0 && !goal.completed && (
                                  <div className="mt-2 flex items-center gap-2">
                                    <Progress
                                      value={progress}
                                      className="h-1.5 flex-1"
                                    />
                                    <span className="text-[10px] text-muted-foreground font-medium w-8 text-right">
                                      {progress}%
                                    </span>
                                  </div>
                                )}
                              </div>
                              {linkedTasks.length > 0 && (
                                <div className="mt-0.5">
                                  {isExpanded ? (
                                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Expanded: linked tasks */}
                            {isExpanded && linkedTasks.length > 0 && (
                              <div className="mt-3 ml-8 space-y-1.5 border-l-2 border-muted pl-3">
                                {linkedTasks.map((task) => {
                                  const PIcon =
                                    PRIORITY_CONFIG[task.priority].icon;
                                  return (
                                    <div
                                      key={task.id}
                                      className="flex items-center gap-2 text-sm"
                                    >
                                      <PIcon
                                        className={cn(
                                          "w-3 h-3 shrink-0",
                                          PRIORITY_CONFIG[task.priority].color
                                        )}
                                      />
                                      <span
                                        className={cn(
                                          "truncate",
                                          task.completed &&
                                            !task.isRecurring &&
                                            "line-through text-muted-foreground"
                                        )}
                                      >
                                        {task.title}
                                      </span>
                                      {task.isRecurring && (
                                        <Repeat className="w-3 h-3 text-muted-foreground shrink-0" />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {/* Expanded: empty state */}
                            {isExpanded && linkedTasks.length === 0 && (
                              <div className="mt-3 ml-8 text-xs text-muted-foreground">
                                No tasks linked yet.{" "}
                                <button
                                  className="underline cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCreateMode("task");
                                    setFormGoalId(goal.id);
                                    setIsCreateOpen(true);
                                  }}
                                >
                                  Add one
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recurring Input Commitments */}
              {recurringTasks.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Repeat className="w-4 h-4 text-green-500" />
                      Input Commitments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {recurringTasks.map((task) => {
                        const goalName = task.goalId
                          ? goals.find((g) => g.id === task.goalId)?.title
                          : null;
                        return (
                          <div
                            key={task.id}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <Repeat className="w-4 h-4 text-green-500 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {task.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {task.recurrenceType === "daily"
                                  ? "Every day"
                                  : task.recurrenceDays
                                      .map((d) => DAY_LABELS[d])
                                      .join(", ")}
                                {goalName && (
                                  <>
                                    {" "}
                                    · <span className="text-orange-500">{goalName}</span>
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Standalone Tasks */}
              {standaloneTasks.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <CheckSquare className="w-4 h-4 text-blue-500" />
                      Unlinked Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {standaloneTasks
                        .sort(
                          (a, b) => a.date.getTime() - b.date.getTime()
                        )
                        .map((task) => {
                          const PIcon =
                            PRIORITY_CONFIG[task.priority].icon;
                          return (
                            <div
                              key={task.id}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                              onClick={() =>
                                toggleInstance(task, task.date)
                              }
                            >
                              {task.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p
                                  className={cn(
                                    "text-sm font-medium truncate",
                                    task.completed &&
                                      "line-through text-muted-foreground"
                                  )}
                                >
                                  {task.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {format(task.date, "MMM d")}
                                </p>
                              </div>
                              <PIcon
                                className={cn(
                                  "w-4 h-4 shrink-0",
                                  PRIORITY_CONFIG[task.priority].color
                                )}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recent Reflection */}
              {reflections.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <ClipboardList className="w-4 h-4 text-purple-500" />
                      Latest Reflection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const latest = reflections[reflections.length - 1];
                      return (
                        <div className="space-y-3 text-sm">
                          {latest.accomplished && (
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-1">
                                Accomplished
                              </p>
                              <p>{latest.accomplished}</p>
                            </div>
                          )}
                          {latest.obstacles && (
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-1">
                                Obstacles
                              </p>
                              <p>{latest.obstacles}</p>
                            </div>
                          )}
                          {latest.nextWeekFocus && (
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-1">
                                Next week
                              </p>
                              <p>{latest.nextWeekFocus}</p>
                            </div>
                          )}
                          <p className="text-xs text-muted-foreground">
                            Week of{" "}
                            {format(
                              new Date(latest.weekStart),
                              "MMM d, yyyy"
                            )}
                          </p>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}