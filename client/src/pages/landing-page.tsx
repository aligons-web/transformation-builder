import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Benefits } from "@/components/benefits";
import { Link } from "wouter";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 relative overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        
        <div className="container mx-auto px-4 pt-12 pb-4 text-center max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground leading-relaxed mb-4">
            Sign up now to unlock instant access to the first 3 modules at no cost.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            When you're ready to go deeper, upgrade to Transformer or Implementer plan for full access to advanced tools, resources community support.
          </p>
        </div>

        <Benefits />
      </main>
      <Footer />
    </div>
  );
}