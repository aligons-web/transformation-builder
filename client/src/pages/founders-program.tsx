import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/footer";

export default function FoundersProgramPage() {
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
        
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Founder's Program
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Exclusive opportunities for early supporters and visionaries.
          </p>
          
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <p className="text-lg mb-4">Coming Soon</p>
            <p className="text-muted-foreground">
              The Founder's Program details will be announced shortly. Stay tuned for exclusive benefits.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}