import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QuoteCard } from "@/components/QuoteCard";
import { LockedCard } from "@/components/LockedCard";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 pb-12">
        <Hero />
        
        {/* Daily Content Cards */}
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <QuoteCard />
          <LockedCard type="funFact" price="$1" />
          <LockedCard type="word" price="$1" />
        </div>
      </main>

      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
