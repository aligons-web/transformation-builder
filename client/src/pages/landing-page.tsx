import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Benefits } from "@/components/benefits";
import { AiPreview } from "@/components/ai-preview";
import backgroundImage from "@assets/backgroundtargetimage_1764981253385.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 relative overflow-hidden">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2
        }}
      />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Benefits />
          <AiPreview />
        </main>
        <footer className="bg-muted/30 py-12 border-t border-border/50">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p className="mb-4 font-heading font-bold text-xl text-foreground">LIFE Transformation</p>
            <p className="text-sm">© 2024 All rights reserved. Build your future with clarity.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}