import { useEffect, useState } from "react";

export type UserPlan = "explorer" | "transformer" | "implementer";

export type CurrentUser = {
  userId: string;
  email: string;
  plan: UserPlan;
  subscriptionStatus: string;
};

export function useUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        // normalize: "EXPLORER" -> "explorer"
        const normalizedPlan = (data.plan ?? "EXPLORER").toLowerCase();

        setUser({
          ...data,
          plan: normalizedPlan,
        });
      } catch (err) {
        console.error("Failed to load /api/me:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  return { user, loading };
}
