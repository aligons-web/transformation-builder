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

  // ✅ Admins bypass all locks
  if (user?.isAdmin) {
    return <>{children}</>;
  }

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
        <div className="w-full max-w-md border-2 border-primary/20 bg-white/95 backdrop-blur-xl shadow-2xl rounded-lg p-8 text-center space-y-6">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
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
            <button 
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-2 rounded-lg font-medium"
              onClick={() => window.location.href = '/pricing'}
            >
              Upgrade to {requiredPlan}
            </button>

            <button 
              className="w-full border border-border px-4 py-2 rounded-lg"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
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
        </div>
      </div>
    </div>
  );
}