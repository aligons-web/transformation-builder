import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardSidebar } from "./dashboard-sidebar";
import dashboardHeaderImage from "@assets/dashboardenhanced_1771088576959.jpg";

export function DashboardHeader() {
  return (
    <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6">
      <div className="flex items-center gap-4 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <DashboardSidebar />
          </SheetContent>
        </Sheet>
        <span className="font-heading font-bold text-lg">Transformation BUILDER</span>
      </div>

      <div className="hidden md:flex items-center flex-1 max-w-2xl mx-4">
        <img 
          src={dashboardHeaderImage} 
          alt="Dashboard Indicators" 
          className="w-full h-12 object-cover rounded-lg shadow-sm opacity-90 hover:opacity-100 transition-opacity"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
        </Button>
      </div>
    </header>
  );
}