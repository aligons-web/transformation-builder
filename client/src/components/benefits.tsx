import { Link } from "wouter";
import { Compass, Lightbulb, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Compass,
    title: "Discover Purpose",
    description: "Navigate through uncertainty with our guided journaling and self-discovery frameworks designed to uncover your core values.",
    link: "/discover-purpose"
  },
  {
    icon: Lightbulb,
    title: "Transformation Analysis",
    description: "Get personalized insights and pattern recognition from your entries to identify hidden strengths and potential career paths.",
    link: "/dashboard/analysis"
  },
  {
    icon: Target,
    title: "Actionable Focus",
    description: "Transform abstract dreams into concrete goals, tasks, and projects. Chart your daily activities to your life's mission.",
    link: "/actionable-focus"
  }
];

export function Benefits() {
  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-foreground">
            Why Start Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground">
            We provide the tools and structure you need to move from confusion to clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={benefit.link}>
                <a className="block h-full">
                  <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm group hover:-translate-y-1 cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <benefit.icon className="w-7 h-7 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-heading font-semibold">
                        {benefit.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}