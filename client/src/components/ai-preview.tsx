import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Briefcase, Heart, Zap, Target, Clock, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";

export function AiPreview() {
  const [category, setCategory] = useState<string>("");
  const [showInterpretation, setShowInterpretation] = useState(false);

  // Mock data for Clarify Focus summary
  const timeUseData = [
    { name: "Highly Structured", value: 35, color: "#3b82f6" },
    { name: "Intentional", value: 25, color: "#10b981" },
    { name: "Relax Focused", value: 20, color: "#f97316" },
    { name: "Personal Activity", value: 20, color: "#ef4444" }
  ];

  return (
    <section className="py-12 bg-muted/30 relative overflow-hidden">
      {/* Decorative blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 space-y-16">
        
        {/* Clarify Focus Summary Section */}
        <div className="max-w-5xl mx-auto">
          <Card className="border-primary/20 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Target className="w-6 h-6 text-primary" />
                Clarify Focus Summary
              </CardTitle>
              <CardDescription>
                A snapshot of your How, When, and Where reflections.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Module 3: How */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 font-semibold text-lg text-primary">
                    <Clock className="w-5 h-5" />
                    <h3>Module 3: How?</h3>
                  </div>
                  <div className="h-[200px] w-full bg-white/50 rounded-lg p-2 border border-border/50">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={timeUseData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {timeUseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p><strong>Primary Mode:</strong> Highly Structured</p>
                    <p>You thrive when time is organized and predictable.</p>
                  </div>
                </div>

                {/* Module 4: When */}
                <div className="space-y-4">
                   <div className="flex items-center gap-2 font-semibold text-lg text-primary">
                    <Zap className="w-5 h-5" />
                    <h3>Module 4: When?</h3>
                  </div>
                  <div className="p-4 rounded-lg bg-yellow-100 border border-yellow-200 text-yellow-800">
                    <p className="font-bold text-sm mb-1">Urgency Level:</p>
                    <p className="text-lg font-heading font-bold">Pending Urgent</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Top Barriers:</p>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Unclear career direction</li>
                      <li>Lack of daily routine</li>
                      <li>Financial constraints</li>
                    </ul>
                  </div>
                </div>

                {/* Module 5: Where */}
                <div className="space-y-4">
                   <div className="flex items-center gap-2 font-semibold text-lg text-primary">
                    <MapPin className="w-5 h-5" />
                    <h3>Module 5: Where?</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-white/50 rounded-lg border border-border/50">
                      <p className="text-xs font-medium text-primary mb-1">Destinations</p>
                      <p className="text-sm">Internal peace, Professional leadership role.</p>
                    </div>
                    <div className="p-3 bg-white/50 rounded-lg border border-border/50">
                      <p className="text-xs font-medium text-primary mb-1">Environment Needs</p>
                      <p className="text-sm">Quiet home office, weekly accountability group.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-4 border-t border-border/50">
                <Button 
                  size="lg" 
                  className="gap-2 font-heading"
                  onClick={() => setShowInterpretation(!showInterpretation)}
                >
                  <Wand2 className="w-4 h-4" />
                  {showInterpretation ? "Hide Interpretation" : "Interpret Results"}
                </Button>
              </div>

              {showInterpretation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary/5 p-6 rounded-xl border border-primary/20 space-y-4"
                >
                  <h4 className="font-bold text-lg flex items-center gap-2">
                    <Wand2 className="w-5 h-5 text-primary" />
                    AI Interpretation
                  </h4>
                  <p className="text-foreground/80 leading-relaxed">
                    Based on your <strong>Structured</strong> time profile and <strong>Pending Urgent</strong> status, your roadmap should focus on immediate, small wins. Your desire for a leadership role aligns with your structured approach, but the lack of routine (barrier) contradicts your natural strength. 
                  </p>
                  <p className="text-foreground/80 leading-relaxed">
                    <strong>Recommendation:</strong> Leverage your "Where" destination (home office) to build the routine you're missing. Start with morning discipline to address the "When" urgency.
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>


        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Transformation <br />
              <span className="text-primary">Roadmap</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Select a life domain you want to transform. Our AI engine analyzes your inputs, identifies your skills, and generates a personalized roadmap for reinvention.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: Heart, text: "Personal Advancement" },
                { icon: Briefcase, text: "Professional Reinvention" },
                { icon: Zap, text: "Spiritual Awareness" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/60 border border-white/60 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interface Mockup */}
          <div className="lg:w-1/2 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Card className="p-8 shadow-2xl border-border/50 bg-white/80 backdrop-blur-xl rounded-3xl">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Select Category</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="h-12 bg-white/50 border-primary/20 focus:ring-primary">
                        <SelectValue placeholder="Choose area of focus..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal Advancement</SelectItem>
                        <SelectItem value="professional">Professional Reinvention</SelectItem>
                        <SelectItem value="spiritual">Spiritual Awareness</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-6 rounded-xl bg-muted/50 border border-dashed border-muted-foreground/20 min-h-[120px] flex flex-col items-center justify-center text-center gap-3">
                    {category ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-left w-full"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Wand2 className="w-4 h-4 text-primary animate-pulse" />
                          <span className="text-sm font-medium text-primary">AI Analysis Ready</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Based on your selection of <strong>{category}</strong>, we will focus on identifying transferable skills and aligning them with market opportunities...
                        </p>
                      </motion.div>
                    ) : (
                      <>
                        <Wand2 className="w-8 h-8 text-muted-foreground/50" />
                        <p className="text-sm text-muted-foreground/80">Select a category to see AI preview</p>
                      </>
                    )}
                  </div>

                  <Button className="w-full h-12 text-lg font-medium bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                    Generate Roadmap
                  </Button>
                </div>
              </Card>
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/30 rounded-full blur-xl -z-10" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 rounded-full blur-xl -z-10" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}