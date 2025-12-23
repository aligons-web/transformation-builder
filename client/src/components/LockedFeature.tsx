import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Crown, Zap } from "lucide-react";
import { useUser } from "@/hooks/use-user";

interface LockedFeatureProps {
  requiredPlan: "TRANSFORMER" | "IMPLEMENTER";
  featureName: string;
  description?: string;
  children?: React.ReactNode;
}

export function LockedFeature({ 
  requiredPlan, 
  featureName, 
  description,
  children 
}: LockedFeatureProps) {
  const { user } = useUser();

  // Check if user has access
  const planRank = {
    EXPLORER: 1,
    TRANSFORMER: 2,
    IMPLEMENTER: 3,
  };

  const userRank = user?.plan ? planRank[user.plan as keyof typeof planRank] : 0;
  const requiredRank = planRank[requiredPlan];

  // If user has access, show the content
  if (userRank >= requiredRank) {
    return <>{children}</>;
  }

  // Otherwise, show upgrade prompt
  const isTransformerRequired = requiredPlan === "TRANSFORMER";

  return (
    <div className="relative">
      {/* Blurred content preview */}
      {children && (
        <div className="blur-sm pointer-events-none select-none opacity-50">
          {children}
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-2 border-primary/20 bg-white/95 backdrop-blur-xl shadow-2xl">
          <CardContent className="p-8 text-center space-y-6">
            {/* Icon */}
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              {isTransformerRequired ? (
                <Zap className="w-8 h-8 text-white" />
              ) : (
                <Crown className="w-8 h-8 text-white" />
              )}
            </div>

            {/* Heading */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {featureName} Locked
              </h3>
              <p className="text-muted-foreground">
                {description || `Upgrade to ${requiredPlan} to unlock this feature`}
              </p>
            </div>

            {/* Trial status */}
            {user?.trial?.active && isTransformerRequired && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 font-medium">
                  ✨ Good news! You have {user.trial.daysRemaining} days of Transformer trial left.
                  <br />
                  This feature will unlock soon!
                </p>
              </div>
            )}

            {!user?.trial?.active && user?.basePlan === "EXPLORER" && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  Your trial has ended. Upgrade to continue accessing premium features.
                </p>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white gap-2"
                onClick={() => window.location.href = '/pricing'}
              >
                {isTransformerRequired ? <Zap className="w-5 h-5" /> : <Crown className="w-5 h-5" />}
                Upgrade to {requiredPlan}
              </Button>

              <Button 
                variant="outline"
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
            </div>

            {/* Features preview */}
            <div className="pt-4 border-t text-left">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                {requiredPlan} includes:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {isTransformerRequired ? (
                  <>
                    <li>✓ Change Analysis Tools</li>
                    <li>✓ AI-Powered Insights</li>
                    <li>✓ 21-Day Challenge</li>
                    <li>✓ Live Community Calls</li>
                  </>
                ) : (
                  <>
                    <li>✓ All Transformer Features</li>
                    <li>✓ Final Life Blueprint</li>
                    <li>✓ Advanced Analytics</li>
                    <li>✓ Coaching Discount</li>
                  </>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
