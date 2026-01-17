import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AffiliateProgramPage() {
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
              Affiliate Program
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Partner with us to help others discover their life purpose and earn commissions.
            </p>
          </div>

          <Card className="mb-12 border-primary/10 shadow-md">
            <CardHeader className="bg-primary/5 border-b border-primary/10 pb-8 rounded-t-xl">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-foreground">U eMerge Academy, LLC – LIFE Transformation Network</h2>
                    <h3 className="text-xl text-primary font-semibold mt-2">Transformation Builder Affiliate Program Agreement</h3>
                    <p className="text-sm text-muted-foreground mt-4">Effective Date: [Insert Date]</p>
                </div>
            </CardHeader>
            <CardContent className="p-8 md:p-12 text-foreground/90">
                <p className="mb-6">
                    This Affiliate Program Agreement (“Agreement”) is entered into by and between U eMerge Academy, LLC (“Company,” “we,” “our,” or “us”) and the individual or entity applying to participate as an affiliate (“Affiliate,” “you,” or “your”).
                </p>
                <p className="mb-8 font-medium">By enrolling in the Affiliate Program, you agree to the terms and conditions below.</p>

                <div className="space-y-8">
                  <section>
                    <h4 className="text-lg font-bold mb-4 text-primary">1. Program Overview</h4>
                    <p className="mb-2">The Transformation Builder Affiliate Program allows approved affiliates to earn commissions by referring individuals or organizations who purchase eligible products or services associated with:</p>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                        <li>The Transformation Builder Web Application</li>
                        <li>The LIFE Transformation Network</li>
                        <li>Related programs, memberships, subscriptions, or services offered by U eMerge Academy, LLC</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold mb-4 text-primary">2. Affiliate Eligibility & Enrollment</h4>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Applicants must be 18 years or older.</li>
                        <li>U eMerge Academy reserves the right to approve or deny any application at its sole discretion.</li>
                        <li>Affiliates must provide accurate and complete account information.</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold mb-4 text-primary">3. Commission Structure</h4>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Affiliates earn a <strong className="text-foreground">30% commission</strong> on qualified purchases made by referred clients.</li>
                        <li>Commissions apply only to purchases completed through the affiliate’s unique referral link or approved tracking method.</li>
                        <li>Commissions are calculated based on net revenue, excluding: Taxes, Refunds, Chargebacks, and Processing fees.</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold mb-4 text-primary">4. Qualified Referrals</h4>
                    <p className="mb-2">A referral is considered “qualified” when:</p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>The client clicks the affiliate’s unique referral link.</li>
                        <li>The client completes a purchase within the designated tracking window (typically 30 days, unless otherwise stated).</li>
                        <li>The purchase is not canceled, refunded, or disputed.</li>
                        <li>Self-referrals are not permitted.</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold mb-4 text-primary">5. Payment Terms</h4>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Commissions are paid on a monthly basis, after a minimum 30-day holding period to account for refunds and disputes.</li>
                        <li>Minimum payout threshold: $50 USD.</li>
                        <li>Payments are issued via Stripe, PayPal, or ACH, depending on availability.</li>
                        <li>Affiliates are responsible for any applicable tax reporting obligations.</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold mb-4 text-primary">6. Affiliate Responsibilities</h4>
                    <p className="mb-2">Affiliates agree to:</p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Promote the program ethically and honestly.</li>
                        <li>Accurately represent U eMerge Academy products and services.</li>
                        <li>Comply with all local, state, federal, and international laws, including FTC disclosure requirements.</li>
                        <li>Clearly disclose affiliate relationships in marketing content.</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold mb-4 text-primary">7. Prohibited Activities</h4>
                    <p className="mb-2">Affiliates may not:</p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Make false, misleading, or exaggerated claims about results or income.</li>
                        <li>Use spam, deceptive marketing, or unauthorized advertising methods.</li>
                        <li>Bid on branded keywords or impersonate U eMerge Academy.</li>
                        <li>Use Company trademarks, logos, or brand assets without written permission.</li>
                        <li>Represent themselves as employees or partners of U eMerge Academy.</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold mb-4 text-primary">8. Brand & Intellectual Property</h4>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Affiliates are granted a limited, revocable, non-exclusive license to use approved marketing materials.</li>
                        <li>All intellectual property remains the sole property of U eMerge Academy, LLC.</li>
                        <li>Unauthorized use may result in immediate termination.</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold mb-4 text-primary">9. Termination</h4>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Either party may terminate participation at any time, with or without cause.</li>
                        <li>U eMerge Academy reserves the right to: Suspend or terminate accounts for violations; Withhold unpaid commissions in cases of fraud or policy breaches.</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold mb-4 text-primary">10. Modifications to the Program</h4>
                    <p className="text-muted-foreground">U eMerge Academy may update commission rates, policies, or terms at any time. Continued participation after changes constitutes acceptance of the updated terms.</p>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold mb-4 text-primary">11. Limitation of Liability</h4>
                    <p className="text-muted-foreground">U eMerge Academy shall not be liable for indirect, incidental, or consequential damages related to the Affiliate Program.</p>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold mb-4 text-primary">12. Independent Contractor Status</h4>
                    <p className="text-muted-foreground">Affiliates are independent contractors and are not employees, partners, or agents of U eMerge Academy, LLC.</p>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold mb-4 text-primary">13. Governing Law</h4>
                    <p className="text-muted-foreground">This Agreement shall be governed by the laws of the State of South Carolina, without regard to conflict-of-law principles.</p>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold mb-4 text-primary">14. Acceptance of Terms</h4>
                    <p className="font-medium">By enrolling in the Transformation Builder Affiliate Program, you acknowledge that you have read, understood, and agreed to this Agreement.</p>
                  </section>
                </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mb-12">
            <Button size="lg" className="bg-primary text-primary-foreground text-lg px-8 py-6 h-auto shadow-xl hover:translate-y-[-2px] transition-all" disabled>
                Coming Soon
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
