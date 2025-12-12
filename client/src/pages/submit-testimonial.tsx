import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Upload, Camera, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SubmitTestimonialPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Testimonial Submitted",
        description: "Thank you for sharing your story! We will review it shortly.",
      });
      setLocation("/about");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12 flex-1">
        <Link href="/about">
          <Button variant="ghost" className="gap-2 mb-8 pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Back to About
          </Button>
        </Link>
        
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Share Your Story
            </h1>
            <p className="text-xl text-muted-foreground">
              Your journey inspires others. Tell us about your transformation.
            </p>
          </div>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>Submit Testimonial</CardTitle>
              <CardDescription>
                Please provide your details and your experience with LIFE Transformation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Jane" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role / Profession</Label>
                  <Input id="role" placeholder="e.g. Recent Graduate, Entrepreneur" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Your Photo</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
                    <Input id="photo" type="file" className="hidden" accept="image/*" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="testimonial">Your Testimonial</Label>
                  <Textarea 
                    id="testimonial" 
                    placeholder="Share how LIFE Transformation helped you discover your purpose..." 
                    className="min-h-[150px] resize-none"
                    required
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Testimonial
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
