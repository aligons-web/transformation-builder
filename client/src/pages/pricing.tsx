import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
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
              <CardTitle className="text-2xl font-heading">Explorer</CardTitle>
              <CardDescription>For those just starting their discovery.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-3xl font-bold mb-6">$29<span className="text-sm font-normal text-muted-foreground">/one-time</span></div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Access to 9 Discovery Modules</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Basic Journaling</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Standard Email Support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Get Started</Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="flex flex-col border-primary/20 shadow-lg relative bg-primary/5">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              POPULAR
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Transformer</CardTitle>
              <CardDescription>Complete toolkit for life change.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-3xl font-bold mb-6">$99<span className="text-sm font-normal text-muted-foreground">/year</span></div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm">All Discovery Modules</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm">AI-Powered Analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Career Path Generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Goal & Task Tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Priority Support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Start Transformation</Button>
            </CardFooter>
          </Card>

          {/* Enterprise/Network Plan */}
          <Card className="flex flex-col border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Implementor</CardTitle>
              <CardDescription>For coaches and community leaders.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-3xl font-bold mb-6">$299<span className="text-sm font-normal text-muted-foreground">/year</span></div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Everything in Transformer</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Admin Dashboard Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Group Analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">White-label Options</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}