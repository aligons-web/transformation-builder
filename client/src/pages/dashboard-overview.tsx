import { DashboardSidebar, sidebarItems } from "@/components/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const descriptions: Record<string, string> = {
  "Overview": "This dashboard guide and sitemap. View a brief explanation of each feature available in your workspace.",
  "Journal": "Your personal space for reflection. Answer guided prompts about your solitude, resonation, and inspiration.",
  "Tasks to Goals": "A focused view for managing your daily tasks and connecting them to your longer-term goals.",
  "Milestones to Projects": "High-level planning tool for tracking major milestones and organizing complex projects.",
  "Skills to Build": "Review the skills identified for your transformation and access career path suggestions.",
  "Change Analysis": "AI-driven analysis of your journal entries to detect patterns and transformation progress.",
  "Clarify Focus": "Define actionable steps, map your skills, and create a concrete plan for your future.",
  "Journey Insights": "Deep dive into your transformation journey with AI-generated insights and spiritual connections.",
  "Final Blueprint": "Your comprehensive transformation document, summarizing your purpose, analysis, and action plan.",
  "Analytics": "Visual metrics tracking your engagement, progress, and time spent on your transformation journey."
};

export default function DashboardOverviewPage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto md:ml-64 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Good Morning, John</h1>
            <p className="text-muted-foreground mt-2">
              Here's your daily overview and transformation progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sidebarItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className="block h-full group">
                  <Card className="h-full border-muted-foreground/20 hover:border-primary/50 transition-all hover:shadow-md cursor-pointer bg-card/50 hover:bg-card">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <item.icon className="w-6 h-6" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {item.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed text-muted-foreground/80">
                        {descriptions[item.label] || "Explore this feature to continue your transformation journey."}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}