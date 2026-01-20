import { useState } from "react";
import { PLANS, type PlanKey } from "@shared/config/plans";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Footer } from "@/components/footer";
import { useUser } from "@/hooks/use-user";
import { useToast } from "@/hooks/use-toast";

export default function PricingPage() {
  const { user, isAuthenticated } = useUser();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  // Check if URL has canceled parameter
  const urlParams = new URLSearchParams(window.location.search);
  const wasCanceled = urlParams.get("canceled") === "true";

  const handleSubscribe = async (planKey: PlanKey) => {
    // If not logged in, redirect to login
    if (!isAuthenticated) {
      toast({
        title: "Please log in first",
        description: "You need to create an account or log in to subscribe.",
      });
      setLocation("/login?redirect=/pricing");
      return;
    }

    setLoadingPlan(planKey);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ planKey }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to start checkout");
      }

      const data = await response.json();

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }

    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        variant: "destructive",
        title: "Checkout failed",
        description: error.message || "Please try again later.",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12 flex-1">
        <Link href="/">
          <Button
            variant="ghost"
            className="gap-2 mb-8 pl-0 hover:pl-2 transition-all"
          >
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

          {/* Show message if checkout was canceled */}
          {wasCanceled && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
              Checkout was canceled. Feel free to try again when you're ready!
            </div>
          )}

          {/* Show current plan if logged in */}
          {user && user.plan !== "EXPLORER" && (
            <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm text-primary">
                You're currently on the <strong>{user.plan}</strong> plan
              </p>
            </div>
          )}
        </div>

        {/* ✅ Pricing cards - Transformer and Implementer only, centered */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-4xl mx-auto">
          {Object.values(PLANS)
            .filter((plan) => plan.key === "transformer" || plan.key === "implementer")
            .map((plan) => {
            const isPopular = plan.key === "transformer";
            const isCurrentPlan = user?.plan?.toLowerCase() === plan.key;
            const isLoading = loadingPlan === plan.key;

            return (
              <Card
                key={plan.key}
                className={[
                  "flex flex-col relative w-full md:w-[380px]",
                  isPopular
                    ? "border-primary/20 shadow-lg bg-primary/5"
                    : "border-border/50 shadow-sm hover:shadow-md transition-shadow",
                  isCurrentPlan ? "ring-2 ring-primary" : "",
                ].join(" ")}
              >
                {isPopular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    POPULAR
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg">
                    CURRENT PLAN
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl font-heading">
                    {plan.name}
                  </CardTitle>
                  <CardDescription>
                    {plan.subtitle}: {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  {/* ✅ Price from config */}
                  <div className="text-3xl font-bold mb-6">
                    {plan.pricing.amount}
                    <span className="text-sm font-normal text-muted-foreground">
                      {plan.pricing.period}
                    </span>
                  </div>

                  {/* ✅ Features from config */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check 
                          className={`w-4 h-4 ${
                            plan.key === "transformer" 
                              ? "text-primary" 
                              : "text-green-500"
                          }`} 
                        />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.key === "transformer" ? "default" : "outline"}
                    onClick={() => handleSubscribe(plan.key)}
                    disabled={isLoading || isCurrentPlan}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : isCurrentPlan ? (
                      "Current Plan"
                    ) : (
                      plan.cta
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}