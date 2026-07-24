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
  differenceInDays,
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
  Flag,
  Folder,
  Plus,
  ChevronDown,
  ChevronUp,
  Circle,
  CheckCircle2,
  ClipboardList,
  AlertTriangle,
  Clock,
  Pause,
  PlayCircle,
  TrendingUp,
  CalendarCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ProjectStatus = "planning" | "active" | "on-hold" | "completed";

interface Project {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  status: ProjectStatus;
  createdAt: Date;
}

interface Milestone {
  id: string;
  projectId: string | null; // null = standalone milestone
  title: string;
  targetDate: Date;
  completed: boolean;
  successMeasure: string; // what does "done" look like
  createdAt: Date;
}

interface ProjectReview {
  id: string;
  projectId: string;
  progressNote: string;
  blockers: string;
  nextActions: string;
  createdAt: Date;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function genId(): string {
  return Math.random().toString(36).substring(2, 11);
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; icon: typeof PlayCircle; color: string; bg: string; border: string }
> = {
  planning: {
    label: "Planning",
    icon: Clock,
    color: "text-slate-500",
    bg: "bg-slate-100 text-slate-700",
    border: "border-slate-200",
  },
  active: {
    label: "Active",
    icon: PlayCircle,
    color: "text-green-500",
    bg: "bg-green-100 text-green-700",
    border: "border-green-200",
  },
  "on-hold": {
    label: "On Hold",
    icon: Pause,
    color: "text-amber-500",
    bg: "bg-amber-100 text-amber-700",
    border: "border-amber-200",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    color: "text-blue-500",
    bg: "bg-blue-100 text-blue-700",
    border: "border-blue-200",
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DashboardProjectsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // --- Data state ---
  const [projects, setProjects] = useState<Project[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [reviews, setReviews] = useState<ProjectReview[]>([]);

  // --- Create-dialog state ---
  type CreateMode = "project" | "milestone";
  const [createMode, setCreateMode] = useState<CreateMode>("milestone");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDate, setFormDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [formProjectId, setFormProjectId] = useState<string>("none");
  const [formSuccessMeasure, setFormSuccessMeasure] = useState("");
  const [formStatus, setFormStatus] = useState<ProjectStatus>("planning");

  // --- Review-dialog state ---
  const [reviewProjectId, setReviewProjectId] = useState<string>("none");
  const [reviewProgress, setReviewProgress] = useState("");
  const [reviewBlockers, setReviewBlockers] = useState("");
  const [reviewNextActions, setReviewNextActions] = useState("");

  // --- Calendar math ---
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calStart, end: calEnd });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // --- Calendar entries for a day ---
  function getEntriesForDay(day: Date) {
    const dayMilestones = milestones.filter((m) => isSameDay(m.targetDate, day));
    const dayProjects = projects.filter((p) => isSameDay(p.targetDate, day));
    return { milestones: dayMilestones, projects: dayProjects };
  }

  // --- Stats ---
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const completedProjects = projects.filter((p) => p.status === "completed").length;

  const totalMilestones = milestones.length;
  const completedMilestones = milestones.filter((m) => m.completed).length;

  const overdueMilestones = milestones.filter(
    (m) => !m.completed && isPast(m.targetDate) && !isSameDay(m.targetDate, new Date())
  );

  const upcomingMilestones = milestones
    .filter((m) => !m.completed && !isPast(m.targetDate))
    .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime());

  // Project progress: % of linked milestones completed
  function projectProgress(projectId: string): number {
    const linked = milestones.filter((m) => m.projectId === projectId);
    if (linked.length === 0) return 0;
    const done = linked.filter((m) => m.completed).length;
    return Math.round((done / linked.length) * 100);
  }

  // Days until next milestone for a project
  function nextMilestoneIn(projectId: string): number | null {
    const upcoming = milestones
      .filter((m) => m.projectId === projectId && !m.completed)
      .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime());
    if (upcoming.length === 0) return null;
    return differenceInDays(upcoming[0].targetDate, new Date());
  }

  // --- Handlers ---

  function resetCreateForm() {
    setFormTitle("");
    setFormDescription("");
    setFormDate(format(new Date(), "yyyy-MM-dd"));
    setFormProjectId("none");
    setFormSuccessMeasure("");
    setFormStatus("planning");
    setCreateMode("milestone");
  }

  function handleCreate() {
    if (!formTitle.trim() || !formDate) return;

    if (createMode === "project") {
      const project: Project = {
        id: genId(),
        title: formTitle.trim(),
        description: formDescription.trim(),
        targetDate: new Date(formDate),
        status: formStatus,
        createdAt: new Date(),
      };
      setProjects((prev) => [...prev, project]);
      toast({
        title: "Project Created",
        description: `"${project.title}" — ${STATUS_CONFIG[project.status].label}`,
      });
    } else {
      const milestone: Milestone = {
        id: genId(),
        projectId: formProjectId === "none" ? null : formProjectId,
        title: formTitle.trim(),
        targetDate: new Date(formDate),
        completed: false,
        successMeasure: formSuccessMeasure.trim(),
        createdAt: new Date(),
      };
      setMilestones((prev) => [...prev, milestone]);

      const projName =
        milestone.projectId
          ? projects.find((p) => p.id === milestone.projectId)?.title
          : null;
      toast({
        title: "Milestone Added",
        description: projName
          ? `"${milestone.title}" linked to "${projName}"`
          : `"${milestone.title}" added`,
      });
    }

    setIsCreateOpen(false);
    resetCreateForm();
  }

  function toggleMilestoneComplete(milestoneId: string) {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === milestoneId ? { ...m, completed: !m.completed } : m
      )
    );
  }

  function updateProjectStatus(projectId: string, status: ProjectStatus) {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, status } : p))
    );
    toast({
      title: "Status Updated",
      description: `Project moved to ${STATUS_CONFIG[status].label}`,
    });
  }

  function toggleProjectExpand(projectId: string) {
    setExpandedProjects((prev) => {
      const next = new Set(prev);
      if (next.has(projectId)) next.delete(projectId);
      else next.add(projectId);
      return next;
    });
  }

  function handleSaveReview() {
    if (
      reviewProjectId === "none" ||
      (!reviewProgress.trim() && !reviewBlockers.trim() && !reviewNextActions.trim())
    )
      return;

    const review: ProjectReview = {
      id: genId(),
      projectId: reviewProjectId,
      progressNote: reviewProgress.trim(),
      blockers: reviewBlockers.trim(),
      nextActions: reviewNextActions.trim(),
      createdAt: new Date(),
    };
    setReviews((prev) => [...prev, review]);
    setReviewProjectId("none");
    setReviewProgress("");
    setReviewBlockers("");
    setReviewNextActions("");
    setIsReviewOpen(false);

    const projName = projects.find((p) => p.id === review.projectId)?.title;
    toast({
      title: "Review Saved",
      description: `Review recorded for "${projName}"`,
    });
  }

  // --- Derived ---
  const standaloneMilestones = milestones.filter((m) => !m.projectId);

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
                Milestones to Projects
              </h1>
              <p className="text-muted-foreground mt-1">
                Break projects into measurable checkpoints.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Project Review */}
              <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2 cursor-pointer"
                    disabled={projects.length === 0}
                  >
                    <ClipboardList className="w-4 h-4" />
                    <span className="hidden sm:inline">Project Review</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Project Review</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label>Which project?</Label>
                      <Select
                        value={reviewProjectId}
                        onValueChange={setReviewProjectId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none" disabled>
                            Select a project
                          </SelectItem>
                          {projects
                            .filter((p) => p.status !== "completed")
                            .map((p) => (
                              <SelectItem key={p.id} value={p.id}>
                                <div className="flex items-center gap-2">
                                  <Folder className="w-3 h-3 text-green-500" />
                                  {p.title}
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>What progress has been made?</Label>
                      <Textarea
                        placeholder="Milestones hit, deliverables completed, decisions made…"
                        value={reviewProgress}
                        onChange={(e) => setReviewProgress(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>What's blocking progress?</Label>
                      <Textarea
                        placeholder="Dependencies, resource gaps, unclear requirements…"
                        value={reviewBlockers}
                        onChange={(e) => setReviewBlockers(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>What are the next actions?</Label>
                      <Textarea
                        placeholder="Immediate next steps to keep momentum…"
                        value={reviewNextActions}
                        onChange={(e) => setReviewNextActions(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsReviewOpen(false)}
                      className="cursor-pointer"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveReview}
                      disabled={reviewProjectId === "none"}
                      className="cursor-pointer"
                    >
                      Save Review
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
                      {createMode === "project"
                        ? "Create a Project"
                        : "Add a Milestone"}
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
                          <SelectItem value="project">
                            <div className="flex items-center gap-2">
                              <Folder className="w-4 h-4 text-green-500" />
                              <span>Project — a body of work with a deadline</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="milestone">
                            <div className="flex items-center gap-2">
                              <Flag className="w-4 h-4 text-purple-500" />
                              <span>Milestone — a measurable checkpoint</span>
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
                          createMode === "project"
                            ? "e.g., Launch Online Course"
                            : "e.g., Complete course outline"
                        }
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                      />
                    </div>

                    {/* Description (projects only) */}
                    {createMode === "project" && (
                      <div className="grid gap-2">
                        <Label htmlFor="create-desc">
                          Description{" "}
                          <span className="text-muted-foreground font-normal">
                            (optional)
                          </span>
                        </Label>
                        <Textarea
                          id="create-desc"
                          placeholder="What is this project delivering?"
                          value={formDescription}
                          onChange={(e) => setFormDescription(e.target.value)}
                          rows={2}
                        />
                      </div>
                    )}

                    {/* Date */}
                    <div className="grid gap-2">
                      <Label htmlFor="create-date">
                        {createMode === "project" ? "Target Date" : "Target Date"}
                      </Label>
                      <Input
                        id="create-date"
                        type="date"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                      />
                    </div>

                    {/* Project-specific: status */}
                    {createMode === "project" && (
                      <div className="grid gap-2">
                        <Label>Starting Status</Label>
                        <Select
                          value={formStatus}
                          onValueChange={(v) =>
                            setFormStatus(v as ProjectStatus)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {(
                              Object.entries(STATUS_CONFIG) as [
                                ProjectStatus,
                                (typeof STATUS_CONFIG)[ProjectStatus],
                              ][]
                            ).map(([key, cfg]) => {
                              const Icon = cfg.icon;
                              return (
                                <SelectItem key={key} value={key}>
                                  <div className="flex items-center gap-2">
                                    <Icon
                                      className={cn("w-4 h-4", cfg.color)}
                                    />
                                    {cfg.label}
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Milestone-specific fields */}
                    {createMode === "milestone" && (
                      <>
                        {/* Link to project */}
                        {projects.length > 0 && (
                          <div className="grid gap-2">
                            <Label>Link to Project</Label>
                            <Select
                              value={formProjectId}
                              onValueChange={setFormProjectId}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="No project (standalone)" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">
                                  No project (standalone)
                                </SelectItem>
                                {projects
                                  .filter((p) => p.status !== "completed")
                                  .map((p) => (
                                    <SelectItem key={p.id} value={p.id}>
                                      <div className="flex items-center gap-2">
                                        <Folder className="w-3 h-3 text-green-500" />
                                        {p.title}
                                      </div>
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {/* Success measure */}
                        <div className="grid gap-2">
                          <Label htmlFor="create-success">
                            How will you know it's done?
                          </Label>
                          <Input
                            id="create-success"
                            placeholder="e.g., Outline reviewed and approved by mentor"
                            value={formSuccessMeasure}
                            onChange={(e) =>
                              setFormSuccessMeasure(e.target.value)
                            }
                          />
                        </div>
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
                      disabled={!formTitle.trim() || !formDate}
                      className="cursor-pointer"
                    >
                      {createMode === "project"
                        ? "Create Project"
                        : "Add Milestone"}
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
                  Active Projects
                </CardTitle>
                <PlayCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {activeProjects > 0 ? activeProjects : "—"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {completedProjects > 0
                    ? `${completedProjects} completed`
                    : projects.length > 0
                      ? "In progress"
                      : "Create your first project"}
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
                  {totalMilestones > 0
                    ? `${completedMilestones}/${totalMilestones}`
                    : "—"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalMilestones > 0
                    ? `${Math.round((completedMilestones / totalMilestones) * 100)}% reached`
                    : "Set your first milestone"}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Upcoming
                </CardTitle>
                <CalendarCheck className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {upcomingMilestones.length > 0
                    ? upcomingMilestones.length
                    : "—"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {upcomingMilestones.length > 0
                    ? `Next: ${format(upcomingMilestones[0].targetDate, "MMM d")}`
                    : "No upcoming milestones"}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Overdue
                </CardTitle>
                <AlertTriangle
                  className={cn(
                    "h-4 w-4",
                    overdueMilestones.length > 0
                      ? "text-red-500"
                      : "text-muted-foreground"
                  )}
                />
              </CardHeader>
              <CardContent>
                <div
                  className={cn(
                    "text-2xl font-bold",
                    overdueMilestones.length > 0 && "text-red-600"
                  )}
                >
                  {overdueMilestones.length > 0
                    ? overdueMilestones.length
                    : "0"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {overdueMilestones.length > 0
                    ? "Need attention"
                    : "All on track"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* ---- Main grid: Calendar + Projects panel ---- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Project Calendar</CardTitle>
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
                      const entries = getEntriesForDay(day);
                      const isToday = isSameDay(day, new Date());
                      const isCurrentMonth = isSameMonth(day, currentDate);

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
                            {/* Project target dates */}
                            {entries.projects.map((project) => {
                              const cfg = STATUS_CONFIG[project.status];
                              return (
                                <div
                                  key={project.id}
                                  className={cn(
                                    "text-[10px] p-1 rounded border truncate",
                                    project.status === "completed"
                                      ? "bg-green-50/50 text-green-400 border-green-100 line-through"
                                      : "bg-green-50 text-green-700 border-green-200"
                                  )}
                                  title={`Project deadline: ${project.title} (${cfg.label})`}
                                >
                                  <div className="flex items-center gap-1">
                                    <Folder className="w-3 h-3 shrink-0" />
                                    <span className="truncate font-medium">
                                      {project.title}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}

                            {/* Milestone target dates */}
                            {entries.milestones.map((milestone) => {
                              const isOverdue =
                                !milestone.completed &&
                                isPast(milestone.targetDate) &&
                                !isToday;
                              return (
                                <div
                                  key={milestone.id}
                                  onClick={() =>
                                    toggleMilestoneComplete(milestone.id)
                                  }
                                  className={cn(
                                    "text-[10px] p-1 rounded border truncate cursor-pointer transition-all hover:scale-[1.02]",
                                    milestone.completed
                                      ? "bg-purple-50/50 text-purple-400 border-purple-100 line-through"
                                      : isOverdue
                                        ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                                        : "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
                                  )}
                                  title={`${milestone.title}${milestone.successMeasure ? ` — Done when: ${milestone.successMeasure}` : ""} (click to toggle)`}
                                >
                                  <div className="flex items-center gap-1">
                                    <Flag className="w-3 h-3 shrink-0" />
                                    <span className="truncate font-medium">
                                      {milestone.title}
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
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span>Project deadlines</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      <span>Milestones</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span>Overdue</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ---- Projects & Milestones Panel ---- */}
            <div className="space-y-6">

              {/* Projects with linked milestones */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-green-500" />
                    Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {projects.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground text-sm mb-3">
                        No projects yet
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCreateMode("project");
                          setIsCreateOpen(true);
                        }}
                        className="cursor-pointer"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create your first project
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {projects.map((project) => {
                        const progress = projectProgress(project.id);
                        const linked = milestones.filter(
                          (m) => m.projectId === project.id
                        );
                        const isExpanded = expandedProjects.has(project.id);
                        const cfg = STATUS_CONFIG[project.status];
                        const StatusIcon = cfg.icon;
                        const nextMs = nextMilestoneIn(project.id);

                        return (
                          <div
                            key={project.id}
                            className={cn(
                              "rounded-lg border p-3 transition-colors",
                              cfg.border
                            )}
                          >
                            {/* Project header */}
                            <div
                              className="flex items-start gap-3 cursor-pointer"
                              onClick={() => toggleProjectExpand(project.id)}
                            >
                              <StatusIcon
                                className={cn("w-5 h-5 mt-0.5 shrink-0", cfg.color)}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4
                                    className={cn(
                                      "font-medium text-sm truncate",
                                      project.status === "completed" &&
                                        "line-through text-muted-foreground"
                                    )}
                                  >
                                    {project.title}
                                  </h4>
                                  <span
                                    className={cn(
                                      "text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0",
                                      cfg.bg
                                    )}
                                  >
                                    {cfg.label}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  Due {format(project.targetDate, "MMM d, yyyy")}
                                  {nextMs !== null && (
                                    <>
                                      {" "}
                                      · Next milestone in{" "}
                                      {nextMs <= 0
                                        ? "today"
                                        : `${nextMs}d`}
                                    </>
                                  )}
                                </p>

                                {linked.length > 0 &&
                                  project.status !== "completed" && (
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
                              {(linked.length > 0 || true) && (
                                <div className="mt-0.5">
                                  {isExpanded ? (
                                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Expanded content */}
                            {isExpanded && (
                              <div className="mt-3 space-y-3">
                                {/* Status changer */}
                                <div className="ml-8 flex items-center gap-1.5">
                                  {(
                                    Object.entries(STATUS_CONFIG) as [
                                      ProjectStatus,
                                      (typeof STATUS_CONFIG)[ProjectStatus],
                                    ][]
                                  ).map(([key, scfg]) => (
                                    <button
                                      key={key}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateProjectStatus(project.id, key);
                                      }}
                                      className={cn(
                                        "text-[10px] font-medium px-2 py-1 rounded-full transition-colors cursor-pointer",
                                        project.status === key
                                          ? scfg.bg
                                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                                      )}
                                    >
                                      {scfg.label}
                                    </button>
                                  ))}
                                </div>

                                {/* Linked milestones */}
                                {linked.length > 0 ? (
                                  <div className="ml-8 space-y-1.5 border-l-2 border-muted pl-3">
                                    {linked
                                      .sort(
                                        (a, b) =>
                                          a.targetDate.getTime() -
                                          b.targetDate.getTime()
                                      )
                                      .map((ms) => {
                                        const isOverdue =
                                          !ms.completed &&
                                          isPast(ms.targetDate) &&
                                          !isSameDay(ms.targetDate, new Date());
                                        return (
                                          <div
                                            key={ms.id}
                                            className="flex items-start gap-2 text-sm cursor-pointer group"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toggleMilestoneComplete(ms.id);
                                            }}
                                          >
                                            {ms.completed ? (
                                              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                            ) : (
                                              <Circle
                                                className={cn(
                                                  "w-4 h-4 shrink-0 mt-0.5 group-hover:text-green-400 transition-colors",
                                                  isOverdue
                                                    ? "text-red-400"
                                                    : "text-muted-foreground"
                                                )}
                                              />
                                            )}
                                            <div className="flex-1 min-w-0">
                                              <span
                                                className={cn(
                                                  "truncate block",
                                                  ms.completed &&
                                                    "line-through text-muted-foreground"
                                                )}
                                              >
                                                {ms.title}
                                              </span>
                                              <span
                                                className={cn(
                                                  "text-xs",
                                                  isOverdue
                                                    ? "text-red-500"
                                                    : "text-muted-foreground"
                                                )}
                                              >
                                                {format(
                                                  ms.targetDate,
                                                  "MMM d"
                                                )}
                                                {ms.successMeasure && (
                                                  <>
                                                    {" "}
                                                    · {ms.successMeasure}
                                                  </>
                                                )}
                                              </span>
                                            </div>
                                          </div>
                                        );
                                      })}
                                  </div>
                                ) : (
                                  <div className="ml-8 text-xs text-muted-foreground">
                                    No milestones yet.{" "}
                                    <button
                                      className="underline cursor-pointer"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setCreateMode("milestone");
                                        setFormProjectId(project.id);
                                        setIsCreateOpen(true);
                                      }}
                                    >
                                      Add one
                                    </button>
                                  </div>
                                )}

                                {/* Latest review for this project */}
                                {(() => {
                                  const projectReviews = reviews
                                    .filter((r) => r.projectId === project.id)
                                    .sort(
                                      (a, b) =>
                                        b.createdAt.getTime() -
                                        a.createdAt.getTime()
                                    );
                                  if (projectReviews.length === 0) return null;
                                  const latest = projectReviews[0];
                                  return (
                                    <div className="ml-8 mt-2 p-2 rounded-md bg-muted/30 text-xs space-y-1.5">
                                      <p className="font-medium text-muted-foreground flex items-center gap-1">
                                        <ClipboardList className="w-3 h-3" />
                                        Last review —{" "}
                                        {format(
                                          latest.createdAt,
                                          "MMM d"
                                        )}
                                      </p>
                                      {latest.progressNote && (
                                        <p>
                                          <span className="text-muted-foreground">
                                            Progress:{" "}
                                          </span>
                                          {latest.progressNote}
                                        </p>
                                      )}
                                      {latest.blockers && (
                                        <p>
                                          <span className="text-muted-foreground">
                                            Blockers:{" "}
                                          </span>
                                          {latest.blockers}
                                        </p>
                                      )}
                                      {latest.nextActions && (
                                        <p>
                                          <span className="text-muted-foreground">
                                            Next:{" "}
                                          </span>
                                          {latest.nextActions}
                                        </p>
                                      )}
                                    </div>
                                  );
                                })()}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Standalone Milestones */}
              {standaloneMilestones.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Flag className="w-4 h-4 text-purple-500" />
                      Unlinked Milestones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {standaloneMilestones
                        .sort(
                          (a, b) =>
                            a.targetDate.getTime() - b.targetDate.getTime()
                        )
                        .map((ms) => {
                          const isOverdue =
                            !ms.completed &&
                            isPast(ms.targetDate) &&
                            !isSameDay(ms.targetDate, new Date());
                          return (
                            <div
                              key={ms.id}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                              onClick={() =>
                                toggleMilestoneComplete(ms.id)
                              }
                            >
                              {ms.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                              ) : (
                                <Circle
                                  className={cn(
                                    "w-4 h-4 shrink-0",
                                    isOverdue
                                      ? "text-red-400"
                                      : "text-muted-foreground"
                                  )}
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <p
                                  className={cn(
                                    "text-sm font-medium truncate",
                                    ms.completed &&
                                      "line-through text-muted-foreground"
                                  )}
                                >
                                  {ms.title}
                                </p>
                                <p
                                  className={cn(
                                    "text-xs",
                                    isOverdue
                                      ? "text-red-500"
                                      : "text-muted-foreground"
                                  )}
                                >
                                  {format(ms.targetDate, "MMM d")}
                                  {ms.successMeasure && (
                                    <> · {ms.successMeasure}</>
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

              {/* Overdue alert */}
              {overdueMilestones.length > 0 && (
                <Card className="border-red-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base text-red-600">
                      <AlertTriangle className="w-4 h-4" />
                      Overdue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {overdueMilestones.map((ms) => {
                        const daysOver = differenceInDays(
                          new Date(),
                          ms.targetDate
                        );
                        const projName = ms.projectId
                          ? projects.find((p) => p.id === ms.projectId)
                              ?.title
                          : null;
                        return (
                          <div
                            key={ms.id}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-50/50 transition-colors cursor-pointer"
                            onClick={() =>
                              toggleMilestoneComplete(ms.id)
                            }
                          >
                            <Circle className="w-4 h-4 text-red-400 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {ms.title}
                              </p>
                              <p className="text-xs text-red-500">
                                {daysOver} day{daysOver !== 1 ? "s" : ""} overdue
                                {projName && (
                                  <>
                                    {" "}
                                    ·{" "}
                                    <span className="text-muted-foreground">
                                      {projName}
                                    </span>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}