import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Benefits } from "@/components/benefits";
import { Link } from "wouter";
import { Footer } from "@/components/footer";
import bgImage from "@assets/background_1781062256770.jpg";
import welcomeButtonImage from "@assets/welcombtn_1787424650977.png";

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
          <div className="relative z-10 container mx-auto px-4 pt-12 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-heading font-semibold text-white drop-shadow-lg leading-relaxed mb-4">
                  Sign up now to unlock instant access to the first 3 modules at no cost.
                </h2>
                <p className="text-lg text-white/90 drop-shadow-md leading-relaxed">
                  When you're ready to go deeper, upgrade to the Transformer or Implementer Plan for full access to advanced tools, resources, and community support. <span className="font-semibold text-white">An onboarding video coming soon!</span>
                </p>
              </div>
              <a
                href="https://youtu.be/oeUjmyO8cV0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch the Transformation Builder welcome video"
                className="block w-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <img
                  src={welcomeButtonImage}
                  alt="Transformation Builder welcome video"
                  className="block w-full h-[150px] object-cover"
                />
              </a>
            </div>
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