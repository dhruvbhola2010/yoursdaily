import { useDailyFunFact } from "@/hooks/useDailyContent";
import { useTheme } from "@/contexts/ThemeContext";

export const FunFactCard = () => {
  const { theme } = useTheme();
  const { data: funFact, isLoading } = useDailyFunFact(theme);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-3 w-24 bg-secondary/30 rounded animate-pulse" />
        <div className="h-6 w-full bg-secondary/20 rounded animate-pulse" />
        <div className="h-6 w-5/6 bg-secondary/20 rounded animate-pulse" />
        <div className="h-3 w-32 bg-secondary/20 rounded animate-pulse mt-6" />
      </div>
    );
  }

  if (!funFact) return null;

  return (
    <div>
      <div className="editorial-line mb-12" />
      <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 font-sans">Fact of the Day</p>
      <p className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground leading-relaxed font-light">{funFact.fact}</p>
      <p className="mt-8 text-xs text-muted-foreground/60 font-sans tracking-wide">{funFact.source}</p>
    </div>
  );
};
