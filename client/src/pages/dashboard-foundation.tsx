import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  User,
  Shield,
  Heart,
  Sparkles,
  Compass,
  Map,
  Eye,
  Award,
  Briefcase,
  Info,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";

// ---------------------------------------------------------------------------
// Foundation data
// ---------------------------------------------------------------------------

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

const DEFAULT_FOUNDATION: FoundationData = {
  identity: "",
  values: "",
  cause: "",
  calling: "",
  purpose: "",
  mission: "",
  vision: "",
  legacy: "",
  assignment: "",
};

type FoundationKey = keyof FoundationData;

interface FoundationItemConfig {
  key: FoundationKey;
  label: string;
  question: string;
  definition: string;
  timeHorizon: string;
  placeholder: string;
  biblicalName: string;
  biblicalExample: string;
  icon: typeof User;
  color: string;
  bg: string;
}

const FOUNDATION_ITEMS: FoundationItemConfig[] = [
  {
    key: "identity",
    label: "Identity",
    question: "Who am I?",
    definition:
      "The person God created you to become. Identity influences everything else — your values, your calling, how you respond to opportunity and adversity.",
    timeHorizon: "Lifetime",
    placeholder: 'e.g., "I am a servant leader called to equip others."',
    biblicalName: "David",
    biblicalExample:
      "A shepherd boy anointed king because God saw his heart, not his appearance. His identity as a worshipper and warrior shaped every season of his life.",
    icon: User,
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    key: "values",
    label: "Values",
    question: "What principles guide me?",
    definition:
      "The non-negotiable principles that govern your decisions. Values determine how you pursue your purpose — they are the guardrails of your journey.",
    timeHorizon: "Lifetime",
    placeholder: "e.g., Integrity, Faith, Excellence, Compassion, Stewardship",
    biblicalName: "Daniel",
    biblicalExample:
      "Chose integrity over comfort in a foreign empire. He refused to compromise on his values even when it meant the lion's den.",
    icon: Shield,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    key: "cause",
    label: "Cause",
    question: "What burden breaks my heart enough to help solve it?",
    definition:
      "A problem, burden, injustice, or need that deeply moves your heart. A cause is usually bigger than yourself. It motivates. It is emotional.",
    timeHorizon: "Lifetime",
    placeholder: "e.g., Helping people discover their God-given purpose",
    biblicalName: "Nehemiah",
    biblicalExample:
      "Wept when he heard Jerusalem's walls lay in ruins. That heartbreak became the fuel for a 52-day rebuilding project that restored a nation's identity.",
    icon: Heart,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    key: "calling",
    label: "Calling",
    question: "What is God inviting me to do?",
    definition:
      "God's invitation or assignment for your life. Calling often grows over time — it may change in expression but not in essence.",
    timeHorizon: "Lifetime",
    placeholder: "e.g., Teach, equip, and develop transformational leaders",
    biblicalName: "Moses",
    biblicalExample:
      "Called at the burning bush to free God's people from Egypt. His calling felt impossible — he stuttered, he resisted — but God equipped what He called.",
    icon: Sparkles,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    key: "purpose",
    label: "Life Purpose",
    question: "Why was I created?",
    definition:
      "Purpose explains why you exist. It is broader than a career. Purpose rarely changes — it is the constant underneath every season.",
    timeHorizon: "Lifetime",
    placeholder:
      'e.g., "I exist to inspire people to discover God\'s purpose and become transformational leaders."',
    biblicalName: "Esther",
    biblicalExample:
      '"For such a time as this." Esther\'s purpose was not the crown — it was the courage to stand between her people and destruction.',
    icon: Compass,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    key: "mission",
    label: "Life Mission",
    question: "What lifelong work fulfills that purpose?",
    definition:
      "The primary long-term work that fulfills your purpose. Purpose is WHY. Mission is WHAT. Mission is the vehicle. Purpose is the reason.",
    timeHorizon: "Decades",
    placeholder:
      "e.g., Build educational systems, books, coaching, and technology that help people discover purpose",
    biblicalName: "Paul",
    biblicalExample:
      "His mission was to plant churches across the Roman Empire. Every journey, letter, and imprisonment served that single lifelong assignment.",
    icon: Map,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    key: "vision",
    label: "Vision",
    question: "What future am I intentionally building?",
    definition:
      "The future you are intentionally building. Vision paints the destination — it answers what success looks like in concrete, imaginable terms.",
    timeHorizon: "5–20 years",
    placeholder:
      "e.g., A worldwide academy, AI coaching platform, transformation community, and certification programs",
    biblicalName: "Solomon",
    biblicalExample:
      "Envisioned and constructed the Temple — a physical structure that would house God's presence for generations. He saw the finished building before the first stone was laid.",
    icon: Eye,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    key: "legacy",
    label: "Legacy",
    question: "What will remain after I'm gone?",
    definition:
      "What remains after you're gone — the people influenced, organizations built, books written, lives changed, disciples made.",
    timeHorizon: "End of life",
    placeholder:
      "e.g., A generation of purpose-driven leaders, a library of transformational content, a self-sustaining movement",
    biblicalName: "Abraham",
    biblicalExample:
      "Father of nations. He never saw the full promise fulfilled in his lifetime, but his obedience shaped the trajectory of human history.",
    icon: Award,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    key: "assignment",
    label: "Assignment",
    question: "What season-specific responsibility has God given me right now?",
    definition:
      'A specific responsibility God entrusts to you at a particular season of life. Unlike purpose or mission, assignments can change. A person may have one life purpose, one mission, but many assignments throughout life.',
    timeHorizon: "Current season",
    placeholder:
      'e.g., "Build the Transformation Builder platform and launch the first cohort"',
    biblicalName: "Joseph",
    biblicalExample:
      "His assignment shifted from prisoner to governor — but each season served the same purpose: preserve life during famine. The assignment changed; the purpose didn't.",
    icon: Briefcase,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DashboardFoundationPage() {
  const [foundation, setFoundation] = useLocalStorage<FoundationData>(
    "tb-foundation",
    DEFAULT_FOUNDATION
  );
  const [expandedInfo, setExpandedInfo] = useState<Set<FoundationKey>>(
    new Set()
  );
  const [dialogItem, setDialogItem] = useState<FoundationItemConfig | null>(
    null
  );

  function updateField(key: FoundationKey, value: string) {
    setFoundation((prev) => ({ ...prev, [key]: value }));
  }

  function toggleInfo(key: FoundationKey) {
    setExpandedInfo((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const filledCount = FOUNDATION_ITEMS.filter(
    (item) => foundation[item.key].trim().length > 0
  ).length;

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto md:ml-64 p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Life Direction Foundation
              </h1>
              <p className="text-muted-foreground mt-2 leading-relaxed max-w-2xl">
                These nine layers form the foundation beneath every goal, project,
                and task. A task without purpose feels meaningless. A purpose
                without tasks never becomes reality. Start wherever you have
                clarity — you can return to fill in the rest as it becomes clear.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {filledCount} of {FOUNDATION_ITEMS.length} defined —{" "}
                {filledCount === FOUNDATION_ITEMS.length
                  ? "your foundation is set"
                  : "take your time, this is deep work"}
              </p>
            </div>
            
            <Link href="/dashboard/calendar">
              <Button className="shrink-0 gap-2 bg-primary hover:bg-primary/90">
                Go to Calendar <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Foundation Cards */}
          <div className="space-y-4">
            {FOUNDATION_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              const isInfoOpen = expandedInfo.has(item.key);
              const hasContent = foundation[item.key].trim().length > 0;

              return (
                <Card
                  key={item.key}
                  className={cn(
                    "transition-shadow hover:shadow-md",
                    hasContent && "border-l-4",
                    hasContent && item.color.replace("text-", "border-")
                  )}
                >
                  <CardContent className="pt-5 pb-4 space-y-3">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                            item.bg
                          )}
                        >
                          <Icon className={cn("w-5 h-5", item.color)} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground font-medium">
                              {idx + 1}
                            </span>
                            <h3 className="font-semibold text-sm">
                              {item.label}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground italic">
                            {item.question}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 cursor-pointer"
                          onClick={() => setDialogItem(item)}
                          title="See definition and biblical example"
                        >
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 cursor-pointer"
                          onClick={() => toggleInfo(item.key)}
                        >
                          {isInfoOpen ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Info className="w-4 h-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Inline quick definition (expandable) */}
                    {isInfoOpen && (
                      <div
                        className={cn(
                          "rounded-lg p-3 text-sm space-y-2",
                          item.bg
                        )}
                      >
                        <p>{item.definition}</p>
                        <p className="text-xs text-muted-foreground">
                          Time horizon: {item.timeHorizon}
                        </p>
                      </div>
                    )}

                    {/* User input */}
                    <Textarea
                      placeholder={item.placeholder}
                      value={foundation[item.key]}
                      onChange={(e) => updateField(item.key, e.target.value)}
                      rows={2}
                      className="resize-none text-sm"
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Connection reminder */}
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="pt-5 pb-4 flex flex-col items-center text-center text-sm text-muted-foreground space-y-4">
              <div className="space-y-2">
                <p className="font-medium">
                  Identity → Values → Cause → Calling → Purpose → Mission →
                  Vision → Legacy
                </p>
                <p>
                  This foundation feeds into everything on your Transformation
                  Calendar — every project, goal, milestone, and daily habit
                  traces back to the direction you define here.
                </p>
              </div>
              
              <Link href="/dashboard/calendar">
                <Button className="gap-2 bg-primary hover:bg-primary/90 mt-2">
                  Go to Calendar <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Full teaching dialog */}
      <Dialog
        open={dialogItem !== null}
        onOpenChange={(open) => {
          if (!open) setDialogItem(null);
        }}
      >
        {dialogItem && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center",
                    dialogItem.bg
                  )}
                >
                  {(() => {
                    const DIcon = dialogItem.icon;
                    return (
                      <DIcon className={cn("w-5 h-5", dialogItem.color)} />
                    );
                  })()}
                </div>
                {dialogItem.label}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  The Question
                </p>
                <p className="text-base italic">{dialogItem.question}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Definition
                </p>
                <p className="text-sm leading-relaxed">
                  {dialogItem.definition}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Time Horizon
                </p>
                <p className="text-sm">{dialogItem.timeHorizon}</p>
              </div>
              <div className={cn("rounded-lg p-4", dialogItem.bg)}>
                <p className="text-sm font-medium mb-1 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Biblical Example — {dialogItem.biblicalName}
                </p>
                <p className="text-sm leading-relaxed">
                  {dialogItem.biblicalExample}
                </p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}