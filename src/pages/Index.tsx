import { useNavigate } from "react-router-dom";
import { LogOut, User, Shield, Settings, ChevronDown } from "lucide-react";
import { QuoteCard } from "@/components/QuoteCard";
import { FunFactCard } from "@/components/FunFactCard";
import { WordCard } from "@/components/WordCard";
import { LockedCard } from "@/components/LockedCard";
import { TrialBanner } from "@/components/TrialBanner";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import type { ContentTheme } from "@/components/ThemeSelector";

const Index = () => {
  const { user, isInTrial, profile, loading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedTheme = ((profile as any)?.selected_theme || "all") as ContentTheme;

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

  const canAccessFunFacts = user && (isInTrial || profile?.has_fun_facts_subscription);
  const canAccessWord = user && (isInTrial || profile?.has_word_subscription);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle ambient glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/[0.03] blur-[120px] rounded-full animate-subtle-glow" />
      </div>

      {/* Top navigation */}
      <nav className="fixed top-0 left-0 right-0 z-30 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-20">
          <button onClick={() => navigate("/")} className="text-foreground/60 hover:text-foreground transition-colors duration-500 text-xs tracking-[0.3em] uppercase font-sans font-medium">
            Yours Daily
          </button>

          <div className="flex items-center gap-6">
            {loading ? (
              <div className="w-16 h-8 bg-secondary rounded animate-pulse" />
            ) : user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <span className="hidden sm:inline font-light">{displayName}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`} />
                </button>

                {menuOpen && (
                  <div className="absolute top-full right-0 mt-3 w-48 py-2 bg-card border border-border rounded animate-fade-in">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { navigate("/profile"); setMenuOpen(false); }}
                      className="w-full px-4 py-2.5 text-left text-sm text-foreground/70 hover:text-foreground hover:bg-secondary/50 flex items-center gap-2 transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      Settings
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => { navigate("/admin"); setMenuOpen(false); }}
                        className="w-full px-4 py-2.5 text-left text-sm text-primary/70 hover:text-primary hover:bg-secondary/50 flex items-center gap-2 transition-colors"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        Admin
                      </button>
                    )}
                    <div className="border-t border-border mt-1 pt-1">
                      <button
                        onClick={() => { handleSignOut(); setMenuOpen(false); }}
                        className="w-full px-4 py-2.5 text-left text-sm text-destructive/70 hover:text-destructive hover:bg-secondary/50 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <button onClick={() => navigate("/auth")} className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-light">
                  Sign In
                </button>
                <button onClick={() => navigate("/auth")} className="text-sm text-primary/80 hover:text-primary transition-colors duration-300 font-light">
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero — cinematic quote reveal */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 relative">
        {/* Date */}
        <p
          className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-16 animate-cinema-reveal"
          style={{ animationDelay: "0.2s" }}
        >
          {today}
        </p>

        {/* Quote */}
        <div className="max-w-3xl mx-auto text-center">
          <QuoteCard theme={selectedTheme} />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-cinema-reveal" style={{ animationDelay: "2s" }}>
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-muted-foreground/30" />
        </div>
      </section>

      {/* Content sections */}
      <main className="max-w-3xl mx-auto px-6 sm:px-12 pb-24">
        {user && <TrialBanner />}

        <div className="space-y-24">
          {/* Fun Fact */}
          <section className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            {loading ? (
              <div className="h-32 bg-secondary/30 animate-pulse rounded" />
            ) : canAccessFunFacts ? (
              <FunFactCard theme={selectedTheme} />
            ) : (
              <LockedCard type="funFact" price="$2" />
            )}
          </section>

          {/* Word */}
          <section className="animate-fade-in" style={{ animationDelay: "400ms" }}>
            {loading ? (
              <div className="h-32 bg-secondary/30 animate-pulse rounded" />
            ) : canAccessWord ? (
              <WordCard theme={selectedTheme} />
            ) : (
              <LockedCard type="word" price="$2" />
            )}
          </section>
        </div>
      </main>

      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
