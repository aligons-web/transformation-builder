import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Benefits } from "@/components/benefits";
import { Link } from "wouter";
import { Footer } from "@/components/footer";
import bgImage from "@assets/background_1781062256770.jpg";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 relative overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        
        <div 
          className="relative bg-cover bg-center bg-fixed bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="relative z-10 container mx-auto px-4 pt-12 pb-4 text-center max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-white drop-shadow-lg leading-relaxed mb-4">
              Sign up now to unlock instant access to the first 3 modules at no cost.
            </h2>
            <p className="text-lg text-white/90 drop-shadow-md leading-relaxed">
              When you're ready to go deeper, upgrade to the Transformer or Implementer Plan for full access to advanced tools, resources, and community support. <span className="font-semibold text-white">An onboarding video coming soon!</span>  
            </p>
          </div>

          <div className="relative z-10">
            <Benefits />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}