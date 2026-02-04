import { Sparkles, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="w-full py-6 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-accent" />
          <span className="font-serif text-xl font-semibold text-foreground">
            Yours Daily
          </span>
        </div>
        <nav className="flex items-center gap-3">
          {loading ? (
            <div className="w-20 h-9 bg-secondary animate-pulse rounded-lg" />
          ) : user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span className="max-w-[120px] truncate">{user.email}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-1" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
                Sign In
              </Button>
              <Button variant="gold" size="sm" onClick={() => navigate("/auth")}>
                Start Free Trial
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
