import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, Star, ShieldCheck, Zap, Users, Gift } from "lucide-react";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FoundersProgramPage() {
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-12 flex-1">
        <Link href="/">
          <Button variant="ghost" className="gap-2 mb-8 pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Founder's Program
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A limited early-access opportunity for individuals who want to be among the first to experience, influence, and benefit from the Transformation Builder.
            </p>
          </div>

          <Card className="mb-12 border-primary/10 shadow-lg overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10 pb-8 pt-8 text-center">
                <h2 className="text-2xl font-bold text-foreground">Transformation Builder – Founder's Program</h2>
                <p className="text-primary font-medium">LIFE Transformation Network by U eMerge Academy, LLC</p>
            </CardHeader>
            <CardContent className="p-8 md:p-12">
                <div className="mb-12">
                    <h3 className="text-2xl font-bold mb-4 text-primary">What Is the Founder's Program?</h3>
                    <p className="text-lg text-muted-foreground mb-4">
                        The Founder's Program is a limited early-access opportunity for individuals who want to be among the first to experience, influence, and benefit from the Transformation Builder Web Application.
                    </p>
                    <p className="text-muted-foreground mb-4">
                        Founder participants are placed on a priority waiting list and invited to be among the first users of the trial version of the platform before public release.
                    </p>
                    <p className="text-foreground font-medium bg-primary/5 p-4 rounded-lg border border-primary/10">
                        This program is designed to reward early supporters with lifetime value, early influence, and locked-in pricing.
                    </p>
                </div>

                <div className="space-y-12">
                  <section>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Star className="w-6 h-6 text-primary fill-primary/20" />
                        Founder's Program Core Benefits
                    </h3>

                    <div className="grid md:grid-cols-1 gap-6">
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                            <h4 className="text-xl font-bold mb-3 text-primary flex items-center gap-2">
                                <Zap className="w-5 h-5" /> 1. Priority Trial Access
                            </h4>
                            <ul className="space-y-2 ml-2">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span>Be added to the Founder's Waiting List</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span>Receive first access to the trial version of the Transformation Builder web application</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span>Gain early use of tools, dashboards, and transformation workflows before public launch</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">GREATEST BENEFIT</div>
                            <h4 className="text-xl font-bold mb-3 text-primary flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5" /> 2. Locked-In Founding Pricing (Lifetime Benefit)
                            </h4>
                            <p className="mb-3 font-medium text-foreground">Founders are permanently locked into the initial launch pricing.</p>
                            <ul className="space-y-2 ml-2">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span>Founder participants will never experience price increases for their subscribed plan</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span>Future pricing adjustments, tiers, or increases will not affect Founder accounts</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span>Locked pricing remains valid as long as the account remains active</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                            <h4 className="text-xl font-bold mb-3 text-primary flex items-center gap-2">
                                <Gift className="w-5 h-5" /> 3. First Notification of New Products & Services
                            </h4>
                            <ul className="space-y-2 ml-2">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span>Be the first notified of new Products, Services, Features, Programs, and Membership tiers</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span>Offered early enrollment opportunities before the general public</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Users className="w-6 h-6 text-primary fill-primary/20" />
                        Additional Founder Member Benefits
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h4 className="text-lg font-bold mb-2 text-foreground">4. Beta Testing & Feature Influence</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="shrink-0">•</span>
                                    <span>Participate in beta testing of new tools and features</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="shrink-0">•</span>
                                    <span>Provide feedback that may directly influence platform development</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="shrink-0">•</span>
                                    <span>Gain early exposure to experimental features not yet publicly released</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-6">
                            <h4 className="text-lg font-bold mb-2 text-foreground">5. Exclusive Discounts</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="shrink-0">•</span>
                                    <span>Founders-only discounted pricing on Masterclasses, Challenges, and Coaching programs</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="shrink-0">•</span>
                                    <span>Certification or training programs</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="shrink-0">•</span>
                                    <span>Limited-time offers reserved exclusively for the Founder group</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-6">
                            <h4 className="text-lg font-bold mb-2 text-foreground">6. Referral & Affiliate Opportunities</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="shrink-0">•</span>
                                    <span>Early access to client referral programs</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="shrink-0">•</span>
                                    <span>Priority enrollment in affiliate or ambassador opportunities</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="shrink-0">•</span>
                                    <span>Higher visibility within the LIFE Transformation Network community</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-6">
                            <h4 className="text-lg font-bold mb-2 text-foreground">7. Recognition & Communication</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="shrink-0">•</span>
                                    <span>"Founding Member" designation within the platform</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="shrink-0">•</span>
                                    <span>Direct updates on platform progress and early roadmap previews</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="shrink-0">•</span>
                                    <span>Behind-the-scenes insights into platform growth and strategy</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                  </section>

                  <section className="bg-muted/30 p-8 rounded-xl border border-border">
                    <h3 className="text-xl font-bold mb-4 text-primary">Founder Program Participation Terms</h3>
                    <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                            <span className="text-primary">•</span> Founder participation is limited and time-sensitive
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary">•</span> Founder status is non-transferable
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary">•</span> Founder pricing remains valid only while the account remains active
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary">•</span> U eMerge Academy reserves the right to update features, tools, or offerings while honoring Founder benefits
                        </li>
                    </ul>
                  </section>

                  <section className="text-center">
                    <h3 className="text-2xl font-bold mb-6">Who the Founder's Program Is For</h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-background rounded-lg border border-border shadow-sm">
                            <p className="font-medium text-sm">Believe in personal growth & reinvention</p>
                        </div>
                        <div className="p-4 bg-background rounded-lg border border-border shadow-sm">
                            <p className="font-medium text-sm">Want early access to a purpose-driven platform</p>
                        </div>
                        <div className="p-4 bg-background rounded-lg border border-border shadow-sm">
                            <p className="font-medium text-sm">Value long-term savings & early influence</p>
                        </div>
                        <div className="p-4 bg-background rounded-lg border border-border shadow-sm">
                            <p className="font-medium text-sm">Desire to grow alongside an evolving ecosystem</p>
                        </div>
                    </div>
                  </section>
                </div>
            </CardContent>
          </Card>

          <div className="text-center mb-16 bg-primary/5 p-8 rounded-2xl border border-primary/20">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Join the Founder's Waiting List</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Be among the first to experience the Transformation Builder and secure your place at founding pricing—before public launch.
            </p>
            {/* ✅ UPDATED: Now links to /waitlist page */}
            <Link href="https://786bb9df.sibforms.com/serve/MUIFAAT8sG5YPYCt9DMW9mvBO3nYdK8R44_-D15XGSv5UQzC4f5qzv2iBu91N7Q_aUnn9OD_kRwZ6kp6yfyJa3UetQyH4mZS6qTY3FwmUN4j-xVPzFpZf_oXBf9MSRl9kzf5kS27cKVoTyULHS37ZUHOI9alkG1gzgeeEjbfTFP89pcxKOTHNtk0_eEWA-qFZGIDqcahTaK14BMQPQ==">
              <Button size="lg" className="bg-primary text-primary-foreground text-lg px-10 py-6 h-auto shadow-xl hover:translate-y-[-2px] transition-all rounded-full">
                  Join Waiting List
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}