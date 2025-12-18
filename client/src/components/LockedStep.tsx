import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LockedStepProps {
  stepTitle: string;
  requiredPlan: string;
  description: string;
}

export function LockedStep({
  stepTitle,
  requiredPlan,
  description,
}: LockedStepProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="max-w-lg w-full text-center border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl font-heading">
            {stepTitle}
          </CardTitle>
          <CardDescription>
            Available in the {requiredPlan} Plan
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </CardContent>

        <CardFooter>
          <Button className="w-full" asChild>
            <a href="/pricing">Upgrade Now</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
