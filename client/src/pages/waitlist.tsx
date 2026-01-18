import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, Sparkles, Mail, User, Target } from "lucide-react";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function WaitlistPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    transformationGoal: "",
    agreeToUpdates: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.firstName) {
      toast({
        variant: "destructive",
        title: "Required fields missing",
        description: "Please enter your email and first name.",
      });
      return;
    }

    if (!formData.agreeToUpdates) {
      toast({
        variant: "destructive",
        title: "Agreement required",
        description: "Please agree to receive updates to join the waiting list.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to join waiting list");
      }

      setIsSubmitted(true);
      toast({
        title: "You're on the list! 🎉",
        description: "We'll notify you when early access is available.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error.message || "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-12 flex-1">
        <Link href="/founders-program">
          <Button variant="ghost" className="gap-2 mb-8 pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Back to Founder's Program
          </Button>
        </Link>

        <div className="max-w-2xl mx-auto">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  Join the Founder's Waiting List
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                  Be among the first to experience the Transformation Builder and lock in exclusive founding member pricing.
                </p>
              </div>

              <Card className="border-primary/10 shadow-xl overflow-hidden">
                <CardHeader className="bg-primary/5 border-b border-primary/10 py-6 text-center">
                  <p className="text-sm font-medium text-primary">
                    Limited spots available • Priority access guaranteed
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          First Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Enter your first name"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="h-12"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          Last Name <span className="text-muted-foreground text-xs">(optional)</span>
                        </Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Enter your last name"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="transformationGoal" className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        What's your biggest transformation goal? <span className="text-muted-foreground text-xs">(optional)</span>
                      </Label>
                      <Textarea
                        id="transformationGoal"
                        placeholder="Share what you're hoping to achieve..."
                        value={formData.transformationGoal}
                        onChange={(e) => setFormData({ ...formData, transformationGoal: e.target.value })}
                        className="min-h-[100px] resize-none"
                      />
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg border border-border">
                      <Checkbox
                        id="agreeToUpdates"
                        checked={formData.agreeToUpdates}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, agreeToUpdates: checked as boolean })
                        }
                        className="mt-0.5"
                      />
                      <Label htmlFor="agreeToUpdates" className="text-sm leading-relaxed cursor-pointer">
                        I agree to receive updates about Transformation Builder, including early access notifications, product news, and exclusive founder offers. <span className="text-destructive">*</span>
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary text-primary-foreground text-lg py-6 h-auto shadow-lg hover:translate-y-[-2px] transition-all rounded-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Joining..." : "Join the Waiting List"}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Your information is secure and will never be shared with third parties.
                    </p>
                  </form>
                </CardContent>
              </Card>

              <div className="mt-10 grid sm:grid-cols-3 gap-4 text-center">
                <div className="p-4">
                  <div className="text-2xl font-bold text-primary mb-1">Priority</div>
                  <p className="text-sm text-muted-foreground">First access to trial</p>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-primary mb-1">Locked</div>
                  <p className="text-sm text-muted-foreground">Founding pricing forever</p>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-primary mb-1">Exclusive</div>
                  <p className="text-sm text-muted-foreground">Founder member benefits</p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-8">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                You're on the List!
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg mx-auto mb-8">
                Thank you for joining the Founder's Waiting List. We'll notify you as soon as early access is available.
              </p>
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 max-w-md mx-auto mb-8">
                <h3 className="font-bold text-foreground mb-2">What happens next?</h3>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span>You'll receive a confirmation email shortly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span>We'll notify you when early access opens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span>Your founding member pricing will be locked in</span>
                  </li>
                </ul>
              </div>
              <Link href="/">
                <Button variant="outline" size="lg" className="rounded-full">
                  Return to Home
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}