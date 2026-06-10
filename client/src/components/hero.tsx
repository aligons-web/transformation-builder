import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";

// Images
import slide1Bg from "@assets/slider1_1781059489395.jpg";
import slide2Bg from "@assets/slider2_1781059489396.jpg";
import slide3Bg from "@assets/slider3_1781059489396.jpg";
import slide4Bg from "@assets/slider4_1781059489396.jpg";
import slide5Bg from "@assets/slider5_1781059489396.jpg";

const slides = [
  {
    id: 1,
    bg: slide1Bg,
    text: <>Success didn't fix the<br/><span className="text-[#D4A843]">emptiness</span> you can't explain.</>,
    subtext: <>"<span className="text-[#f0d68a]">48% of workers say their work lacks clear purpose.</span>" (Indeed)</>,
  },
  {
    id: 2,
    bg: slide2Bg,
    text: <>You climbed the ladder<br/>leaning against the <span className="text-[#D4A843]">wrong wall.</span></>,
    subtext: <>"<span className="text-[#f0d68a]">82% of workers over age 45 are successful in making<br/>a career transition once they pursue it.</span>" (AIER)</>,
  },
  {
    id: 3,
    bg: slide3Bg,
    text: <>Your life looks good to everyone else,<br/>but it <span className="text-[#D4A843]">doesn't feel right</span> to you.</>,
    subtext: <>"<span className="text-[#f0d68a]">Up to 91% of people experience 'purpose anxiety'.</span>"<br/>(Psychology Today)</>,
  },
  {
    id: 4,
    bg: slide4Bg,
    text: <>While feeling unfulfilled,<br/>you're not lost— you're <span className="text-[#D4A843]">misaligned.</span></>,
    subtext: <span className="border-l-2 border-[#D4A843] pl-4 block mt-2">The Transformation Builder app connects clarity, planning,<br/>action, feedback, and accountability.</span>,
  },
  {
    id: 5,
    bg: slide5Bg,
    text: <>Start your journey now with<br/><span className="text-[#D4A843]">perspective, passion, and purpose!</span></>,
    hasButton: true,
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // 10 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-[190px] overflow-hidden bg-black mt-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Background Image */}
          <img
            src={slides[currentSlide].bg}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-full object-cover object-right"
          />
          
          {/* Overlay to hide the baked-in text from the images so our HTML text shows cleanly */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E13] via-[#0B0E13]/90 to-transparent w-[70%]" />

          {/* Content Container */}
          <div className="absolute inset-0 flex items-center justify-start p-4 pl-12 md:pl-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15, // "quick horizontal bouncy motion"
                  delay: 0.5 
                } 
              }}
              className="max-w-2xl text-left"
            >
              <h2 className="text-xl md:text-2xl font-heading font-bold text-white leading-tight mb-2">
                {slides[currentSlide].text}
              </h2>
              
              {slides[currentSlide].subtext && (
                <p 
                  className="text-sm md:text-base font-medium text-[#f0d68a] mb-2"
                >
                  {slides[currentSlide].subtext}
                </p>
              )}

              {slides[currentSlide].hasButton && (
                <Link href="/signup">
                  <Button 
                    size="sm" 
                    className="text-sm px-4 py-2 font-bold text-white shadow-xl hover:scale-105 transition-transform mt-2 cursor-pointer rounded-full"
                    style={{ backgroundColor: "#f2805a" }}
                  >
                    Start Free — Create Your Account!
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" style={{ color: "#f2805a" }} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" style={{ color: "#f2805a" }} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? "bg-[#f2805a] w-6" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
