import { Sparkles, LogOut, User, Shield, Settings, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ContentTheme } from "./ThemeSelector";

const themes: { id: ContentTheme; label: string }[] = [
  { id: "all", label: "All" },
  { id: "self-improvement", label: "Self Improvement" },
  { id: "stoicism", label: "Stoicism" },
  { id: "education", label: "Education" },
  { id: "science", label: "Science" },
  { id: "history", label: "History" },
  { id: "math", label: "Math" },
  { id: "motivation", label: "Motivation" },
  { id: "study-tips", label: "Study Tips" },
];

interface HeaderProps {
  selectedTheme?: ContentTheme;
  onThemeChange?: (theme: ContentTheme) => void;
}

export const Header = ({ selectedTheme, onThemeChange }: HeaderProps) => {
  const { user, signOut, loading, isAdmin, profile } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [vibeOpen, setVibeOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const vibeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
      if (vibeRef.current && !vibeRef.current.contains(e.target as Node)) setVibeOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const displayName = profile?.display_name || user?.email?.split("@")[0] || "";

  return (
    <header className="w-full py-4 px-4 sm:px-8 relative z-30">
      <div className="max-w-5xl mx-auto">
        <nav className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-8 rounded-[32px] sm:rounded-[40px] bg-white/60 backdrop-blur-xl shadow-clay-card">
          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center shadow-clay-button transition-all duration-300 group-hover:-translate-y-0.5">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-black text-foreground tracking-tight hidden sm:inline">
              Yours Daily
            </span>
          </button>

          {/* Center: Vibe Selector */}
          {onThemeChange && selectedTheme && (
            <div className="relative" ref={vibeRef}>
              <button
                onClick={() => setVibeOpen(!vibeOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur text-sm font-bold text-foreground hover:bg-secondary transition-all duration-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="hidden sm:inline">
                  {themes.find(t => t.id === selectedTheme)?.label || "All"}
                </span>
                <span className="sm:hidden">Vibe</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${vibeOpen ? "rotate-180" : ""}`} />
              </button>

              {vibeOpen && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-56 py-2 rounded-[20px] bg-white/90 backdrop-blur-xl shadow-clay-card border border-white/50 animate-fade-in">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        onThemeChange(theme.id);
                        setVibeOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                        selectedTheme === theme.id
                          ? "text-primary bg-primary/10 font-bold"
                          : "text-foreground hover:bg-secondary/60"
                      }`}
                    >
                      {theme.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Right: User Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {loading ? (
              <div className="w-20 h-11 bg-secondary rounded-[20px] animate-pulse" />
            ) : user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/80 backdrop-blur text-sm font-medium text-foreground hover:bg-secondary transition-all duration-200"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center flex-shrink-0">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate font-bold">{displayName}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
                </button>

                {menuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-52 py-2 rounded-[20px] bg-white/90 backdrop-blur-xl shadow-clay-card border border-white/50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-border/30">
                      <p className="text-xs text-muted-foreground font-medium truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => { navigate("/profile"); setMenuOpen(false); }}
                      className="w-full px-4 py-2.5 text-left text-sm font-medium text-foreground hover:bg-secondary/60 flex items-center gap-2 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Profile Settings
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => { navigate("/admin"); setMenuOpen(false); }}
                        className="w-full px-4 py-2.5 text-left text-sm font-medium text-amber-600 hover:bg-amber-50 flex items-center gap-2 transition-colors"
                      >
                        <Shield className="w-4 h-4" />
                        Admin Dashboard
                      </button>
                    )}

                    <div className="border-t border-border/30 mt-1 pt-1">
                      <button
                        onClick={() => { handleSignOut(); setMenuOpen(false); }}
                        className="w-full px-4 py-2.5 text-left text-sm font-medium text-destructive hover:bg-destructive/10 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
