/**
 * Admin Subscriber Management Page
 * 
 * ADD TO YOUR APP:
 * 1. Save this file as: client/src/pages/admin-subscribers.tsx
 * 2. In your router (likely client/src/App.tsx or similar), add:
 *    import AdminSubscribersPage from "./pages/admin-subscribers";
 *    <Route path="/admin/subscribers" component={AdminSubscribersPage} />
 * 3. Optionally link it from admin-dashboard.tsx sidebar "Users" button:
 *    <Link href="/admin/subscribers">
 *      <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
 *        <Users className="w-5 h-5" />
 *        Users
 *      </Button>
 *    </Link>
 */

import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Users,
  Shield,
  ShieldCheck,
  Search,
  RefreshCw,
  UserCog,
  Crown,
  XCircle,
  ChevronUp,
  Eye,
  EyeOff,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/footer";

interface Subscriber {
  id: string;
  username: string;
  password: string;
  isAdmin: boolean;
  plan: string;
  status: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    userId: string;
    plan: string;
    username: string;
  } | null>(null);

  // Fetch subscribers on mount
  useEffect(() => {
    fetchSubscribers();
  }, []);

  async function fetchSubscribers() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/subscribers", {
        credentials: "include",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to fetch");
      }
      const data = await res.json();
      setSubscribers(data.subscribers);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  }

  async function updatePlan(userId: string, plan: string) {
    setUpdatingUserId(userId);
    try {
      const res = await fetch(`/api/admin/subscribers/${userId}/plan`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ plan }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update");
      }
      // Refresh the list
      await fetchSubscribers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update plan");
    } finally {
      setUpdatingUserId(null);
      setConfirmAction(null);
    }
  }

  function handleCopyId(id: string) {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  // Filter subscribers by search query
  const filtered = subscribers.filter(
    (s) =>
      s.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.plan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Counts for summary cards
  const totalUsers = subscribers.length;
  const implementerCount = subscribers.filter((s) => s.plan === "IMPLEMENTER").length;
  const transformerCount = subscribers.filter((s) => s.plan === "TRANSFORMER").length;
  const explorerCount = subscribers.filter((s) => s.plan === "EXPLORER").length;

  // Plan badge styles
  function planBadge(plan: string) {
    switch (plan) {
      case "IMPLEMENTER":
        return "bg-purple-100 text-purple-700 border border-purple-200";
      case "TRANSFORMER":
        return "bg-teal-100 text-teal-700 border border-teal-200";
      case "EXPLORER":
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <ArrowLeft className="w-4 h-4" />
              Admin Dashboard
            </Button>
          </Link>
        </div>
        <h1 className="text-lg font-bold">Subscriber Management</h1>
        <div className="w-32" />
      </div>

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Users className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalUsers}</p>
                  <p className="text-xs text-muted-foreground">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Crown className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{implementerCount}</p>
                  <p className="text-xs text-muted-foreground">Implementers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{transformerCount}</p>
                  <p className="text-xs text-muted-foreground">Transformers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Shield className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{explorerCount}</p>
                  <p className="text-xs text-muted-foreground">Explorers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by username, ID, or plan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-200 rounded-lg"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPasswords(!showPasswords)}
              className="gap-2 rounded-lg"
            >
              {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPasswords ? "Hide Passwords" : "Show Passwords"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchSubscribers}
              disabled={loading}
              className="gap-2 rounded-lg"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
            <span className="text-sm">{error}</span>
            <Button variant="ghost" size="sm" onClick={() => setError(null)}>
              Dismiss
            </Button>
          </div>
        )}

        {/* Confirmation Dialog */}
        {confirmAction && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-none shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${confirmAction.plan === "IMPLEMENTER" ? "bg-purple-100" : "bg-gray-100"}`}>
                    <UserCog className={`w-5 h-5 ${confirmAction.plan === "IMPLEMENTER" ? "text-purple-600" : "text-gray-600"}`} />
                  </div>
                  <h3 className="text-lg font-bold">Confirm Plan Change</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  You are about to change the plan for:
                </p>
                <p className="text-sm font-semibold mb-4">{confirmAction.username}</p>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-sm">New plan:</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${planBadge(confirmAction.plan)}`}>
                    {confirmAction.plan}
                  </span>
                </div>
                <div className="flex gap-3 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setConfirmAction(null)}
                    className="rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => updatePlan(confirmAction.userId, confirmAction.plan)}
                    disabled={updatingUserId === confirmAction.userId}
                    className={`rounded-lg ${
                      confirmAction.plan === "IMPLEMENTER"
                        ? "bg-purple-600 hover:bg-purple-700"
                        : confirmAction.plan === "EXPLORER"
                        ? "bg-gray-600 hover:bg-gray-700"
                        : "bg-teal-600 hover:bg-teal-700"
                    }`}
                  >
                    {updatingUserId === confirmAction.userId ? (
                      <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    Confirm Change
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Subscriber Table */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <UserCog className="w-5 h-5" />
              All Subscribers ({filtered.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
                <span className="ml-3 text-muted-foreground">Loading subscribers...</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No subscribers found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/80">
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                        User
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                        Password
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                        Stripe ID
                      </th>
                      <th className="text-right px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((sub) => (
                      <tr
                        key={sub.id}
                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                      >
                        {/* User Info */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                                sub.isAdmin
                                  ? "bg-teal-900 text-white"
                                  : sub.plan === "IMPLEMENTER"
                                  ? "bg-purple-100 text-purple-700"
                                  : sub.plan === "TRANSFORMER"
                                  ? "bg-teal-100 text-teal-700"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {sub.username.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-sm flex items-center gap-1.5">
                                {sub.username}
                                {sub.isAdmin && (
                                  <span className="text-[10px] bg-teal-900 text-white px-1.5 py-0.5 rounded-full font-semibold">
                                    ADMIN
                                  </span>
                                )}
                              </p>
                              <button
                                onClick={() => handleCopyId(sub.id)}
                                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                title="Click to copy ID"
                              >
                                <span className="font-mono">{sub.id.substring(0, 8)}...</span>
                                {copiedId === sub.id ? (
                                  <Check className="w-3 h-3 text-green-500" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Password */}
                        <td className="px-4 py-4">
                          <span className="font-mono text-xs bg-gray-50 px-2 py-1 rounded">
                            {showPasswords ? sub.password : "••••••••"}
                          </span>
                        </td>

                        {/* Plan Badge */}
                        <td className="px-4 py-4">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${planBadge(sub.plan)}`}
                          >
                            {sub.plan}
                          </span>
                        </td>

                        {/* Stripe ID */}
                        <td className="px-4 py-4">
                          {sub.stripeCustomerId ? (
                            <span className="font-mono text-xs text-muted-foreground">
                              {sub.stripeCustomerId.substring(0, 14)}...
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">None</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-2">
                            {!sub.isAdmin && (
                              <>
                                {sub.plan !== "IMPLEMENTER" && (
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      setConfirmAction({
                                        userId: sub.id,
                                        plan: "IMPLEMENTER",
                                        username: sub.username,
                                      })
                                    }
                                    disabled={updatingUserId === sub.id}
                                    className="h-8 text-xs rounded-lg bg-purple-600 hover:bg-purple-700 gap-1.5"
                                  >
                                    <ChevronUp className="w-3 h-3" />
                                    Set Implementer
                                  </Button>
                                )}
                                {sub.plan !== "EXPLORER" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      setConfirmAction({
                                        userId: sub.id,
                                        plan: "EXPLORER",
                                        username: sub.username,
                                      })
                                    }
                                    disabled={updatingUserId === sub.id}
                                    className="h-8 text-xs rounded-lg border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 gap-1.5"
                                  >
                                    <XCircle className="w-3 h-3" />
                                    Cancel Plan
                                  </Button>
                                )}
                              </>
                            )}
                            {sub.isAdmin && (
                              <span className="text-xs text-muted-foreground italic px-2">
                                Admin — no changes needed
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}