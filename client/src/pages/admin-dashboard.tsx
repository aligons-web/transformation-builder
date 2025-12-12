import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Users, TrendingUp, DollarSign, Activity, ShoppingCart, Book, Globe, Smartphone, Clock, Award, Briefcase, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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
        
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mb-8">
            Overview of platform performance, sales, and user engagement.
          </p>
          
          {/* Key Performance Indicators */}
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

          {/* Sales & Products Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Amazon UYP Book Sales</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Book className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">452</div>
                            <p className="text-xs text-muted-foreground">Purchases this month</p>
                        </div>
                    </div>
                </CardContent>
             </Card>
             <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Amazon LIFE Transformation</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-teal-100 rounded-lg">
                            <Book className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">318</div>
                            <p className="text-xs text-muted-foreground">Purchases this month</p>
                        </div>
                    </div>
                </CardContent>
             </Card>
             <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Trial Subscriptions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <UserCheck className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">128</div>
                            <p className="text-xs text-muted-foreground">Active trials (14 days left)</p>
                        </div>
                    </div>
                </CardContent>
             </Card>
          </div>

          {/* Plan Distribution & Partners */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
             <Card>
                <CardHeader>
                    <CardTitle>Plan Distribution</CardTitle>
                    <CardDescription>Breakdown of current user tiers</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium">Explorer ($29)</span>
                                <span className="text-muted-foreground">524 users</span>
                            </div>
                            <Progress value={62} className="h-2 bg-muted" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium">Transformer ($99/yr)</span>
                                <span className="text-muted-foreground">286 users</span>
                            </div>
                            <Progress value={34} className="h-2 bg-primary/20" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium">Implementor ($299/yr)</span>
                                <span className="text-muted-foreground">35 users</span>
                            </div>
                            <Progress value={4} className="h-2 bg-green-100" />
                        </div>
                    </div>
                </CardContent>
             </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Partners & Network</CardTitle>
                    <CardDescription>Growth of our professional community</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col p-4 border rounded-xl bg-card hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                                <Award className="w-4 h-4" />
                                <span className="text-sm font-medium">Affiliates</span>
                            </div>
                            <span className="text-3xl font-bold">42</span>
                            <span className="text-xs text-green-600 mt-1">+3 this week</span>
                        </div>
                        <div className="flex flex-col p-4 border rounded-xl bg-card hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                                <Briefcase className="w-4 h-4" />
                                <span className="text-sm font-medium">Founders</span>
                            </div>
                            <span className="text-3xl font-bold">12</span>
                            <span className="text-xs text-muted-foreground mt-1">Limited spots</span>
                        </div>
                    </div>
                </CardContent>
             </Card>
          </div>

          {/* Website Traffic & Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Website Activity</CardTitle>
                    <CardDescription>Traffic metrics for the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Site Visits</p>
                            <p className="text-2xl font-bold">12,450</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                            <p className="text-2xl font-bold">45,200</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Avg. Time</p>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <p className="text-2xl font-bold">4m 12s</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <Globe className="w-4 h-4" /> 
                            Top Locations
                        </h4>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                            <div className="flex justify-between text-sm items-center">
                                <span>United States</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: '65%' }}></div>
                                    </div>
                                    <span className="w-8 text-right text-muted-foreground">65%</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                                <span>United Kingdom</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: '15%' }}></div>
                                    </div>
                                    <span className="w-8 text-right text-muted-foreground">15%</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                                <span>Canada</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: '10%' }}></div>
                                    </div>
                                    <span className="w-8 text-right text-muted-foreground">10%</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                                <span>Australia</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: '5%' }}></div>
                                    </div>
                                    <span className="w-8 text-right text-muted-foreground">5%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Devices Used</CardTitle>
                    <CardDescription>Platform breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6 flex flex-col justify-center h-full">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-muted rounded-md">
                                    <Smartphone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium">Mobile</p>
                                    <p className="text-xs text-muted-foreground">iOS & Android</p>
                                </div>
                            </div>
                            <span className="font-bold">58%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-muted rounded-md">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium">Desktop</p>
                                    <p className="text-xs text-muted-foreground">Web Browser</p>
                                </div>
                            </div>
                            <span className="font-bold">35%</span>
                        </div>
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-muted rounded-md">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium">Tablet</p>
                                    <p className="text-xs text-muted-foreground">iPad & Others</p>
                                </div>
                            </div>
                            <span className="font-bold">7%</span>
                        </div>
                    </div>
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