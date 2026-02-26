import { useNavigate } from "react-router-dom";
import { Sparkles, LogOut, User, Shield, Settings, ChevronDown } from "lucide-react";
import { Hero } from "@/components/Hero";
import { QuoteCard } from "@/components/QuoteCard";
import { FunFactCard } from "@/components/FunFactCard";
import { WordCard } from "@/components/WordCard";
import { LockedCard } from "@/components/LockedCard";
import { TrialBanner } from "@/components/TrialBanner";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import FloatingBlobs from "@/components/FloatingBlobs";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

const Index = () => {
  const { user, isInTrial, profile, loading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedTheme = ((profile as any)?.selected_theme || "all") as import("@/components/ThemeSelector").ContentTheme;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const displayName = profile?.display_name || user?.email?.split("@")[0] || "";

  const canAccessFunFacts =
    user && (isInTrial || profile?.has_fun_facts_subscription);
  const canAccessWord =
    user && (isInTrial || profile?.has_word_subscription);

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingBlobs />

      {/* Minimal top-right user menu */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30">
        {loading ? (
          <div className="w-20 h-11 bg-secondary rounded-full animate-pulse" />
        ) : user ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/70 backdrop-blur-xl shadow-clay-card text-sm font-medium text-foreground hover:bg-white/90 transition-all duration-200"
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
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
            <Button variant="clay" size="sm" onClick={() => navigate("/auth")}>
              Get Started
            </Button>
          </div>
        )}
      </div>

      <main className="max-w-4xl mx-auto px-4 pb-12">
        <Hero />

        {user && <TrialBanner />}

        <div className="space-y-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <QuoteCard theme={selectedTheme} />

          {loading ? (
            <div className="h-48 rounded-[32px] bg-white/50 backdrop-blur-xl animate-pulse shadow-clay-card" />
          ) : canAccessFunFacts ? (
            <FunFactCard theme={selectedTheme} />
          ) : (
            <LockedCard type="funFact" price="$2" />
          )}

          {loading ? (
            <div className="h-48 rounded-[32px] bg-white/50 backdrop-blur-xl animate-pulse shadow-clay-card" />
          ) : canAccessWord ? (
            <WordCard theme={selectedTheme} />
          ) : (
            <LockedCard type="word" price="$2" />
          )}
        </div>
      </main>

      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
