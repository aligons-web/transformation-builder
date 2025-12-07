import { Navbar } from "@/components/navbar";
import { AiPreview } from "@/components/ai-preview";

export default function AiTransformationEnginePage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 relative overflow-hidden">
      <Navbar />
      <main className="pt-20">
        <AiPreview />
      </main>
      <footer className="bg-muted/30 py-12 border-t border-border/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-4 font-heading font-bold text-xl text-foreground">LIFE Transformation</p>
          <p className="text-sm">© 2024 All rights reserved. Build your future with clarity.</p>
        </div>
      </footer>
    </div>
  );
}