import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Users, TrendingUp, DollarSign, Activity, ShoppingCart, Book, Globe, Smartphone, Clock, Award, Briefcase, UserCheck, Search, Bell, Menu, PlayCircle, PauseCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Footer } from "@/components/footer";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      {/* Top Header/Navigation - Matches the "Donezo" top bar style */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
             <a className="flex items-center gap-2 md:hidden">
               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                 <Activity className="w-5 h-5 text-primary-foreground" />
               </div>
             </a>
          </Link>
          <h1 className="text-xl font-heading font-bold hidden md:block">Admin Dashboard</h1>
        </div>
        
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
             <Input placeholder="Search task" className="pl-10 bg-gray-50 border-gray-200 rounded-full focus-visible:ring-primary/20" />
             <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <span className="text-xs text-muted-foreground bg-white border px-1.5 py-0.5 rounded shadow-sm">⌘ F</span>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-4">
           <Button variant="ghost" size="icon" className="rounded-full relative">
             <Bell className="w-5 h-5 text-gray-500" />
             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
           </Button>
           <div className="flex items-center gap-3 pl-4 border-l">
              <div className="text-right hidden md:block">
                 <p className="text-sm font-medium">Admin User</p>
                 <p className="text-xs text-muted-foreground">admin@life-transform.com</p>
              </div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
           </div>
        </div>
      </div>

      <div className="flex pt-16 h-[calc(100vh-64px)]">
        {/* Sidebar - Hidden on mobile, fixed width on desktop */}
        <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col p-6 overflow-y-auto">
            <div className="mb-8">
                <Link href="/">
                    <Button variant="ghost" className="gap-2 pl-0 hover:pl-2 transition-all w-full justify-start text-muted-foreground">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Site
                    </Button>
                </Link>
            </div>
            
            <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">Menu</p>
                <Button variant="ghost" className="w-full justify-start gap-3 bg-primary/10 text-primary font-medium">
                    <Activity className="w-5 h-5" />
                    Dashboard
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
                    <Users className="w-5 h-5" />
                    Users
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
                    <DollarSign className="w-5 h-5" />
                    Sales
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
                    <Award className="w-5 h-5" />
                    Partners
                </Button>
            </div>

             <div className="mt-auto pt-8">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">General</p>
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
                    <Globe className="w-5 h-5" />
                    Website
                </Button>
             </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50/50">
           <div className="max-w-7xl mx-auto space-y-8">
               
               <div className="flex items-center justify-between">
                   <div>
                       <h2 className="text-2xl font-bold font-heading">Dashboard</h2>
                       <p className="text-muted-foreground">Plan, prioritize, and accomplish your tasks with ease.</p>
                   </div>
                   <div className="flex gap-3">
                       <Button className="rounded-full shadow-lg shadow-primary/20 bg-teal-600 hover:bg-teal-700 border-none">
                           + Add Report
                       </Button>
                       <Button variant="outline" className="rounded-full bg-white">
                           Import Data
                       </Button>
                   </div>
               </div>

               {/* Top Cards Row - "Donezo" Style */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                   {/* Card 1: Primary Dark Green/Teal */}
                   <Card className="bg-teal-900 text-white border-none shadow-xl relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500"></div>
                       <CardContent className="p-6 relative z-10">
                           <div className="flex justify-between items-start mb-4">
                               <p className="font-medium text-teal-100">Total Users</p>
                               <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm">
                                   <TrendingUp className="w-4 h-4 text-white" />
                               </div>
                           </div>
                           <h3 className="text-4xl font-bold mb-2">1,234</h3>
                           <div className="flex items-center gap-2 text-sm text-teal-200 bg-white/10 w-fit px-2 py-1 rounded-lg">
                               <span className="bg-white/20 px-1 rounded text-white text-xs">+12%</span>
                               <span>Increased from last month</span>
                           </div>
                       </CardContent>
                   </Card>

                   {/* Card 2: White */}
                   <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                       <CardContent className="p-6">
                           <div className="flex justify-between items-start mb-4">
                               <p className="font-medium text-muted-foreground">Revenue</p>
                               <div className="bg-gray-100 p-2 rounded-full">
                                   <DollarSign className="w-4 h-4 text-gray-600" />
                               </div>
                           </div>
                           <h3 className="text-4xl font-bold mb-2 text-foreground">$12.3k</h3>
                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
                               <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-medium">+18%</span>
                               <span>Increased from last month</span>
                           </div>
                       </CardContent>
                   </Card>

                   {/* Card 3: White */}
                   <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                       <CardContent className="p-6">
                           <div className="flex justify-between items-start mb-4">
                               <p className="font-medium text-muted-foreground">Active Subs</p>
                               <div className="bg-gray-100 p-2 rounded-full">
                                   <Activity className="w-4 h-4 text-gray-600" />
                               </div>
                           </div>
                           <h3 className="text-4xl font-bold mb-2 text-foreground">845</h3>
                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
                               <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-medium">+5%</span>
                               <span>Increased from last month</span>
                           </div>
                       </CardContent>
                   </Card>

                   {/* Card 4: White */}
                   <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                       <CardContent className="p-6">
                           <div className="flex justify-between items-start mb-4">
                               <p className="font-medium text-muted-foreground">Implementors</p>
                               <div className="bg-gray-100 p-2 rounded-full">
                                   <Briefcase className="w-4 h-4 text-gray-600" />
                               </div>
                           </div>
                           <h3 className="text-4xl font-bold mb-2 text-foreground">35</h3>
                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
                               <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded text-xs font-medium">Stable</span>
                               <span>Active visionaries</span>
                           </div>
                       </CardContent>
                   </Card>
               </div>

               {/* Middle Section: Analytics & Lists */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   {/* Main Analytics Chart - Replaces "Project Analytics" */}
                   <Card className="lg:col-span-2 border-none shadow-sm">
                       <CardHeader className="flex flex-row items-center justify-between pb-2">
                           <div>
                               <CardTitle className="text-lg">Website & Sales Activity</CardTitle>
                           </div>
                           <div className="flex gap-2">
                               <div className="w-8 h-8 rounded-full bg-teal-900 flex items-center justify-center text-white text-xs">W</div>
                               <div className="w-8 h-8 rounded-full border flex items-center justify-center text-muted-foreground text-xs">M</div>
                           </div>
                       </CardHeader>
                       <CardContent>
                           <div className="h-[250px] w-full flex items-end gap-2 pt-4">
                               {[65, 45, 75, 55, 80, 70, 90].map((h, i) => (
                                   <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                                       <div className="relative w-full max-w-[40px] h-[200px] bg-gray-100 rounded-xl overflow-hidden">
                                           <div 
                                               className="absolute bottom-0 left-0 right-0 bg-teal-900 rounded-xl transition-all duration-500 group-hover:bg-teal-700"
                                               style={{ height: `${h}%` }}
                                           ></div>
                                           <div 
                                               className="absolute bottom-0 left-0 right-0 bg-teal-400/30 rounded-xl mb-1 mx-1"
                                               style={{ height: `${h * 0.4}%` }}
                                           ></div>
                                       </div>
                                       <span className="text-xs text-muted-foreground font-medium">
                                           {['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}
                                       </span>
                                   </div>
                               ))}
                           </div>
                       </CardContent>
                   </Card>

                   {/* Right Column: Reminders/Projects Style */}
                   <div className="space-y-6">
                       <Card className="border-none shadow-sm">
                           <CardHeader className="pb-2">
                               <div className="flex justify-between items-center">
                                   <CardTitle className="text-lg">Sales Breakdown</CardTitle>
                                   <Button variant="outline" size="sm" className="h-7 text-xs rounded-full">+ New</Button>
                               </div>
                           </CardHeader>
                           <CardContent>
                               <div className="space-y-4">
                                   <div className="flex items-start gap-3">
                                       <div className="p-2 bg-orange-100 rounded-lg text-orange-600 mt-0.5">
                                           <Book className="w-4 h-4" />
                                       </div>
                                       <div>
                                           <p className="font-semibold text-sm">Amazon UYP Book</p>
                                           <p className="text-xs text-muted-foreground">452 Purchases</p>
                                       </div>
                                   </div>
                                   <div className="flex items-start gap-3">
                                       <div className="p-2 bg-teal-100 rounded-lg text-teal-600 mt-0.5">
                                           <Book className="w-4 h-4" />
                                       </div>
                                       <div>
                                           <p className="font-semibold text-sm">LIFE Transform Book</p>
                                           <p className="text-xs text-muted-foreground">318 Purchases</p>
                                       </div>
                                   </div>
                                   <div className="flex items-start gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mt-0.5">
                                           <UserCheck className="w-4 h-4" />
                                       </div>
                                       <div>
                                           <p className="font-semibold text-sm">Trial Subs</p>
                                           <p className="text-xs text-muted-foreground">128 Active</p>
                                       </div>
                                   </div>
                               </div>
                               <Button className="w-full mt-4 bg-teal-900 hover:bg-teal-800 rounded-lg h-9 text-sm">
                                   View All Sales
                               </Button>
                           </CardContent>
                       </Card>
                   </div>
               </div>

               {/* Bottom Row */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {/* Plan Distribution - Replaces "Team Collaboration" */}
                   <Card className="border-none shadow-sm">
                       <CardHeader className="flex flex-row items-center justify-between pb-2">
                           <CardTitle className="text-lg">Plan Distribution</CardTitle>
                           <Button variant="outline" size="sm" className="h-7 rounded-full text-xs">+ Invite</Button>
                       </CardHeader>
                       <CardContent>
                           <div className="space-y-4">
                               <div className="flex items-center justify-between">
                                   <div className="flex items-center gap-3">
                                       <Avatar className="h-8 w-8 bg-blue-100 text-blue-600 border-none">
                                           <AvatarFallback>EX</AvatarFallback>
                                       </Avatar>
                                       <div>
                                           <p className="text-sm font-medium">Explorer</p>
                                           <p className="text-xs text-muted-foreground">Basic Tier</p>
                                       </div>
                                   </div>
                                   <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-full">524</span>
                               </div>
                               <div className="flex items-center justify-between">
                                   <div className="flex items-center gap-3">
                                       <Avatar className="h-8 w-8 bg-teal-100 text-teal-600 border-none">
                                           <AvatarFallback>TR</AvatarFallback>
                                       </Avatar>
                                       <div>
                                           <p className="text-sm font-medium">Transformer</p>
                                           <p className="text-xs text-muted-foreground">Pro Tier</p>
                                       </div>
                                   </div>
                                   <span className="text-xs font-medium bg-teal-50 text-teal-600 px-2 py-1 rounded-full">286</span>
                               </div>
                               <div className="flex items-center justify-between">
                                   <div className="flex items-center gap-3">
                                       <Avatar className="h-8 w-8 bg-purple-100 text-purple-600 border-none">
                                            <AvatarFallback>IM</AvatarFallback>
                                       </Avatar>
                                       <div>
                                           <p className="text-sm font-medium">Implementor</p>
                                           <p className="text-xs text-muted-foreground">VIP Tier</p>
                                       </div>
                                   </div>
                                   <span className="text-xs font-medium bg-purple-50 text-purple-600 px-2 py-1 rounded-full">35</span>
                               </div>
                           </div>
                       </CardContent>
                   </Card>

                   {/* Completion Gauge - Replaces "Project Progress" */}
                   <Card className="border-none shadow-sm">
                       <CardHeader>
                           <CardTitle className="text-lg">Completion Rate</CardTitle>
                       </CardHeader>
                       <CardContent className="flex flex-col items-center justify-center pt-2">
                           <div className="relative w-40 h-20 overflow-hidden mb-4">
                               <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[12px] border-gray-100"></div>
                               <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-[12px] border-teal-600 border-t-transparent border-r-transparent -rotate-45 transform origin-center"></div>
                           </div>
                           <h3 className="text-4xl font-bold mb-1">42%</h3>
                           <p className="text-xs text-muted-foreground">Modules Completed</p>
                           
                           <div className="flex gap-4 mt-6 w-full justify-center">
                               <div className="flex items-center gap-2">
                                   <div className="w-2 h-2 rounded-full bg-teal-600"></div>
                                   <span className="text-xs text-muted-foreground">Completed</span>
                               </div>
                               <div className="flex items-center gap-2">
                                   <div className="w-2 h-2 rounded-full bg-teal-600/30"></div>
                                   <span className="text-xs text-muted-foreground">In Progress</span>
                               </div>
                           </div>
                       </CardContent>
                   </Card>

                   {/* Time Tracker - Replaces "Time Tracker" */}
                   <Card className="bg-teal-950 text-white border-none shadow-xl relative overflow-hidden">
                       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
                       <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl"></div>
                       <CardHeader>
                           <CardTitle className="text-lg text-teal-100">Avg. Time on Site</CardTitle>
                       </CardHeader>
                       <CardContent>
                           <h3 className="text-4xl font-mono font-bold mb-6 tracking-wider">04:12:08</h3>
                           <div className="flex items-center gap-4">
                               <Button size="icon" className="rounded-full bg-white text-teal-900 hover:bg-gray-100 h-10 w-10">
                                   <PauseCircle className="w-6 h-6 fill-current" />
                               </Button>
                               <Button size="icon" variant="outline" className="rounded-full border-teal-800 text-teal-100 hover:bg-teal-900 h-10 w-10">
                                   <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                               </Button>
                           </div>
                       </CardContent>
                   </Card>
               </div>
               
               {/* Website Traffic & Devices - Extra Section matching bottom row style */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <Card className="border-none shadow-sm">
                       <CardHeader>
                           <CardTitle className="text-lg">Visitor Locations</CardTitle>
                       </CardHeader>
                       <CardContent>
                           <div className="space-y-4">
                               <div className="flex items-center justify-between text-sm">
                                   <div className="flex items-center gap-2">
                                       <span className="w-6 text-xl">🇺🇸</span>
                                       <span>United States</span>
                                   </div>
                                   <Progress value={65} className="w-24 h-2" />
                               </div>
                               <div className="flex items-center justify-between text-sm">
                                   <div className="flex items-center gap-2">
                                       <span className="w-6 text-xl">🇬🇧</span>
                                       <span>United Kingdom</span>
                                   </div>
                                   <Progress value={15} className="w-24 h-2" />
                               </div>
                               <div className="flex items-center justify-between text-sm">
                                   <div className="flex items-center gap-2">
                                       <span className="w-6 text-xl">🇨🇦</span>
                                       <span>Canada</span>
                                   </div>
                                   <Progress value={10} className="w-24 h-2" />
                               </div>
                           </div>
                       </CardContent>
                   </Card>
                   
                   <Card className="border-none shadow-sm">
                        <CardHeader>
                           <CardTitle className="text-lg">Devices Used</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="grid grid-cols-3 gap-2 text-center">
                                 <div className="p-3 bg-gray-50 rounded-xl">
                                     <Smartphone className="w-6 h-6 mx-auto mb-2 text-primary" />
                                     <span className="block text-xl font-bold">58%</span>
                                     <span className="text-xs text-muted-foreground">Mobile</span>
                                 </div>
                                 <div className="p-3 bg-gray-50 rounded-xl">
                                     <Globe className="w-6 h-6 mx-auto mb-2 text-primary" />
                                     <span className="block text-xl font-bold">35%</span>
                                     <span className="text-xs text-muted-foreground">Desktop</span>
                                 </div>
                                 <div className="p-3 bg-gray-50 rounded-xl">
                                     <Activity className="w-6 h-6 mx-auto mb-2 text-primary" />
                                     <span className="block text-xl font-bold">7%</span>
                                     <span className="text-xs text-muted-foreground">Tablet</span>
                                 </div>
                             </div>
                        </CardContent>
                   </Card>
               </div>
           </div>
           <Footer />
        </main>
      </div>
    </div>
  );
}