import { useUser } from "@/hooks/use-user";

interface LockedFeatureProps {
  requiredPlan: "TRANSFORMER" | "IMPLEMENTER";
  featureName: string;
  description?: string;
  isAdmin?: boolean | number;
  children?: React.ReactNode;
}

export function LockedFeature({ 
  requiredPlan, 
  featureName, 
  description,
  isAdmin,
  children 
}: LockedFeatureProps) {
  const { user } = useUser();

  // ✅ Admin bypass - handles both 1 and true
  if (isAdmin || user?.isAdmin) {
    return <>{children}</>;
  }

  // Check if user has access
  const planRank: Record<string, number> = {
    EXPLORER: 1,
    TRANSFORMER: 2,
    IMPLEMENTER: 3,
    FOUNDER: 3,  // Full access for founders
  };

  const userRank = user?.plan ? planRank[user.plan] : 0;
  const requiredRank = planRank[requiredPlan];

  // If user has access, show the content
  if (userRank >= requiredRank) {
    return <>{children}</>;
  }

  // Determine what to show based on required plan
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

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3">
            <button 
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-3 rounded-lg font-medium"
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
                  <li>✓ All 9 Modules in Step 1</li>
                  <li>✓ Step 2: Analyze Change</li>
                  <li>✓ AI-Powered Insights</li>
                  <li>✓ 3-Day Bootcamp</li>
                  <li>✓ Community Access</li>
                </>
              ) : (
                <>
                  <li>✓ All Transformer Features</li>
                  <li>✓ Step 3: Clarify Focus</li>
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