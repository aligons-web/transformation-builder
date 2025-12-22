import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";

type Plan = "EXPLORER" | "TRANSFORMER" | "IMPLEMENTER";

interface TrialInfo {
  active: boolean;
  endsAt?: string;
  plan?: Plan;
  daysRemaining?: number;
}

interface User {
  userId: string;
  username: string;
  isAdmin: boolean;
  plan: Plan;
  basePlan: Plan;
  subscriptionStatus: string;
  trial: TrialInfo;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  const fetchUser = async (): Promise<void> => {
    try {
      const response = await fetch("/api/me", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setLocation("/auth");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value: UserContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    refetchUser: fetchUser,
    logout,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export function useHasAccess(requiredPlan: Plan): boolean {
  const { user } = useUser();

  if (!user) return false;

  const planRank: Record<Plan, number> = {
    EXPLORER: 1,
    TRANSFORMER: 2,
    IMPLEMENTER: 3,
  };

  return planRank[user.plan] >= planRank[requiredPlan];
}