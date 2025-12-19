import { Button, buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import heroBg from "@assets/backgroundhmpg_1765929083902.jpg";
import targetImage from "@assets/pathtargetlogo_1765576089902.png";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative flex items-center pt-24 pb-12 lg:pt-32 lg:pb-0 overflow-hidden min-h-[90vh]">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt="Sunrise background"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text & Quotes */}
          <div className="flex flex-col gap-8 text-left max-w-2xl mx-auto lg:mx-0">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 backdrop-blur-md border border-white/50 shadow-sm mb-6"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground/80">
                  Path to focus and clarity
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-heading font-bold leading-tight tracking-tight text-foreground mb-2"
              >
                Find Focus for Your <br />
                <span className="text-primary italic font-serif">Desired Future</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="space-y-4"
            >
              {[
                "You did everything you were told—and still feel unfulfilled.",
                "Success didn’t fix the emptiness you can’t explain.",
                "You climbed the ladder only to realize it’s leaning against the wrong wall.",
                "You’re not lost—you’re misaligned.",
                "Your life looks good to everyone else, but it doesn’t feel right to you."
              ].map((quote, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-primary" />
                  <p className="text-lg md:text-xl font-bold text-foreground/90 leading-snug">
                    “{quote}”
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="pt-4"
            >
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                Start Your Journey Today with <span className="text-primary italic font-serif">Perspective</span>, <span className="text-primary italic font-serif">Passion</span>, and <span className="text-primary italic font-serif">Purpose</span>!
              </h2>
              
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8 py-6 shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                  Start Your 5-Day Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl -z-10" />
              <img 
                src={targetImage} 
                alt="Path to focus and clarity" 
                className="w-full max-w-md md:max-w-lg object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Abstract Shapes */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
}