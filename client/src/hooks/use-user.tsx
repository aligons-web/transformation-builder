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
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  const fetchUser = async (throwOn401: boolean = false): Promise<void> => {
    setIsLoading(true);
    try {
      // MOCK IMPLEMENTATION
      const storedUser = localStorage.getItem("mock_user");
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

  const login = async (username: string, password: string): Promise<void> => {
    try {
      // MOCK IMPLEMENTATION
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
      
      const mockUser: User = {
        userId: "mock-user-" + Math.random().toString(36).substring(7),
        username: username,
        isAdmin: username.toLowerCase().includes("admin"),
        plan: "TRANSFORMER", // Default trial plan
        basePlan: "EXPLORER",
        subscriptionStatus: "active",
        trial: {
          active: true,
          plan: "TRANSFORMER",
          daysRemaining: 5,
          endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
        }
      };

      localStorage.setItem("mock_user", JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error: any) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (username: string, password: string): Promise<void> => {
    try {
      // MOCK IMPLEMENTATION
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
      
      const mockUser: User = {
        userId: "mock-user-" + Math.random().toString(36).substring(7),
        username: username,
        isAdmin: username.toLowerCase().includes("admin"),
        plan: "TRANSFORMER", // Default trial plan
        basePlan: "EXPLORER",
        subscriptionStatus: "active",
        trial: {
          active: true,
          plan: "TRANSFORMER",
          daysRemaining: 5,
          endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
        }
      };

      localStorage.setItem("mock_user", JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error: any) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // MOCK IMPLEMENTATION
      localStorage.removeItem("mock_user");
      setUser(null);
      setLocation("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
      setLocation("/login");
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
