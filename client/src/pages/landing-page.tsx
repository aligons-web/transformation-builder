import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Benefits } from "@/components/benefits";
import { Link } from "wouter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 relative overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <Benefits />
      </main>
      <footer className="bg-muted/30 py-12 border-t border-border/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-8 text-sm font-medium">
            <Link href="/affiliate-program">
              <a className="hover:text-primary transition-colors">Affiliate Program</a>
            </Link>
            <Link href="/founders-program">
              <a className="hover:text-primary transition-colors">Founder's Program</a>
            </Link>
            <Link href="/network">
              <a className="hover:text-primary transition-colors">LIFE Transformation Network</a>
            </Link>
          </div>
          <p className="mb-4 font-heading font-bold text-xl text-foreground">LIFE Transformation</p>
          <p className="text-sm">© 2024 All rights reserved. Build your future with clarity.</p>
        </div>
      </footer>
    </div>
  );
}