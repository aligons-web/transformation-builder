import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowLeft,
  BookOpen,
  Compass,
  Sparkles,
  Quote,
  Plus,
} from "lucide-react";
import heroBg from "@assets/generated_images/abstract_sunrise_gradient_background_for_hero_section.png";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import stock1 from "@assets/stock_images/professional_diverse_7e680885.jpg";
import stock2 from "@assets/stock_images/professional_diverse_78f88680.jpg";
import stock3 from "@assets/stock_images/professional_diverse_60c21c44.jpg";
import stock4 from "@assets/stock_images/professional_diverse_d8add0de.jpg";
import { homedir } from "os";
import journeyPathImage from "@assets/journeypath2_1771081561926.jpg";

export default function AboutPage() {
  const testimonials = [
    {
      id: 1,
      name: "Muriel Anderson",
      role: "Chancellor",
      image: stock1,
      text: "When you decide that you want to do more in your life and you don't have the right tools or equipment. And when I say equipment, that means your understanding of who you are... what are you really supposed to be doing? So you could be an accountant but you should be in another form of management. So the class will help you mainstreaming yourself into that. ",
    },
    {
      id: 2,
      name: "Muriel Anderson",
      role: "Minister",
      image: stock2,
      text: "Where can you participate in the program? At home, in my own environment. But I get to see the people because it's virtual. It's on Zoom. And it's not like you're just listening. You are really actively involved and you hear it. Seeds are being planted. I'm ready to put to invest into and pay for it.",
    },
    {
      id: 3,
      name: "More Testamonies coming soon",
      role: "TBA",
      image: stock3,
      text: "More input from new participants coming soon.",
    },
    {
      id: 4,
      name: "More Testamonies coming soon",
      role: "TBA",
      image: stock4,
      text: "More input from new participants coming soon.",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-orange-100 selection:text-orange-900">
      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 ml-64 flex flex-col min-h-screen">
          <div className="flex-1">
            {/* Hero Header */}
            <section className="relative pt-12 pb-8 flex items-center justify-center overflow-hidden">
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
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                    Understanding the philosophy and purpose behind your
                    transformation.
                  </p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative mx-auto max-w-5xl mt-8 rounded-xl overflow-hidden shadow-2xl"
                  >
                    <img
                      src={journeyPathImage}
                      alt="Journey Path Landscape"
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </section>

            <div className="container mx-auto px-8 pb-8">
              <div className="mb-4">
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="gap-2 pl-0 hover:pl-2 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Main Content Column */}
                <div className="lg:col-span-8 grid gap-12">
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
                        <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">
                          Preface
                        </h2>
                        <div className="prose prose-lg text-muted-foreground leading-relaxed">
                          <p className="mb-4">
                            Change is inevitable—life delivers unexpected turns.
                            The LIFE Transformation Workbook is a guide to help
                            you navigate the seasons of change.
                          </p>
                          <p className="mb-4">
                            Whether you are experiencing a transition you chose
                            or one that was thrust upon you, the principles of
                            transformation remain the same. This workbook is
                            designed to provide you with the tools, questions,
                            and reflections necessary to move from where you are
                            to where you desire to be.
                          </p>
                          <p>
                            It is not merely about coping with change, but about
                            leveraging it for growth. By engaging with these
                            materials, you are taking a proactive step towards
                            defining your future rather than letting
                            circumstances define you.
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
                        <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">
                          Introduction
                        </h2>
                        <div className="prose prose-lg text-muted-foreground leading-relaxed">
                          <p className="mb-4">
                            If you have completed the revised edition of the
                            Understanding Your Path book, you are already
                            familiar with the foundational concepts of
                            self-discovery. This workbook takes those concepts
                            further, moving from understanding to action.
                          </p>
                          <p className="mb-4">
                            The journey ahead requires commitment. It asks you
                            to look deeply at your motivations, your history,
                            and your aspirations. It is not a passive process.
                            Transformation demands participation.
                          </p>
                          <p>
                            As you proceed, remember that this is your journey.
                            The insights you gain are yours to keep and apply.
                            The work you do here will lay the groundwork for the
                            chapters of your life yet to be written.
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
                        <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">
                          Prologue
                        </h2>
                        <div className="prose prose-lg text-muted-foreground leading-relaxed">
                          <p className="mb-4 font-medium text-foreground">
                            Welcome to the journey of transformation.
                          </p>
                          <p className="mb-4">
                            We will explore multiple questions to gain
                            perspectives, to provoke thoughts, to generate
                            ideas, to confront mindsets, and to determine the
                            next steps of action. It is critical to spend time
                            in each unit thoroughly reflecting and providing
                            sincere transparent answers to the questions that
                            are presented before moving to the next journalism
                            questions.
                          </p>
                          <p className="mb-4">
                            Each unit will incorporate biblical references,
                            personal reflections, and business thoughts to serve
                            as case studies or examples for individual or
                            situational analysis. We will approach various
                            perspectives and subtopics about life transformation
                            with assessments and extensive questions for
                            profound self-discovery to assist you in reaching
                            new levels of success that lead to life
                            transformation.
                          </p>
                          <p className="mb-6">
                            So, let us begin the journey. Do not be hesitant to
                            explore the destinations that the answers to your
                            questions lead you. Your transparency and
                            willingness to address the real aspects of your life
                            are your steps in the right direction for
                            transformation.
                          </p>

                          <div className="mt-8 pt-8 border-t border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm font-medium text-orange-800 italic">
                              Are you ready to begin?
                            </p>
                            <Link href="/signup">
                              <Button
                                size="lg"
                                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-none border-none px-8"
                              >
                                Start Your Transformation
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.section>
                </div>

                {/* Testimonials Sidebar */}
                <div className="lg:col-span-4 space-y-6 sticky top-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-bold text-xl text-foreground">
                      Success Stories
                    </h3>
                    <a 
                      href="https://786bb9df.sibforms.com/serve/MUIFAL3h0DFc6LmCIJiWvMIonm5-QNTWmPXGkaY2m9cRA7UYd8AMkE64JccWjrTa7cbMMVQ1TMXSEx9Nb8uDeunrZGgKIA4EcW4koqoEdDs_zHsXnxJd8jGVtxMM0-g315Eawy_lTKZnl_nq8yu0DJ1a-7BozgXRqZCfEd1S1mT71NR9exVKKpZlEQplWyf6traT97peSCwrjOVahg==" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-primary hover:text-primary/80"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add Yours
                      </Button>
                    </a>
                  </div>

                  {testimonials.map((testimonial) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: testimonial.id * 0.1,
                      }}
                    >
                      <Card className="border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                              <AvatarImage
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="object-cover"
                              />
                              <AvatarFallback>
                                {testimonial.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-sm text-foreground">
                                {testimonial.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {testimonial.role}
                              </p>
                            </div>
                            <Quote className="w-6 h-6 text-primary/10 ml-auto" />
                          </div>
                          <p className="text-sm text-muted-foreground italic leading-relaxed">
                            "{testimonial.text}"
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                  <a 
                    href="https://786bb9df.sibforms.com/serve/MUIFAL3h0DFc6LmCIJiWvMIonm5-QNTWmPXGkaY2m9cRA7UYd8AMkE64JccWjrTa7cbMMVQ1TMXSEx9Nb8uDeunrZGgKIA4EcW4koqoEdDs_zHsXnxJd8jGVtxMM0-g315Eawy_lTKZnl_nq8yu0DJ1a-7BozgXRqZCfEd1S1mT71NR9exVKKpZlEQplWyf6traT97peSCwrjOVahg==" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-dashed border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 h-auto py-4 flex flex-col gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Submit Your Story</span>
                      <span className="text-xs font-normal text-muted-foreground">
                        Join our community of transformers
                      </span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
