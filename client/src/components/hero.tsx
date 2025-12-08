import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/abstract_sunrise_gradient_background_for_hero_section.png";

export function Hero() {
  return (
    <section className="relative flex items-center pt-32 pb-0 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt="Sunrise background"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/50 shadow-sm mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground/80">
                Discover your true potential
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-heading font-bold leading-tight tracking-tight text-foreground mb-6"
          >
            Find Focus for Your <br />
            <span className="text-primary italic font-serif">Desired Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-xl text-muted-foreground md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Help college students, recent graduates, unfulfilled professionals, retirees, and veterans find their life purpose through guided journaling, transformation analysis, and actionable skill mapping to navigate and elevate in uncertain times.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link href="/discover-purpose">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-orange-500 hover:bg-orange-600 text-white transition-all hover:scale-105 border-none shadow-none">
                Begin Transformation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-none bg-[#E6D5B8] text-[#5C4033] hover:bg-[#DFC7A0] hover:text-[#3E2723] transition-all shadow-none">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Abstract Shapes */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
}