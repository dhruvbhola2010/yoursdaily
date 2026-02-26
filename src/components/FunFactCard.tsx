import { Lightbulb } from "lucide-react";
import { useDailyFunFact } from "@/hooks/useDailyContent";

interface FunFactCardProps {
  theme?: string;
}

export const FunFactCard = ({ theme = "all" }: FunFactCardProps) => {
  const { data: funFact, isLoading } = useDailyFunFact(theme);

  if (isLoading) {
    return (
      <div className="clay-card">
        <div className="relative z-10 flex items-start gap-5">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-clay-button animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-3 w-28 bg-secondary rounded-full" />
            <div className="h-6 w-full bg-secondary rounded-full" />
            <div className="h-6 w-5/6 bg-secondary rounded-full" />
            <div className="h-4 w-36 bg-secondary rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!funFact) return null;

  return (
    <div className="clay-card group hover:-translate-y-2">
      <div className="relative z-10 flex items-start gap-5">
        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-clay-button animate-clay-breathe">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D97706] mb-4 block">
            Fun Fact of the Day
          </span>
          <p className="font-display text-2xl sm:text-3xl text-foreground leading-relaxed mb-4 font-bold">
            {funFact.fact}
          </p>
          <p className="text-sm text-muted-foreground font-semibold">
            Source: {funFact.source}
          </p>
        </div>
      </div>
    </div>
  );
};
