import { Button, buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import heroBg from "@assets/backgroundhmpg_1765929083902.jpg";
import targetImage from "@assets/pathtargetlogo_1765576089902.png";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative flex items-center pt-32 pb-0 overflow-hidden min-h-[90vh]">
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
        <div className="flex flex-col items-center gap-12 justify-center text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex justify-center"
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

            <div className="flex justify-center w-full my-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <img 
                  src={targetImage} 
                  alt="Path to focus and clarity" 
                  className="w-full max-w-[14rem] md:max-w-[16rem] lg:max-w-[18rem] object-contain drop-shadow-2xl"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col gap-4 max-w-3xl mx-auto mb-10 text-xl md:text-2xl font-bold text-foreground/90 leading-snug"
            >
              <p>“You did everything you were told—and still feel unfulfilled.”</p>
              <p>“Success didn’t fix the emptiness you can’t explain.”</p>
              <p>“You climbed the ladder only to realize it’s leaning against the wrong wall.”</p>
              <p>“You’re not lost—you’re misaligned.”</p>
              <p>“Your life looks good to everyone else, but it doesn’t feel right to you.”</p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4"
            >
              Start Your Journey Today<br />with <span className="text-primary italic font-serif">Perspective</span><span className="text-primary">,</span> <span className="text-primary italic font-serif">Passion</span><span className="text-primary">,</span> and <span className="text-primary italic font-serif">Purpose</span><span className="text-primary">!</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="text-lg text-foreground/80 font-medium md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              We provide the tools and structure to move from confusion to clarity.
            </motion.p>
          </div>
        </div>
      </div>
      
      {/* Abstract Shapes */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
}