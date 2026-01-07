import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";

// Images
import slide1Bg from "@assets/image1_1766715734865.jpg";
import slide2Bg from "@assets/image2_1766715734865.jpg";
import slide3Bg from "@assets/image3_1766715734865.jpg";
import slide4Bg from "@assets/image4_1766715734866.jpg";
import slide5Bg from "@assets/image5_1766715734866.jpg";

const slides = [
  {
    id: 1,
    bg: slide1Bg,
    text: "Success didn’t fix the emptiness you can’t explain.",
    subtext: "\"48% of workers say their work lacks clear purpose\" (Indeed)",
  },
  {
    id: 2,
    bg: slide2Bg,
    text: "You climbed the ladder leaning against the wrong wall.",
    subtext: "\"82% of workers over age 45 are successful in making a career transition once they pursue it\" (AIER)",
  },
  {
    id: 3,
    bg: slide3Bg,
    text: "Your life looks good to everyone else, but it doesn’t feel right to you.",
    subtext: "\"Up to 91% of people experience 'purpose anxiety'” (Psychology Today)",
  },
  {
    id: 4,
    bg: slide4Bg,
    text: "While feeling unfulfilled, you’re not lost—you’re misaligned.",
    subtext: "The Transformation Builder app connects clarity, planning, action, feedback, and accountability",
  },
  {
    id: 5,
    bg: slide5Bg,
    text: "Start your journey now with perspective, passion, and purpose!",
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
    <section className="relative w-full h-[90vh] overflow-hidden bg-black">
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
            className="w-full h-full object-cover"
          />
          
          {/* Overlay for readability if needed, though text has its own box */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Content Container */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
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
              className="bg-black/25 backdrop-blur-sm p-8 md:p-12 rounded-lg max-w-4xl text-center shadow-lg"
            >
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight mb-6">
                {slides[currentSlide].text}
              </h2>
              
              {slides[currentSlide].subtext && (
                <p 
                  className="text-2xl md:text-4xl font-bold text-white/90 mb-6 italic"
                  style={{ fontFamily: "Garamond, serif" }}
                >
                  {slides[currentSlide].subtext}
                </p>
              )}

              {slides[currentSlide].hasButton && (
                <Link href="/signup">
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6 font-bold text-white shadow-xl hover:scale-105 transition-transform mt-4"
                    style={{ backgroundColor: "#f2805a" }}
                  >
                    Start Your 5-Day Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
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
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-10 h-10" style={{ color: "#f2805a" }} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-10 h-10" style={{ color: "#f2805a" }} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? "bg-[#f2805a] w-8" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
