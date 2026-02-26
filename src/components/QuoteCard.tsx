import { useDailyQuote } from "@/hooks/useDailyContent";

interface QuoteCardProps {
  theme?: string;
}

export const QuoteCard = ({ theme = "all" }: QuoteCardProps) => {
  const { data: quote, isLoading } = useDailyQuote(theme);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-3/4 mx-auto bg-secondary/30 rounded animate-pulse" />
        <div className="h-8 w-1/2 mx-auto bg-secondary/30 rounded animate-pulse" />
        <div className="h-4 w-32 mx-auto bg-secondary/20 rounded animate-pulse mt-8" />
      </div>
    );
  }

  if (!quote) return null;

  return (
    <div>
      <blockquote
        className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.2] font-light italic animate-cinema-reveal-slow"
        style={{ animationDelay: "0.5s" }}
      >
        &ldquo;{quote.text}&rdquo;
      </blockquote>
      <p
        className="mt-10 text-sm tracking-[0.2em] uppercase text-muted-foreground font-sans font-light animate-cinema-reveal"
        style={{ animationDelay: "1.5s" }}
      >
        — {quote.author}
      </p>
    </div>
  );
};
