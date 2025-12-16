import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BookOpen, 
  Target, 
  Flag,
  Lightbulb, 
  BarChart2, 
  Settings, 
  LogOut,
  Sparkles,
  Calendar,
  Focus,
  ClipboardCheck,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard/overview" },
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
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@example.com</p>
          </div>
        </div>
        
        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground gap-3">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </Link>
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 gap-3 mt-1">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </Link>
      </div>
    </aside>
  );
}