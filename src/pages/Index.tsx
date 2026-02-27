import { useNavigate } from "react-router-dom";
import { QuoteCard } from "@/components/QuoteCard";
import { FunFactCard } from "@/components/FunFactCard";
import { WordCard } from "@/components/WordCard";
import { Footer } from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

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
          <button onClick={() => navigate("/archive")} className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-light">
            Archive
          </button>
        </div>
      </nav>

      {/* Hero — cinematic quote reveal */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 relative">
        <p
          className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-16 animate-cinema-reveal"
          style={{ animationDelay: "0.2s" }}
        >
          {today}
        </p>

        <div className="max-w-3xl mx-auto text-center">
          <QuoteCard />
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-cinema-reveal" style={{ animationDelay: "2s" }}>
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-muted-foreground/30" />
        </div>
      </section>

      {/* Content sections */}
      <main className="max-w-3xl mx-auto px-6 sm:px-12 pb-24">
        <div className="space-y-24">
          <section className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <FunFactCard />
          </section>

          <section className="animate-fade-in" style={{ animationDelay: "400ms" }}>
            <WordCard />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
