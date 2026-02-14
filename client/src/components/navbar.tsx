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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#D3D3D3]",
        scrolled ? "shadow-sm py-2" : "py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-90 transition-opacity block flex items-center">
            <img 
              src={logo} 
              alt="LIFE Transformation" 
              className="h-auto w-auto object-contain max-h-[100px]" 
            />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">
              About
          </Link>
          <Link href="/pricing" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">
              Pricing
          </Link>
          <a 
            href="https://www.skool.com/life-transformation-network-2320" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors flex items-center"
          >
            Join LTN
          </a>
          <Link href="/affiliate-program" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">
              Affiliate Program
          </Link>
          <Link href="/founders-program" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors">
              Join Waiting List 
          </Link>
          <div className="flex items-center gap-4 ml-4">
            <Link href="/signup">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 cursor-pointer">
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
                <Link href="/about" className="text-lg font-bold hover:text-primary transition-colors">
                    About
                </Link>
                <Link href="/pricing" className="text-lg font-bold hover:text-primary transition-colors">
                    Pricing
                </Link>
                <a 
                  href="https://www.skool.com/life-transformation-network-2320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold hover:text-primary transition-colors flex items-center"
                >
                  Join LTN
                </a>
                <Link href="/affiliate-program" className="text-lg font-bold hover:text-primary transition-colors">
                    Affiliate Program
                </Link>
                <Link href="/founders-program" className="text-lg font-bold hover:text-primary transition-colors">
                    Founder's Program
                </Link>
                <hr className="border-border" />
                <Link href="/signup">
                  <Button className="w-full justify-start bg-primary cursor-pointer">
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