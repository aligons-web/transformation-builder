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

const SHOW_PRICING_PLANS = false;

export default function PricingPage() {
  const { user, isAuthenticated } = useUser();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  // Check if URL has canceled parameter
  const urlParams = new URLSearchParams(window.location.search);
  const wasCanceled = urlParams.get("canceled") === "true";

  const handleSubscribe = async (planKey: PlanKey) => {
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
            New year-end pricing will be posted soon. Stay tuned!
          </p>
          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/10 px-6 py-5 text-foreground shadow-sm">
            <p className="text-lg font-semibold">
              Pricing updates will be reflected on 11/3/2026.
            </p>
          </div>

          {SHOW_PRICING_PLANS && wasCanceled && (
            <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
              Checkout was canceled. Feel free to try again when you're ready!
            </div>
          )}

          {SHOW_PRICING_PLANS && user && user.plan !== "EXPLORER" && (
            <div className="mt-4 rounded-lg border border-primary/20 bg-primary/10 p-4">
              <p className="text-sm text-primary">
                You're currently on the <strong>{user.plan}</strong> plan
              </p>
            </div>
          )}
        </div>

        {SHOW_PRICING_PLANS && (
          <div className="mx-auto flex max-w-4xl flex-col items-stretch justify-center gap-8 md:flex-row">
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
                      "relative flex w-full flex-col md:w-[380px]",
                      isPopular
                        ? "border-primary/20 bg-primary/5 shadow-lg"
                        : "border-border/50 shadow-sm transition-shadow hover:shadow-md",
                      isCurrentPlan ? "ring-2 ring-primary" : "",
                    ].join(" ")}
                  >
                    {isPopular && (
                      <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                        POPULAR
                      </div>
                    )}

                    {isCurrentPlan && (
                      <div className="absolute left-0 top-0 rounded-br-lg rounded-tl-lg bg-green-500 px-3 py-1 text-xs font-bold text-white">
                        CURRENT PLAN
                      </div>
                    )}

                    <CardHeader>
                      <CardTitle className="font-heading text-2xl">{plan.name}</CardTitle>
                      <CardDescription>
                        {plan.subtitle}: {plan.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1">
                      <div className="mb-6 text-3xl font-bold">
                        {plan.pricing.amount}
                        <span className="text-sm font-normal text-muted-foreground">
                          {plan.pricing.period}
                        </span>
                      </div>

                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check
                              className={`h-4 w-4 ${
                                plan.key === "transformer" ? "text-primary" : "text-green-500"
                              }`}
                            />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter>
                      <Button
                        className="w-full cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md"
                        variant={plan.key === "transformer" ? "default" : "outline"}
                        onClick={() => handleSubscribe(plan.key)}
                        disabled={isLoading || isCurrentPlan}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
        )}
      </main>

      <Footer />
    </div>
  );
}