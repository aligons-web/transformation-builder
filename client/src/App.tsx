import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "@/hooks/use-user";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import DiscoverPurposePage from "@/pages/discover-purpose";
import LandingPage from "@/pages/landing-page";
import AuthPage from "@/pages/auth-page";
import DashboardPage from "@/pages/dashboard";
import DashboardOverviewPage from "@/pages/dashboard-overview";
import AnalyticsPage from "@/pages/analytics";
import JournalPage from "@/pages/journal";
import DashboardProjectsPage from "@/pages/dashboard-projects";
import DashboardTasksPage from "@/pages/dashboard-tasks";
import SkillsBuildPage from "@/pages/skills-build";
import AiAnalysisPage from "@/pages/ai-analysis";
import FuturePathPage from "@/pages/future-path";
import AiTransformationEnginePage from "@/pages/ai-transformation-engine";
import ActionableFocusPage from "@/pages/actionable-focus";
import CalendarPage from "@/pages/calendar";
import PurposeSummaryPage from "@/pages/purpose-summary";
import PurposeInterpretationPage from "@/pages/purpose-interpretation";
import AboutPage from "@/pages/about";
import AffiliateProgramPage from "@/pages/affiliate-program";
import FoundersProgramPage from "@/pages/founders-program";
import LifeTransformationNetworkPage from "@/pages/life-transformation-network";
import PricingPage from "@/pages/pricing";
import AdminDashboardPage from "@/pages/admin-dashboard";

import FinalSummaryPage from "@/pages/final-summary";

import SubmitTestimonialPage from "@/pages/submit-testimonial";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/discover-purpose" component={DiscoverPurposePage} />
      <Route path="/discover-purpose/summary" component={PurposeSummaryPage} />
      <Route path="/discover-purpose/interpretation" component={PurposeInterpretationPage} />
      <Route path="/login" component={AuthPage} />
      <Route path="/signup" component={AuthPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/submit-testimonial" component={SubmitTestimonialPage} />
      <Route path="/affiliate-program" component={AffiliateProgramPage} />
      <Route path="/founders-program" component={FoundersProgramPage} />
      <Route path="/network" component={LifeTransformationNetworkPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/admin" component={AdminDashboardPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/dashboard/overview" component={DashboardOverviewPage} />
      <Route path="/dashboard/analytics" component={AnalyticsPage} />
      <Route path="/dashboard/journal" component={JournalPage} />
      <Route path="/dashboard/projects" component={DashboardProjectsPage} />
      <Route path="/dashboard/tasks" component={DashboardTasksPage} />
      <Route path="/dashboard/skills" component={SkillsBuildPage} />
      <Route path="/dashboard/analysis" component={AiAnalysisPage} />
      <Route path="/dashboard/future-path" component={FuturePathPage} />
      <Route path="/ai-transformation-engine" component={AiTransformationEnginePage} />
      <Route path="/actionable-focus" component={ActionableFocusPage} />
      <Route path="/final-summary" component={FinalSummaryPage} />
      <Route path="/dashboard/*" component={DashboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;