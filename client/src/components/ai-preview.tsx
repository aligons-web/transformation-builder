import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Briefcase, Heart, Zap } from "lucide-react";
import { useState } from "react";

export function AiPreview() {
  const [category, setCategory] = useState<string>("");

  return (
    <section className="py-12 bg-muted/30 relative overflow-hidden">
      {/* Decorative blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              AI-Powered <br />
              <span className="text-primary">Transformation Engine</span>
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