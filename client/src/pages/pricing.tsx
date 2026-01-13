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

        {/* ✅ Pricing cards - Transformer and Implementer only, centered */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-4xl mx-auto">
          {Object.values(PLANS)
            .filter((plan) => plan.key === "transformer" || plan.key === "implementer")
            .map((plan) => {
            const isPopular = plan.key === "transformer";

            return (
              <Card
                key={plan.key}
                className={[
                  "flex flex-col relative w-full md:w-[380px]",
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

                  {/* ✅ Features from config - no more hardcoded lists! */}
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
                  {/* ✅ CTA text and Stripe URL from config */}
                  <Button
                    className="w-full"
                    variant={plan.key === "transformer" ? "default" : "outline"}
                    asChild
                  >
                    <a
                      href={plan.pricing.stripeCheckoutUrl}
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
