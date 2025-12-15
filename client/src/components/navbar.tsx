import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import logo from "@assets/webapplogo3_1765811527974.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-2" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/">
          <a className="hover:opacity-90 transition-opacity block flex items-center">
            <img 
              src={logo} 
              alt="LIFE Transformation" 
              className="h-auto w-auto object-contain max-h-[100px]" 
            />
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about">
            <a className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">
              About
            </a>
          </Link>
          <Link href="/pricing">
            <a className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">
              Pricing
            </a>
          </Link>
          <a 
            href="https://www.skool.com/life-transformation-network-2320" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors"
          >
            Join LTN
          </a>
          <Link href="/affiliate-program">
            <a className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">
              Affiliate Program
            </a>
          </Link>
          <Link href="/founders-program">
            <a className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">
              Founder's Program
            </a>
          </Link>
          <div className="flex items-center gap-4 ml-4">
            <Link href="/signup">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                Start Journey
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-10">
                <Link href="/about">
                  <a className="text-lg font-bold hover:text-primary transition-colors">
                    About
                  </a>
                </Link>
                <Link href="/pricing">
                  <a className="text-lg font-bold hover:text-primary transition-colors">
                    Pricing
                  </a>
                </Link>
                <a 
                  href="https://www.skool.com/life-transformation-network-2320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold hover:text-primary transition-colors"
                >
                  Join LTN
                </a>
                <Link href="/affiliate-program">
                  <a className="text-lg font-bold hover:text-primary transition-colors">
                    Affiliate Program
                  </a>
                </Link>
                <Link href="/founders-program">
                  <a className="text-lg font-bold hover:text-primary transition-colors">
                    Founder's Program
                  </a>
                </Link>
                <hr className="border-border" />
                <Link href="/signup">
                  <Button className="w-full justify-start bg-primary">
                    Start Journey
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}