import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Users, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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
    if (!loading && (!user || !isAdmin)) navigate("/");
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) fetchUsers();
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
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/[0.02] blur-[100px] rounded-full" />
      </div>

      <main className="max-w-4xl mx-auto px-6 sm:px-12 py-12 relative z-10">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-light mb-16">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 font-sans">Administration</p>
          <h1 className="font-display text-4xl text-foreground font-light">Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-px bg-border/50 mb-16">
          <div className="bg-background p-8">
            <p className="font-display text-3xl text-foreground font-light mb-2">{users.length}</p>
            <p className="text-xs text-muted-foreground tracking-wide font-sans">Total Users</p>
          </div>
          <div className="bg-background p-8">
            <p className="font-display text-3xl text-foreground font-light mb-2">
              {users.filter(u => u.has_fun_facts_subscription).length}
            </p>
            <p className="text-xs text-muted-foreground tracking-wide font-sans">Subscribers</p>
          </div>
        </div>

        {/* Users Table */}
        <div>
          <div className="editorial-line mb-8" />
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 font-sans">Users</p>

          {loadingUsers ? (
            <p className="text-sm text-muted-foreground font-light">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="pb-3 text-left text-xs tracking-wide text-muted-foreground font-sans font-normal">Email</th>
                    <th className="pb-3 text-left text-xs tracking-wide text-muted-foreground font-sans font-normal">Name</th>
                    <th className="pb-3 text-left text-xs tracking-wide text-muted-foreground font-sans font-normal">Status</th>
                    <th className="pb-3 text-left text-xs tracking-wide text-muted-foreground font-sans font-normal">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                      <td className="py-4 text-foreground/80 font-light">{u.email || "—"}</td>
                      <td className="py-4 text-muted-foreground font-light">{u.display_name || "—"}</td>
                      <td className="py-4">
                        <span className={`text-xs font-light tracking-wide ${u.has_fun_facts_subscription ? "text-primary" : "text-muted-foreground/50"}`}>
                          {u.has_fun_facts_subscription ? "Active" : "Free"}
                        </span>
                      </td>
                      <td className="py-4 text-muted-foreground/50 text-xs font-light">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
