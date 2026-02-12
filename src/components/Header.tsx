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
    <header className="w-full py-4 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <nav className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-8 rounded-[32px] sm:rounded-[40px] bg-white/60 backdrop-blur-xl shadow-clay-card">
          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center shadow-clay-button transition-all duration-300 group-hover:-translate-y-0.5">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-black text-foreground tracking-tight">
              Yours Daily
            </span>
          </button>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {loading ? (
              <div className="w-20 h-11 bg-secondary rounded-[20px] animate-pulse" />
            ) : user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur text-sm text-muted-foreground font-medium">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
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
                <Button variant="clay" size="sm" onClick={() => navigate("/auth")}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
