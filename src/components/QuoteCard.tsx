import { Quote } from "lucide-react";
import { useDailyQuote } from "@/hooks/useDailyContent";

interface QuoteCardProps {
  theme?: string;
}

export const QuoteCard = ({ theme = "all" }: QuoteCardProps) => {
  const { data: quote, isLoading } = useDailyQuote(theme);

  if (isLoading) {
    return (
      <div className="clay-card">
        <div className="relative z-10 flex items-start gap-5">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-clay-button animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-3 w-24 bg-secondary rounded-full" />
            <div className="h-6 w-full bg-secondary rounded-full" />
            <div className="h-6 w-3/4 bg-secondary rounded-full" />
            <div className="h-4 w-32 bg-secondary rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!quote) return null;

  return (
    <div className="clay-card group hover:-translate-y-2">
      <div className="relative z-10 flex items-start gap-5">
        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-clay-button animate-clay-breathe">
          <Quote className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">
            Quote of the Day
          </span>
          <blockquote className="font-display text-2xl sm:text-3xl text-foreground leading-relaxed mb-4 font-bold">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <p className="text-muted-foreground font-semibold">— {quote.author}</p>
        </div>
      </div>
    </div>
  );
};
