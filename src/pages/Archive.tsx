import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Footer } from "@/components/Footer";

function getDayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const Archive = () => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(1);

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() - offset);
  const dayIndex = getDayOfYear(targetDate);

  const { data: quote } = useQuery({
    queryKey: ["archive-quote", dayIndex],
    queryFn: async () => {
      const { data, error } = await supabase.from("quotes").select("text, author");
      if (error) throw error;
      if (!data || data.length === 0) return null;
      return data[dayIndex % data.length];
    },
  });

  const { data: funFact } = useQuery({
    queryKey: ["archive-fact", dayIndex],
    queryFn: async () => {
      const { data, error } = await supabase.from("fun_facts").select("fact, source");
      if (error) throw error;
      if (!data || data.length === 0) return null;
      return data[dayIndex % data.length];
    },
  });

  const { data: word } = useQuery({
    queryKey: ["archive-word", dayIndex],
    queryFn: async () => {
      const { data, error } = await supabase.from("words").select("word, pronunciation, part_of_speech, definition, example");
      if (error) throw error;
      if (!data || data.length === 0) return null;
      return data[dayIndex % data.length];
    },
  });

  const maxOffset = 30;

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-30 px-4 sm:px-12 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-3xl mx-auto flex items-center justify-between h-16">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-sans">
            Archive
          </p>
          <div className="w-16" />
        </div>
      </nav>

      <div className="flex items-center justify-center gap-6 py-10 sm:py-16">
        <button
          onClick={() => setOffset((o) => Math.min(maxOffset, o + 1))}
          disabled={offset >= maxOffset}
          className={`p-2.5 border border-border rounded-full transition-all ${
            offset >= maxOffset ? "opacity-20 cursor-not-allowed" : "text-muted-foreground hover:text-foreground active:scale-90"
          }`}
          aria-label="Older"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center min-w-[200px]">
          <p className="font-display text-xl sm:text-2xl text-foreground font-light">
            {formatDate(targetDate)}
          </p>
          <p className="text-xs text-muted-foreground mt-1 font-sans">
            {offset === 1 ? "Yesterday" : `${offset} days ago`}
          </p>
        </div>
        <button
          onClick={() => setOffset((o) => Math.max(1, o - 1))}
          disabled={offset <= 1}
          className={`p-2.5 border border-border rounded-full transition-all ${
            offset <= 1 ? "opacity-20 cursor-not-allowed" : "text-muted-foreground hover:text-foreground active:scale-90"
          }`}
          aria-label="Newer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-12 pb-24 space-y-20">
        {quote && (
          <section>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6 font-sans">Quote</p>
            <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground leading-[1.3] font-light italic">
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            <p className="mt-6 text-sm tracking-[0.2em] uppercase text-muted-foreground font-sans font-light">
              — {quote.author}
            </p>
          </section>
        )}

        {funFact && (
          <section>
            <div className="editorial-line mb-10" />
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6 font-sans">Fact of the Day</p>
            <p className="font-display text-xl sm:text-2xl md:text-3xl text-foreground leading-relaxed font-light">
              {funFact.fact}
            </p>
            <p className="mt-6 text-xs text-muted-foreground/60 font-sans tracking-wide">{funFact.source}</p>
          </section>
        )}

        {word && (
          <section>
            <div className="editorial-line mb-10" />
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6 font-sans">Word of the Day</p>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-2 font-light italic">
              {word.word}
            </h3>
            <div className="flex items-center gap-3 text-muted-foreground text-sm font-sans font-light mb-6">
              <span>{word.pronunciation}</span>
              <span className="text-border">·</span>
              <span className="italic">{word.part_of_speech}</span>
            </div>
            <p className="text-lg text-foreground/80 font-light leading-relaxed mb-4">{word.definition}</p>
            <p className="text-muted-foreground/60 italic font-light text-sm">&ldquo;{word.example}&rdquo;</p>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Archive;
