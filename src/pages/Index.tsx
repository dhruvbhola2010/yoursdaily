import { Header } from "@/components/Header";
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

const Index = () => {
  const { user, isInTrial, profile, loading } = useAuth();

  const canAccessFunFacts =
    user && (isInTrial || profile?.has_fun_facts_subscription);
  const canAccessWord =
    user && (isInTrial || profile?.has_word_subscription);

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingBlobs />
      <Header />

      <main className="max-w-4xl mx-auto px-4 pb-12">
        <Hero />

        {user && <TrialBanner />}

        <div className="space-y-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <QuoteCard />

          {loading ? (
            <div className="h-48 rounded-[32px] bg-white/50 backdrop-blur-xl animate-pulse shadow-clay-card" />
          ) : canAccessFunFacts ? (
            <FunFactCard />
          ) : (
            <LockedCard type="funFact" price="$2" />
          )}

          {loading ? (
            <div className="h-48 rounded-[32px] bg-white/50 backdrop-blur-xl animate-pulse shadow-clay-card" />
          ) : canAccessWord ? (
            <WordCard />
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
