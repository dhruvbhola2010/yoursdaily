import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Users, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import FloatingBlobs from "@/components/FloatingBlobs";
import { Header } from "@/components/Header";

interface UserRow {
  id: string;
  email: string | null;
  display_name: string | null;
  has_fun_facts_subscription: boolean;
  has_word_subscription: boolean;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    setUsers((data as UserRow[]) || []);
    setLoadingUsers(false);
  };

  if (loading || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingBlobs />
      <Header />

      <main className="max-w-5xl mx-auto px-4 pb-12 relative z-10">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-clay-button">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-black text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground font-medium">Manage your platform</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Users", value: users.length, icon: Users, color: "from-violet-400 to-violet-600" },
            { label: "Subscribers", value: users.filter(u => u.has_fun_facts_subscription).length, icon: FileText, color: "from-emerald-400 to-emerald-600" },
          ].map((stat) => (
            <Card key={stat.label} className="shadow-clay-card">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-clay-button`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-display text-2xl font-black text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Users Table */}
        <Card className="shadow-clay-card overflow-hidden">
          <CardHeader>
            <h2 className="font-display text-xl font-bold text-foreground">All Users</h2>
          </CardHeader>
          <CardContent className="p-0">
            {loadingUsers ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50 bg-secondary/30">
                      <th className="px-6 py-3 text-left font-bold text-muted-foreground">Email</th>
                      <th className="px-6 py-3 text-left font-bold text-muted-foreground">Name</th>
                      <th className="px-6 py-3 text-left font-bold text-muted-foreground">Subscribed</th>
                      <th className="px-6 py-3 text-left font-bold text-muted-foreground">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-border/30 hover:bg-secondary/20 transition-colors">
                        <td className="px-6 py-4 font-medium text-foreground">{u.email || "—"}</td>
                        <td className="px-6 py-4 text-muted-foreground">{u.display_name || "—"}</td>
                        <td className="px-6 py-4">
                          {u.has_fun_facts_subscription ? (
                            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">Active</span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-bold">Free</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground text-xs">
                          {new Date(u.created_at).toLocaleDateString()}
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
    </div>
  );
};

export default Admin;
