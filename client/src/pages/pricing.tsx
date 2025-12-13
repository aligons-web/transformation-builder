import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/footer";

export default function PricingPage() {
  const explorerPlanUrl = "https://buy.stripe.com/test_4gMdRadRVd1VcY6duCes000";

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12 flex-1">
        <Link href="/">
          <Button variant="ghost" className="gap-2 mb-8 pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Pricing Plans
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the path that fits your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <Card className="flex flex-col border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Explorer Plan</CardTitle>
              <CardDescription>For those just starting their discovery.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-3xl font-bold mb-6">$29<span className="text-sm font-normal text-muted-foreground">/month</span></div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Step 1 Discover Purpose</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Tasks to Goals</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Change Analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Skills to Build Insights</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" asChild>
                <a href={explorerPlanUrl} target="_blank" rel="noopener noreferrer">Start Exploration</a>
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="flex flex-col border-primary/20 shadow-lg relative bg-primary/5">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              POPULAR
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Transformer Plan</CardTitle>
              <CardDescription>For those in purpose and change.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-3xl font-bold mb-6">$39<span className="text-sm font-normal text-muted-foreground">/month</span></div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Step 1 Discover Purpose</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Tasks to Goals</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Skills to Build Insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Step 2 Analyze Change</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Change Analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Journey Insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Clarify Focus</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Community Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm">An Accountability Zoom Session per Month (1-hour)</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">Start Transformation</a>
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise/Network Plan */}
          <Card className="flex flex-col border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Implementer Plan</CardTitle>
              <CardDescription>For leaders and managers.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-3xl font-bold mb-6">$69<span className="text-sm font-normal text-muted-foreground">/month</span></div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Explorer Plan</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Transformer Plan</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Final Blueprint</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Milestones to Projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Community Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Access to Replays</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">2 Accountability Zoom Sessions per Month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">1 Skills Development Session and 1 Business Development Session (1 hour each)</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">Start Implementation</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}