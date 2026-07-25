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
  addDays,
  getDay,
  isPast,
  isWithinInterval,
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
  Plus,
  Star,
  Target,
  Flag,
  Folder,
  CheckSquare,
  Repeat,
  ChevronDown,
  ChevronUp,
  Circle,
  CheckCircle2,
  ClipboardList,
  AlertTriangle,
  TrendingUp,
  Flame,
  BookOpen,
  Eye,
  Compass,
  Map,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type EntryType =
  | "life-changing-project"
  | "strategic-goal"
  | "milestone"
  | "project"
  | "task"
  | "habit";

interface CalendarEntry {
  id: string;
  type: EntryType;
  title: string;
  description: string;
  parentId: string | null;
  targetDate: Date;
  completed: boolean;
  successMeasure: string;
  isRecurring: boolean;
  recurrenceType: "daily" | "weekly" | null;
  recurrenceDays: number[];
  completedDates: string[];
  createdAt: Date;
}

interface WeeklyReflection {
  id: string;
  weekStart: string;
  accomplished: string;
  obstacles: string;
  nextWeekFocus: string;
  createdAt: Date;
}

interface FoundationData {
  identity: string;
  values: string;
  cause: string;
  calling: string;
  purpose: string;
  mission: string;
  vision: string;
  legacy: string;
  assignment: string;
}

interface CalendarInstance {
  entry: CalendarEntry;
  date: Date;
  isCompleted: boolean;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

function genId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function dateKey(d: Date): string {
  return format(d, "yyyy-MM-dd");
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface TypeConfig {
  label: string;
  shortLabel: string;
  description: string;
  question: string;
  definition: string;
  timeHorizon: string;
  biblicalName: string;
  biblicalExample: string;
  parentTypes: EntryType[];
  icon: typeof Star;
  color: string;
  bg: string;
  calDefault: string;
  calDone: string;
  dot: string;
}

const TYPE_CONFIG: Record<EntryType, TypeConfig> = {
  "life-changing-project": {
    label: "Life-Changing Project",
    shortLabel: "LCP",
    description: "A major initiative that reshapes lives",
    question: "What major initiative advances my mission?",
    definition:
      "A major initiative that significantly advances your mission. Unlike a normal project, these reshape lives and often take years.",
    timeHorizon: "Months–Years",
    biblicalName: "Nehemiah",
    biblicalExample:
      "Rebuilding the walls of Jerusalem in 52 days — a project so significant it restored a nation's identity and worship.",
    parentTypes: [],
    icon: Star,
    color: "text-rose-500",
    bg: "bg-rose-50",
    calDefault: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
    calDone: "bg-rose-50/50 text-rose-400 border-rose-100 line-through",
    dot: "bg-rose-500",
  },
  "strategic-goal": {
    label: "Strategic Goal",
    shortLabel: "Goal",
    description: "A measurable result that must be achieved",
    question: "What measurable result must happen?",
    definition:
      "A measurable outcome with a clear completion point. Goals turn vision into targets you can aim at and track.",
    timeHorizon: "Months–Years",
    biblicalName: "Joseph",
    biblicalExample:
      "Store enough grain during seven years of plenty to survive seven years of famine — a measurable goal that saved nations.",
    parentTypes: ["life-changing-project"],
    icon: Target,
    color: "text-orange-500",
    bg: "bg-orange-50",
    calDefault:
      "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
    calDone: "bg-orange-50/50 text-orange-400 border-orange-100 line-through",
    dot: "bg-orange-500",
  },
  milestone: {
    label: "Milestone",
    shortLabel: "Milestone",
    description: "A major checkpoint showing meaningful progress",
    question: "How will I know I'm making progress?",
    definition:
      "A major checkpoint showing meaningful progress toward a goal. Milestones celebrate progress and create accountability.",
    timeHorizon: "Weeks–Months",
    biblicalName: "Noah",
    biblicalExample:
      "Each phase of ark construction — receiving instructions, gathering materials, completing the structure — was a milestone toward preservation.",
    parentTypes: ["strategic-goal"],
    icon: Flag,
    color: "text-purple-500",
    bg: "bg-purple-50",
    calDefault:
      "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
    calDone: "bg-purple-50/50 text-purple-400 border-purple-100 line-through",
    dot: "bg-purple-500",
  },
  project: {
    label: "Project",
    shortLabel: "Project",
    description: "A body of work that produces a specific result",
    question: "What collection of work produces this result?",
    definition:
      "A temporary body of work that produces something. Projects contain tasks and are bounded by time.",
    timeHorizon: "Days–Months",
    biblicalName: "Solomon",
    biblicalExample:
      "The Temple construction was organized into projects — materials gathering, worker organization, building phases — each producing part of the whole.",
    parentTypes: ["milestone"],
    icon: Folder,
    color: "text-green-500",
    bg: "bg-green-50",
    calDefault:
      "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
    calDone: "bg-green-50/50 text-green-400 border-green-100 line-through",
    dot: "bg-green-500",
  },
  task: {
    label: "Task",
    shortLabel: "Task",
    description: "A specific action you must complete",
    question: "What must I do next?",
    definition:
      "The smallest actionable work item. Tasks produce projects. Without tasks, nothing moves.",
    timeHorizon: "Minutes–Days",
    biblicalName: "Esther",
    biblicalExample:
      "Each step — fast for three days, approach the king, host the first banquet, host the second — was a deliberate task in a life-saving plan.",
    parentTypes: ["project"],
    icon: CheckSquare,
    color: "text-blue-500",
    bg: "bg-blue-50",
    calDefault: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    calDone: "bg-blue-50/50 text-blue-400 border-blue-100 line-through",
    dot: "bg-blue-500",
  },
  habit: {
    label: "Habit / System",
    shortLabel: "Habit",
    description: "A repeated behavior that sustains progress",
    question: "What repeated behavior ensures consistent progress?",
    definition:
      "Repeated behaviors that sustain progress — the daily disciplines that turn vision into reality. Habits build momentum over time.",
    timeHorizon: "Daily",
    biblicalName: "Daniel",
    biblicalExample:
      "Prayed three times daily, every day, regardless of circumstances — even when it meant the lion's den. The habit sustained his faithfulness across decades.",
    parentTypes: [],
    icon: Repeat,
    color: "text-teal-500",
    bg: "bg-teal-50",
    calDefault: "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100",
    calDone: "bg-teal-50/50 text-teal-400 border-teal-100 line-through",
    dot: "bg-teal-500",
  },
};

const ENTRY_TYPES: EntryType[] = [
  "life-changing-project",
  "strategic-goal",
  "milestone",
  "project",
  "task",
  "habit",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateInstances(
  entries: CalendarEntry[],
  rangeStart: Date,
  rangeEnd: Date
): CalendarInstance[] {
  const instances: CalendarInstance[] = [];
  const allDays = eachDayOfInterval({ start: rangeStart, end: rangeEnd });

  for (const entry of entries) {
    if (!entry.isRecurring) {
      if (
        isWithinInterval(entry.targetDate, { start: rangeStart, end: rangeEnd }) ||
        isSameDay(entry.targetDate, rangeStart) ||
        isSameDay(entry.targetDate, rangeEnd)
      ) {
        instances.push({ entry, date: entry.targetDate, isCompleted: entry.completed });
      }
    } else {
      for (const day of allDays) {
        if (day < entry.targetDate) continue;
        let matches = false;
        if (entry.recurrenceType === "daily") matches = true;
        else if (entry.recurrenceType === "weekly")
          matches = entry.recurrenceDays.includes(getDay(day));
        if (matches) {
          instances.push({
            entry,
            date: day,
            isCompleted: entry.completedDates.includes(dateKey(day)),
          });
        }
      }
    }
  }
  return instances;
}

function entryProgress(entryId: string, entries: CalendarEntry[]): number {
  const children = entries.filter(
    (e) => e.parentId === entryId && !e.isRecurring
  );
  if (children.length === 0) {
    const self = entries.find((e) => e.id === entryId);
    return self?.completed ? 100 : 0;
  }
  const total = children.reduce(
    (sum, child) => sum + entryProgress(child.id, entries),
    0
  );
  return Math.round(total / children.length);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DashboardCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isReflectionOpen, setIsReflectionOpen] = useState(false);
  const [infoType, setInfoType] = useState<EntryType | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [showFoundation, setShowFoundation] = useState(false);
  const { toast } = useToast();

  // --- Persisted state ---
  const [entries, setEntries] = useLocalStorage<CalendarEntry[]>(
    "tb-entries",
    []
  );
  const [reflections, setReflections] = useLocalStorage<WeeklyReflection[]>(
    "tb-reflections",
    []
  );
  const [foundation] = useLocalStorage<FoundationData>("tb-foundation", {
    identity: "", values: "", cause: "", calling: "",
    purpose: "", mission: "", vision: "", legacy: "", assignment: "",
  });

  // --- Create form ---
  const [formType, setFormType] = useState<EntryType>("task");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDate, setFormDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [formParentId, setFormParentId] = useState("none");
  const [formSuccessMeasure, setFormSuccessMeasure] = useState("");
  const [formIsRecurring, setFormIsRecurring] = useState(false);
  const [formRecurrenceType, setFormRecurrenceType] = useState<"daily" | "weekly">("weekly");
  const [formRecurrenceDays, setFormRecurrenceDays] = useState<number[]>([]);

  // --- Reflection form ---
  const [refAccomplished, setRefAccomplished] = useState("");
  const [refObstacles, setRefObstacles] = useState("");
  const [refNextFocus, setRefNextFocus] = useState("");

  // --- Calendar math ---
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calStart, end: calEnd });
  const thisWeekStart = startOfWeek(new Date());
  const thisWeekEnd = endOfWeek(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const instances = useMemo(
    () => generateInstances(entries, calStart, calEnd),
    [entries, calStart, calEnd]
  );
  const getInstancesForDay = (day: Date) =>
    instances.filter((i) => isSameDay(i.date, day));

  // --- Stats ---
  const nonRecurring = entries.filter((e) => !e.isRecurring);
  const completedEntries = nonRecurring.filter((e) => e.completed).length;

  const weekInstances = useMemo(
    () => generateInstances(entries, thisWeekStart, thisWeekEnd),
    [entries, thisWeekStart, thisWeekEnd]
  );
  const weekCompleted = weekInstances.filter((i) => i.isCompleted).length;

  const habits = entries.filter((e) => e.type === "habit");
  const habitInstances = useMemo(
    () => generateInstances(habits, thisWeekStart, thisWeekEnd),
    [habits, thisWeekStart, thisWeekEnd]
  );
  const habitConsistency =
    habitInstances.length > 0
      ? Math.round(
          (habitInstances.filter((i) => i.isCompleted).length /
            habitInstances.length) *
            100
        )
      : 0;

  const overdueEntries = nonRecurring.filter(
    (e) => !e.completed && isPast(e.targetDate) && !isSameDay(e.targetDate, new Date())
  );

  // --- Handlers ---

  function resetCreateForm() {
    setFormType("task");
    setFormTitle("");
    setFormDescription("");
    setFormDate(format(new Date(), "yyyy-MM-dd"));
    setFormParentId("none");
    setFormSuccessMeasure("");
    setFormIsRecurring(false);
    setFormRecurrenceType("weekly");
    setFormRecurrenceDays([]);
  }

  function handleCreate() {
    if (!formTitle.trim() || !formDate) return;

    const isHabit = formType === "habit";
    const entry: CalendarEntry = {
      id: genId(),
      type: formType,
      title: formTitle.trim(),
      description: formDescription.trim(),
      parentId: formParentId === "none" ? null : formParentId,
      targetDate: new Date(formDate),
      completed: false,
      successMeasure: formSuccessMeasure.trim(),
      isRecurring: isHabit ? true : false,
      recurrenceType: isHabit ? formRecurrenceType : null,
      recurrenceDays: isHabit ? formRecurrenceDays : [],
      completedDates: [],
      createdAt: new Date(),
    };
    setEntries((prev) => [...prev, entry]);
    setIsCreateOpen(false);
    resetCreateForm();

    const cfg = TYPE_CONFIG[entry.type];
    toast({
      title: `${cfg.label} Created`,
      description: `"${entry.title}" added`,
    });
  }

  function toggleInstance(entry: CalendarEntry, date: Date) {
    const key = dateKey(date);
    if (!entry.isRecurring) {
      setEntries((prev) =>
        prev.map((e) =>
          e.id === entry.id ? { ...e, completed: !e.completed } : e
        )
      );
    } else {
      setEntries((prev) =>
        prev.map((e) => {
          if (e.id !== entry.id) return e;
          const has = e.completedDates.includes(key);
          return {
            ...e,
            completedDates: has
              ? e.completedDates.filter((d) => d !== key)
              : [...e.completedDates, key],
          };
        })
      );
    }
  }

  function toggleNode(id: string) {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleRecurrenceDay(day: number) {
    setFormRecurrenceDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort()
    );
  }

  function handleSaveReflection() {
    if (!refAccomplished.trim() && !refObstacles.trim() && !refNextFocus.trim()) return;
    const r: WeeklyReflection = {
      id: genId(),
      weekStart: dateKey(thisWeekStart),
      accomplished: refAccomplished.trim(),
      obstacles: refObstacles.trim(),
      nextWeekFocus: refNextFocus.trim(),
      createdAt: new Date(),
    };
    setReflections((prev) => [...prev, r]);
    setRefAccomplished("");
    setRefObstacles("");
    setRefNextFocus("");
    setIsReflectionOpen(false);
    toast({ title: "Reflection Saved", description: `Week of ${format(thisWeekStart, "MMM d")}` });
  }

  // --- Helpers for create dialog ---
  const cfg = TYPE_CONFIG[formType];
  const possibleParents = entries.filter((e) => {
    if (formType === "habit") return !e.isRecurring; // habits can link to anything
    return cfg.parentTypes.includes(e.type) && !e.completed;
  });

  // --- Tree data ---
  const rootEntries = entries.filter(
    (e) => !e.parentId && !e.isRecurring
  );
  const getChildren = (parentId: string) =>
    entries.filter((e) => e.parentId === parentId);

  // --- Foundation summary helpers ---
  const hasFoundation =
    foundation.purpose || foundation.mission || foundation.vision || foundation.assignment;

  // ---------------------------------------------------------------------------
  // Render helpers
  // ---------------------------------------------------------------------------

  function renderTreeNode(entry: CalendarEntry, depth: number) {
    const children = getChildren(entry.id);
    const isExpanded = expandedNodes.has(entry.id);
    const ecfg = TYPE_CONFIG[entry.type];
    const Icon = ecfg.icon;
    const progress = entryProgress(entry.id, entries);
    const hasChildren = children.length > 0;
    const isOverdue =
      !entry.completed &&
      isPast(entry.targetDate) &&
      !isSameDay(entry.targetDate, new Date());

    return (
      <div key={entry.id}>
        <div
          className={cn(
            "flex items-start gap-2 p-2 rounded-lg transition-colors cursor-pointer hover:bg-muted/50",
            depth > 0 && "ml-4 border-l-2 border-muted pl-3"
          )}
          onClick={() => {
            if (hasChildren) toggleNode(entry.id);
            else toggleInstance(entry, entry.targetDate);
          }}
        >
          {entry.completed ? (
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
          ) : (
            <Icon
              className={cn("w-4 h-4 shrink-0 mt-0.5", isOverdue ? "text-red-400" : ecfg.color)}
            />
          )}
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                "text-sm font-medium truncate",
                entry.completed && "line-through text-muted-foreground"
              )}
            >
              {entry.title}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className={cn(isOverdue && "text-red-500")}>
                {format(entry.targetDate, "MMM d")}
              </span>
              <span className={cn("px-1.5 py-0.5 rounded-full text-[10px] font-medium", ecfg.bg, ecfg.color)}>
                {ecfg.shortLabel}
              </span>
            </div>
            {hasChildren && !entry.completed && (
              <div className="flex items-center gap-2 mt-1">
                <Progress value={progress} className="h-1 flex-1" />
                <span className="text-[10px] text-muted-foreground font-medium">
                  {progress}%
                </span>
              </div>
            )}
          </div>
          {hasChildren && (
            <div className="mt-0.5">
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          )}
        </div>
        {isExpanded &&
          children
            .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime())
            .map((child) => renderTreeNode(child, depth + 1))}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto md:ml-64 p-8">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Transformation Calendar
              </h1>
              <p className="text-muted-foreground mt-1">
                From life-changing projects to daily habits — one connected view.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={isReflectionOpen} onOpenChange={setIsReflectionOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 cursor-pointer">
                    <ClipboardList className="w-4 h-4" />
                    <span className="hidden sm:inline">Reflect</span>
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
                      <Textarea rows={3} value={refAccomplished} onChange={(e) => setRefAccomplished(e.target.value)} placeholder="Progress made, wins, tasks completed…" />
                    </div>
                    <div className="grid gap-2">
                      <Label>What got in the way?</Label>
                      <Textarea rows={3} value={refObstacles} onChange={(e) => setRefObstacles(e.target.value)} placeholder="Was the plan unrealistic? A scheduling problem? Avoidance?" />
                    </div>
                    <div className="grid gap-2">
                      <Label>What will you focus on next week?</Label>
                      <Textarea rows={3} value={refNextFocus} onChange={(e) => setRefNextFocus(e.target.value)} placeholder="Top priorities, adjustments…" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsReflectionOpen(false)} className="cursor-pointer">Cancel</Button>
                    <Button onClick={handleSaveReflection} className="cursor-pointer">Save Reflection</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

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
                <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{TYPE_CONFIG[formType].label}</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {/* Type selector */}
                    <div className="grid gap-2">
                      <Label>What are you adding?</Label>
                      <Select value={formType} onValueChange={(v) => { setFormType(v as EntryType); setFormParentId("none"); }}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {ENTRY_TYPES.map((t) => {
                            const tc = TYPE_CONFIG[t];
                            const TIcon = tc.icon;
                            return (
                              <SelectItem key={t} value={t}>
                                <div className="flex items-center gap-2">
                                  <TIcon className={cn("w-4 h-4", tc.color)} />
                                  <span>{tc.label}</span>
                                  <span className="text-muted-foreground text-xs ml-1">— {tc.description}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <button
                        className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
                        onClick={() => setInfoType(formType)}
                      >
                        <BookOpen className="w-3 h-3" />
                        What is a {TYPE_CONFIG[formType].label}?
                      </button>
                    </div>

                    {/* Title */}
                    <div className="grid gap-2">
                      <Label>Title</Label>
                      <Input
                        placeholder={`e.g., ${formType === "life-changing-project" ? "Build Transformation Builder" : formType === "strategic-goal" ? "Reach 10,000 students" : formType === "milestone" ? "Beta launched" : formType === "project" ? "Build landing page" : formType === "task" ? "Write introduction" : "Write 500 words daily"}`}
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                      />
                    </div>

                    {/* Description */}
                    <div className="grid gap-2">
                      <Label>Description <span className="text-muted-foreground font-normal">(optional)</span></Label>
                      <Textarea
                        rows={2}
                        placeholder="Additional context…"
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                      />
                    </div>

                    {/* Date */}
                    <div className="grid gap-2">
                      <Label>{formType === "habit" ? "Starts On" : "Target Date"}</Label>
                      <Input type="date" value={formDate} onChange={(e) => setFormDate(e.target.value)} />
                    </div>

                    {/* Parent link */}
                    {(cfg.parentTypes.length > 0 || formType === "habit") && possibleParents.length > 0 && (
                      <div className="grid gap-2">
                        <Label>
                          {formType === "habit" ? "Serves (optional)" : `Link to ${TYPE_CONFIG[cfg.parentTypes[0]]?.label || "parent"}`}
                        </Label>
                        <Select value={formParentId} onValueChange={setFormParentId}>
                          <SelectTrigger><SelectValue placeholder="None (standalone)" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None (standalone)</SelectItem>
                            {possibleParents.map((p) => {
                              const pc = TYPE_CONFIG[p.type];
                              const PIcon = pc.icon;
                              return (
                                <SelectItem key={p.id} value={p.id}>
                                  <div className="flex items-center gap-2">
                                    <PIcon className={cn("w-3 h-3", pc.color)} />
                                    {p.title}
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Success measure (goals + milestones) */}
                    {(formType === "strategic-goal" || formType === "milestone") && (
                      <div className="grid gap-2">
                        <Label>How will you know it's done?</Label>
                        <Input
                          placeholder="e.g., First 1,000 members enrolled"
                          value={formSuccessMeasure}
                          onChange={(e) => setFormSuccessMeasure(e.target.value)}
                        />
                      </div>
                    )}

                    {/* Habit recurrence */}
                    {formType === "habit" && (
                      <div className="grid gap-3 pl-2 border-l-2 border-teal-200">
                        <div className="grid gap-2">
                          <Label>Frequency</Label>
                          <Select value={formRecurrenceType} onValueChange={(v) => setFormRecurrenceType(v as "daily" | "weekly")}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Every day</SelectItem>
                              <SelectItem value="weekly">Specific days each week</SelectItem>
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
                                      ? "bg-teal-500 text-white"
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
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => { setIsCreateOpen(false); resetCreateForm(); }} className="cursor-pointer">Cancel</Button>
                    <Button
                      onClick={handleCreate}
                      disabled={
                        !formTitle.trim() ||
                        !formDate ||
                        (formType === "habit" && formRecurrenceType === "weekly" && formRecurrenceDays.length === 0)
                      }
                      className="cursor-pointer"
                    >
                      Create {TYPE_CONFIG[formType].shortLabel}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Foundation Summary */}
          {hasFoundation && (
            <Card className="bg-muted/20 border-dashed">
              <CardContent className="py-3">
                <button
                  className="w-full flex items-center justify-between cursor-pointer"
                  onClick={() => setShowFoundation((p) => !p)}
                >
                  <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <Compass className="w-3 h-3" />
                    Life Direction Foundation
                  </span>
                  {showFoundation ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                {showFoundation && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-sm">
                    {foundation.purpose && (
                      <div>
                        <span className="text-xs font-medium text-muted-foreground">Purpose</span>
                        <p className="mt-0.5">{foundation.purpose}</p>
                      </div>
                    )}
                    {foundation.mission && (
                      <div>
                        <span className="text-xs font-medium text-muted-foreground">Mission</span>
                        <p className="mt-0.5">{foundation.mission}</p>
                      </div>
                    )}
                    {foundation.vision && (
                      <div>
                        <span className="text-xs font-medium text-muted-foreground">Vision</span>
                        <p className="mt-0.5">{foundation.vision}</p>
                      </div>
                    )}
                    {foundation.assignment && (
                      <div>
                        <span className="text-xs font-medium text-muted-foreground">Current Assignment</span>
                        <p className="mt-0.5">{foundation.assignment}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {nonRecurring.length > 0 ? `${completedEntries}/${nonRecurring.length}` : "—"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {nonRecurring.length > 0
                    ? `${Math.round((completedEntries / nonRecurring.length) * 100)}% completed`
                    : "Add your first entry"}
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {weekInstances.length > 0 ? `${weekCompleted}/${weekInstances.length}` : "—"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {weekInstances.length > 0 ? "completed" : "Nothing scheduled"}
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Habit Consistency</CardTitle>
                <Flame className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {habitInstances.length > 0 ? `${habitConsistency}%` : "—"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {habitInstances.length > 0 ? "of commitments kept" : "Add a habit"}
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
                <AlertTriangle className={cn("h-4 w-4", overdueEntries.length > 0 ? "text-red-500" : "text-muted-foreground")} />
              </CardHeader>
              <CardContent>
                <div className={cn("text-2xl font-bold", overdueEntries.length > 0 && "text-red-600")}>
                  {overdueEntries.length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {overdueEntries.length > 0 ? "need attention" : "All on track"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Calendar + Hierarchy Tree */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Calendar</CardTitle>
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
                  <div className="grid grid-cols-7 gap-px bg-muted/20 rounded-lg overflow-hidden border border-border/50">
                    {DAY_LABELS.map((d) => (
                      <div key={d} className="bg-muted/50 p-2 text-center text-xs font-medium text-muted-foreground">{d}</div>
                    ))}
                    {calendarDays.map((day) => {
                      const dayInstances = getInstancesForDay(day);
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
                          <span className={cn(
                            "text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full mb-0.5",
                            isToday ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                          )}>
                            {format(day, "d")}
                          </span>
                          <div className="space-y-0.5">
                            {dayInstances.map((inst, i) => {
                              const ecfg = TYPE_CONFIG[inst.entry.type];
                              const EIcon = ecfg.icon;
                              return (
                                <div
                                  key={`${inst.entry.id}-${i}`}
                                  onClick={() => toggleInstance(inst.entry, inst.date)}
                                  className={cn(
                                    "text-[10px] p-1 rounded border truncate cursor-pointer transition-all hover:scale-[1.02]",
                                    inst.isCompleted ? ecfg.calDone : ecfg.calDefault
                                  )}
                                  title={`${ecfg.label}: ${inst.entry.title}`}
                                >
                                  <div className="flex items-center gap-1">
                                    <EIcon className="w-3 h-3 shrink-0" />
                                    <span className="truncate font-medium">{inst.entry.title}</span>
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
                  <div className="flex flex-wrap gap-3 mt-4 text-xs text-muted-foreground justify-end">
                    {ENTRY_TYPES.map((t) => (
                      <div key={t} className="flex items-center gap-1">
                        <div className={cn("w-2 h-2 rounded-full", TYPE_CONFIG[t].dot)} />
                        <span>{TYPE_CONFIG[t].shortLabel}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Hierarchy Tree */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Transformation Hierarchy</CardTitle>
                </CardHeader>
                <CardContent>
                  {entries.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground text-sm mb-3">
                        Start building your transformation chain
                      </p>
                      <Button variant="outline" size="sm" onClick={() => setIsCreateOpen(true)} className="cursor-pointer">
                        <Plus className="w-4 h-4 mr-2" />
                        Add your first entry
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {rootEntries
                        .sort((a, b) => {
                          const typeOrder = ENTRY_TYPES.indexOf(a.type) - ENTRY_TYPES.indexOf(b.type);
                          return typeOrder !== 0 ? typeOrder : a.targetDate.getTime() - b.targetDate.getTime();
                        })
                        .map((entry) => renderTreeNode(entry, 0))}

                      {/* Habits section */}
                      {habits.length > 0 && (
                        <div className="pt-3 mt-3 border-t">
                          <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                            <Repeat className="w-3 h-3" />
                            Daily Habits & Systems
                          </p>
                          {habits.map((h) => {
                            const parentEntry = h.parentId
                              ? entries.find((e) => e.id === h.parentId)
                              : null;
                            return (
                              <div
                                key={h.id}
                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                              >
                                <Repeat className="w-4 h-4 text-teal-500 shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{h.title}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {h.recurrenceType === "daily"
                                      ? "Every day"
                                      : h.recurrenceDays.map((d) => DAY_LABELS[d]).join(", ")}
                                    {parentEntry && (
                                      <>
                                        {" "}· <span className={TYPE_CONFIG[parentEntry.type].color}>{parentEntry.title}</span>
                                      </>
                                    )}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Overdue */}
              {overdueEntries.length > 0 && (
                <Card className="border-red-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base text-red-600">
                      <AlertTriangle className="w-4 h-4" />
                      Overdue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {overdueEntries.map((e) => {
                        const ecfg = TYPE_CONFIG[e.type];
                        const EIcon = ecfg.icon;
                        return (
                          <div
                            key={e.id}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-50/50 cursor-pointer"
                            onClick={() => toggleInstance(e, e.targetDate)}
                          >
                            <EIcon className="w-4 h-4 text-red-400 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{e.title}</p>
                              <p className="text-xs text-red-500">
                                {format(e.targetDate, "MMM d")} · {ecfg.shortLabel}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Latest Reflection */}
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
                        <div className="space-y-2 text-sm">
                          {latest.accomplished && <div><p className="text-xs font-medium text-muted-foreground">Accomplished</p><p>{latest.accomplished}</p></div>}
                          {latest.obstacles && <div><p className="text-xs font-medium text-muted-foreground">Obstacles</p><p>{latest.obstacles}</p></div>}
                          {latest.nextWeekFocus && <div><p className="text-xs font-medium text-muted-foreground">Next week</p><p>{latest.nextWeekFocus}</p></div>}
                          <p className="text-xs text-muted-foreground">Week of {format(new Date(latest.weekStart), "MMM d, yyyy")}</p>
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

      {/* Info / Teaching Dialog */}
      <Dialog open={infoType !== null} onOpenChange={(open) => { if (!open) setInfoType(null); }}>
        {infoType && (() => {
          const ic = TYPE_CONFIG[infoType];
          const IIcon = ic.icon;
          return (
            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", ic.bg)}>
                    <IIcon className={cn("w-5 h-5", ic.color)} />
                  </div>
                  {ic.label}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">The Question</p>
                  <p className="italic">{ic.question}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Definition</p>
                  <p className="text-sm leading-relaxed">{ic.definition}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Time Horizon</p>
                  <p className="text-sm">{ic.timeHorizon}</p>
                </div>
                <div className={cn("rounded-lg p-4", ic.bg)}>
                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Biblical Example — {ic.biblicalName}
                  </p>
                  <p className="text-sm leading-relaxed">{ic.biblicalExample}</p>
                </div>
              </div>
            </DialogContent>
          );
        })()}
      </Dialog>
    </div>
  );
}