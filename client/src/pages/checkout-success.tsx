import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useUser } from "@/hooks/use-user";

export default function CheckoutSuccessPage() {
  const { refetchUser } = useUser();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyCheckout = async () => {
      try {
        // Get session_id from URL
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get("session_id");

        if (!sessionId) {
          setStatus("error");
          setMessage("No session ID found");
          return;
        }

        // Verify the checkout session
        const response = await fetch(`/api/checkout/success?session_id=${sessionId}`, {
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          setStatus("success");
          setMessage("Your subscription is now active!");

          // Refetch user data to update the plan in the app
          await refetchUser();
        } else {
          setStatus("error");
          setMessage(data.message || "Something went wrong");
        }

      } catch (error) {
        console.error("Error verifying checkout:", error);
        setStatus("error");
        setMessage("Failed to verify payment. Please contact support.");
      }
    };

    verifyCheckout();
  }, [refetchUser]);

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-12 flex-1">
        <div className="max-w-md mx-auto text-center">
          {status === "loading" && (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-8">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
                Verifying your payment...
              </h1>
              <p className="text-muted-foreground">
                Please wait while we confirm your subscription.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-8">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
                Welcome to Your Transformation!
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {message}
              </p>

              <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-8">
                <h3 className="font-bold text-foreground mb-3">What's next?</h3>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span>All your plan features are now unlocked</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span>You'll receive a confirmation email shortly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span>Start your journey with Step 1: Discover Purpose</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200">
                    Go to Dashboard
                  </Button>
                </Link>
                <Link href="/discover-purpose">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200">
                    Start Step 1
                  </Button>
                </Link>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-8">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
                Something went wrong
              </h1>
              <p className="text-muted-foreground mb-8">
                {message}
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                If you were charged and don't see your subscription, please contact support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pricing">
                  <Button size="lg" variant="outline">
                    Back to Pricing
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg">
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}