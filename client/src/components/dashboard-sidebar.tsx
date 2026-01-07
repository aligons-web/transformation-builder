import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BookOpen, 
  Target, 
  Flag,
  Lightbulb, 
  BarChart2, 
  LogOut,
  Sparkles,
  Compass,
  Calendar,
  Focus,
  ClipboardCheck,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/use-user";

export const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard/overview" },
  { icon: Compass, label: "Discover Purpose", href: "/discover-purpose" },
  { icon: BookOpen, label: "Journal", href: "/dashboard/journal" },
  { icon: Target, label: "Tasks to Goals", href: "/dashboard/tasks" },
  { icon: Flag, label: "Milestones to Projects", href: "/dashboard/projects" },
  { icon: Lightbulb, label: "Skills to Build", href: "/dashboard/skills" },
  { icon: Sparkles, label: "Change Analysis", href: "/dashboard/analysis" },
  { icon: Focus, label: "Clarify Focus", href: "/actionable-focus" },
  { icon: Lightbulb, label: "Journey Insights", href: "/ai-transformation-engine" },
  { icon: ClipboardCheck, label: "Final Blueprint", href: "/final-summary" },
  { icon: Users, label: "Community", href: "https://www.skool.com/life-transformation-network-2320", external: true },
  { icon: BarChart2, label: "Analytics", href: "/dashboard/analytics" },
];

export function DashboardSidebar() {
  const [location] = useLocation();
  const { user, logout } = useUser();
  const [isTrialExpired, setIsTrialExpired] = useState(false);

  useEffect(() => {
    const trialStart = localStorage.getItem("trialStartDate");
    if (trialStart) {
      const startDate = new Date(trialStart);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - startDate.getTime()); 
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      if (diffDays > 5) {
        setIsTrialExpired(true);
      }
    }
  }, []);

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
  };

  // Step 2 and Step 3 items that should be disabled after trial
  const restrictedPaths = [
    "/dashboard/tasks",
    "/dashboard/projects",
    "/dashboard/skills",
    "/dashboard/analysis",
    "/actionable-focus",
    "/ai-transformation-engine",
    "/final-summary"
  ];

  return (
    <aside className="w-64 border-r border-border/50 bg-card/50 backdrop-blur-xl fixed h-screen flex flex-col z-40 hidden md:flex">
      <div className="p-6 border-b border-border/50">
        <Link href="/">
          <a className="flex flex-col items-start leading-none group">
            <span className="font-heading font-bold text-lg tracking-normal uppercase text-foreground group-hover:text-primary transition-colors">Transformation</span>
            <span className="font-heading font-bold text-2xl tracking-[0.48em] text-primary uppercase mt-[-6px] ml-[2px] group-hover:text-foreground transition-colors">BUILDER</span>
          </a>
        </Link>
      </div>

      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
          Menu
        </div>
        {sidebarItems.map((item) => {
      // ✅ Admin bypass: Admins can access everything
      const isRestricted = !user?.isAdmin && isTrialExpired && restrictedPaths.includes(item.href);
          if ((item as any).external) {
             return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5 text-muted-foreground" />
                {item.label}
              </a>
             );
          }

          if (isRestricted) {
            return (
              <div
                key={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-muted-foreground/50 cursor-not-allowed",
                )}
                title="Trial expired. Upgrade to access."
              >
                <item.icon className="w-5 h-5 text-muted-foreground/50" />
                {item.label}
              </div>
            );
          }

          return (
          <Link key={item.href} href={item.href}>
            <a
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                location === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", location === item.href ? "text-primary" : "text-muted-foreground")} />
              {item.label}
            </a>
          </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 p-2 mb-4 rounded-xl bg-muted/50">
          <Avatar className="w-10 h-10 border border-border">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {user?.username ? getInitials(user.username) : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.username || 'User'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.trial?.active ? `Trial: ${user.trial.daysRemaining} days left` : user?.plan || 'Explorer'}
            </p>
          </div>
        </div>

        <Button 
          variant="ghost" 
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 gap-3 mt-1"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
