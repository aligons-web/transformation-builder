import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Users, TrendingUp, DollarSign, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 pl-0 hover:pl-2 transition-all">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium border border-primary/20">
            Admin Access Only
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mb-8">
            Overview of platform performance and user engagement.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">845</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,345</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42%</div>
                <p className="text-xs text-muted-foreground">Modules completed</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
             <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-4 text-sm">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <div className="flex-1">
                                    <span className="font-medium">User #{1000 + i}</span> completed Module {i}
                                </div>
                                <div className="text-muted-foreground text-xs">2h ago</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
             </Card>
             <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span>API Status</span>
                            <span className="text-green-600 font-medium">Operational</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span>Database</span>
                            <span className="text-green-600 font-medium">Operational</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span>AI Services</span>
                            <span className="text-green-600 font-medium">Operational</span>
                        </div>
                         <div className="flex items-center justify-between text-sm">
                            <span>Storage</span>
                            <span className="text-yellow-600 font-medium">Warning (85%)</span>
                        </div>
                    </div>
                </CardContent>
             </Card>
          </div>
        </div>
      </main>
    </div>
  );
}