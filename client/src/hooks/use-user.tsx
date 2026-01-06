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
  login: (username: string) => Promise<void>;
  signup: (username: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  const fetchUser = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock implementation: check localStorage
      const storedUser = localStorage.getItem("mock_user_session");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
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

  const login = async (username: string): Promise<void> => {
    // Mock login logic
    const mockUser: User = {
      userId: "mock-user-id",
      username: username,
      isAdmin: false,
      plan: "TRANSFORMER",
      basePlan: "EXPLORER",
      subscriptionStatus: "active",
      trial: {
        active: true,
        plan: "TRANSFORMER",
        daysRemaining: 5,
        endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    };
    
    localStorage.setItem("mock_user_session", JSON.stringify(mockUser));
    // Also set trial start date for other components that use it
    if (!localStorage.getItem("trialStartDate")) {
      localStorage.setItem("trialStartDate", new Date().toISOString());
    }
    
    setUser(mockUser);
    return Promise.resolve();
  };

  const signup = async (username: string): Promise<void> => {
    // Mock signup is same as login for this prototype
    return login(username);
  };

  const logout = async (): Promise<void> => {
    try {
      setUser(null);
      localStorage.removeItem("mock_user_session");
      localStorage.removeItem("trialStartDate"); // Optional: clear trial start on logout if desired
      setLocation("/login");
      
      // Notify other tabs
      window.dispatchEvent(new StorageEvent("storage", {
        key: "logout-event",
        newValue: Date.now().toString()
      }));
      
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Listen for storage events to sync logout across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "logout-event") {
        setUser(null);
        localStorage.removeItem("mock_user_session");
        setLocation("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [setLocation]);

  const value: UserContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    refetchUser: fetchUser,
    logout,
    login,
    signup
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
