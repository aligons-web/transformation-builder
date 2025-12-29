import { PLANS, type PlanKey } from "@shared/config/plans";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Footer } from "@/components/footer";

export default function PricingPage() {
  // Stripe Checkout Links (your existing URLs)
  const checkoutUrls: Record<PlanKey, string> = {
    explorer: "https://buy.stripe.com/test_cNi5kE6pt7HB6zI4Y6es003",
    transformer: "https://buy.stripe.com/test_bJe7sMcNRge70bk2PYes001",
    implementer: "https://buy.stripe.com/test_dRmcN64hlge73nw9emes002",
  };

  // Prices (keep here for now; later you can move into plans.ts if you want)
  const prices: Record<PlanKey, { amount: string; period: string }> = {
    explorer: { amount: "$29", period: "/month" },
    transformer: { amount: "$39", period: "/month" },
    implementer: { amount: "$69", period: "/month" },
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
        </div>

        {/* ✅ This is where Object.values(PLANS) belongs */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.values(PLANS).map((plan) => {
            const isPopular = plan.key === "transformer";

            return (
              <Card
                key={plan.key}
                className={[
                  "flex flex-col relative",
                  isPopular
                    ? "border-primary/20 shadow-lg bg-primary/5"
                    : "border-border/50 shadow-sm hover:shadow-md transition-shadow",
                ].join(" ")}
              >
                {isPopular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    POPULAR
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl font-heading">
                    {plan.name}
                  </CardTitle>
                  <CardDescription>
                    {/* Uses shared config messaging */}
                    {plan.subtitle}: {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="text-3xl font-bold mb-6">
                    {prices[plan.key].amount}
                    <span className="text-sm font-normal text-muted-foreground">
                      {prices[plan.key].period}
                    </span>
                  </div>

                  {/* Features list (kept hard-coded per plan for now) */}
                  {plan.key === "explorer" && (
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Step 1 Discover Purpose</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Reflections saved</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Summary generated</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Initial interpretation of purpose</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Community Access</span>
                      </li>
                    </ul>
                  )}

                  {plan.key === "transformer" && (
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm">Includes Step 1 Discover Purpose</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm">Step 2 Analyze Change</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm">Journal</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm">Tasks → Goals</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm">Milestones → Projects</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm">Skills to Build</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm">Change Analysis + Generate Insights</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm">21-Day Transformation Challenge</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm">Community Access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm">
                          Live Zoom or recordings + digital files (Skool)
                        </span>
                      </li>
                    </ul>
                  )}

                  {plan.key === "implementer" && (
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Includes Explorer + Transformer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Generate Insights</span>
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
                        <span className="text-sm">Milestones → Projects</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Community Access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">
                          Two Zoom sessions or recordings + digital files (Skool)
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">
                          Discount access to Masterclass + Inner Circle
                        </span>
                      </li>
                    </ul>
                  )}
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.key === "transformer" ? "default" : "outline"}
                    asChild
                  >
                    <a
                      href={checkoutUrls[plan.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {plan.cta}
                    </a>
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
