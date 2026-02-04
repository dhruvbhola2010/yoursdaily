import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QuoteCard } from "@/components/QuoteCard";
import { FunFactCard } from "@/components/FunFactCard";
import { WordCard } from "@/components/WordCard";
import { LockedCard } from "@/components/LockedCard";
import { TrialBanner } from "@/components/TrialBanner";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, isInTrial, profile, loading } = useAuth();

  // Determine what content to show
  const canAccessFunFacts =
    user && (isInTrial || profile?.has_fun_facts_subscription);
  const canAccessWord =
    user && (isInTrial || profile?.has_word_subscription);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 pb-12">
        <Hero />
        
        {/* Trial Banner for logged-in users */}
        {user && <TrialBanner />}
        
        {/* Daily Content Cards */}
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
          {/* Quote is always free */}
          <QuoteCard />
          
          {/* Fun Fact - unlocked during trial or with subscription */}
          {loading ? (
            <div className="h-48 bg-card rounded-xl animate-pulse shadow-card" />
          ) : canAccessFunFacts ? (
            <FunFactCard />
          ) : (
            <LockedCard type="funFact" price="$1" />
          )}
          
          {/* Word of the Day - unlocked during trial or with subscription */}
          {loading ? (
            <div className="h-48 bg-card rounded-xl animate-pulse shadow-card" />
          ) : canAccessWord ? (
            <WordCard />
          ) : (
            <LockedCard type="word" price="$1" />
          )}
        </div>
      </main>

      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
