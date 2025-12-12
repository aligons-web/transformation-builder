import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function LifeTransformationNetworkPage() {
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
        
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            LIFE Transformation Network
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Connect with a community of individuals dedicated to growth and purpose.
          </p>
          
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <p className="text-lg mb-4">Coming Soon</p>
            <p className="text-muted-foreground">
              We are building a network to support your journey. More details coming soon.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}