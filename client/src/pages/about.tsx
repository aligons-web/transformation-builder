import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, BookOpen, Compass, Sparkles } from "lucide-react";
import heroBg from "@assets/generated_images/abstract_sunrise_gradient_background_for_hero_section.png";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-orange-100 selection:text-orange-900">
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 ml-64">
          {/* Hero Header */}
          <section className="relative h-[30vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <img
                src={heroBg}
                alt="Sunrise background"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
            </div>
            
            <div className="container mx-auto px-8 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-4">
                  About the Journey
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Understanding the philosophy and purpose behind your transformation.
                </p>
              </motion.div>
            </div>
          </section>

          <div className="container mx-auto px-8 py-8 max-w-5xl">
            <div className="mb-4">
              <Link href="/">
                <Button variant="ghost" className="gap-2 pl-0 hover:pl-2 transition-all">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
            </div>

            <div className="grid gap-12">
              {/* Preface Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50 shadow-sm"
              >
                <div className="flex items-start gap-6">
                  <div className="bg-orange-100 p-3 rounded-xl hidden md:block">
                    <Compass className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">Preface</h2>
                    <div className="prose prose-lg text-muted-foreground leading-relaxed">
                      <p className="mb-4">
                        Change is inevitable—life delivers unexpected turns. The LIFE Transformation Workbook is a guide to help you navigate the seasons of change.
                      </p>
                      <p className="mb-4">
                        Whether you are experiencing a transition you chose or one that was thrust upon you, the principles of transformation remain the same. This workbook is designed to provide you with the tools, questions, and reflections necessary to move from where you are to where you desire to be.
                      </p>
                      <p>
                        It is not merely about coping with change, but about leveraging it for growth. By engaging with these materials, you are taking a proactive step towards defining your future rather than letting circumstances define you.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Introduction Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50 shadow-sm"
              >
                <div className="flex items-start gap-6">
                  <div className="bg-teal-100 p-3 rounded-xl hidden md:block">
                    <BookOpen className="w-8 h-8 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">Introduction</h2>
                    <div className="prose prose-lg text-muted-foreground leading-relaxed">
                      <p className="mb-4">
                        If you have completed the revised edition of the Understanding Your Path book, you are already familiar with the foundational concepts of self-discovery. This workbook takes those concepts further, moving from understanding to action.
                      </p>
                      <p className="mb-4">
                        The journey ahead requires commitment. It asks you to look deeply at your motivations, your history, and your aspirations. It is not a passive process. Transformation demands participation.
                      </p>
                      <p>
                        As you proceed, remember that this is your journey. The insights you gain are yours to keep and apply. The work you do here will lay the groundwork for the chapters of your life yet to be written.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Prologue Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 md:p-12 border border-orange-100 shadow-md"
              >
                <div className="flex items-start gap-6">
                  <div className="bg-orange-500 p-3 rounded-xl hidden md:block">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">Prologue</h2>
                    <div className="prose prose-lg text-muted-foreground leading-relaxed">
                      <p className="mb-4 font-medium text-foreground">
                        Welcome to the journey of transformation.
                      </p>
                      <p className="mb-4">
                        We will explore multiple questions to gain perspectives, to provoke thoughts, to generate ideas, to confront mindsets, and to determine the next steps of action. It is critical to spend time in each unit thoroughly reflecting and providing sincere transparent answers to the questions that are presented before moving to the next journalism questions.
                      </p>
                      <p className="mb-4">
                        Each unit will incorporate biblical references, personal reflections, and business thoughts to serve as case studies or examples for individual or situational analysis. We will approach various perspectives and subtopics about life transformation with assessments and extensive questions for profound self-discovery to assist you in reaching new levels of success that lead to life transformation.
                      </p>
                      <p className="mb-6">
                        So, let us begin the journey. Do not be hesitant to explore the destinations that the answers to your questions lead you. Your transparency and willingness to address the real aspects of your life are your steps in the right direction for transformation.
                      </p>
                      
                      <div className="mt-8 pt-8 border-t border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm font-medium text-orange-800 italic">
                          Are you ready to begin?
                        </p>
                        <Link href="/signup">
                          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-none border-none px-8">
                            Start Your Transformation
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}