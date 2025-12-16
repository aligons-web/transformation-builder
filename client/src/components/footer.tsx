import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#D3D3D3] py-12 border-t border-border/50">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8 text-sm font-medium">
          <Link href="/affiliate-program">
            <a className="hover:text-primary transition-colors">Affiliate Program</a>
          </Link>
          <Link href="/founders-program">
            <a className="hover:text-primary transition-colors">Founder's Program</a>
          </Link>
          <Link href="/network">
            <a className="hover:text-primary transition-colors">LIFE Transformation Network</a>
          </Link>
          <Link href="/pricing">
            <a className="hover:text-primary transition-colors">Pricing</a>
          </Link>
          <Link href="/admin">
            <a className="hover:text-primary transition-colors">Admin Dashboard</a>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center mb-4 leading-none">
          <span className="font-heading font-bold text-lg tracking-normal uppercase text-foreground">Transformation</span>
          <span className="font-heading font-bold text-2xl tracking-[0.48em] text-foreground uppercase mt-[-6px] ml-[2px]">BUILDER</span>
        </div>
        <p className="text-sm">© 2024 All rights reserved. Build your future with clarity.</p>
      </div>
    </footer>
  );
}
