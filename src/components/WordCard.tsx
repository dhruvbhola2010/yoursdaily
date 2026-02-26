import { BookOpen } from "lucide-react";
import { useDailyWord } from "@/hooks/useDailyContent";

interface WordCardProps {
  theme?: string;
}

export const WordCard = ({ theme = "all" }: WordCardProps) => {
  const { data: word, isLoading } = useDailyWord(theme);

  if (isLoading) {
    return (
      <div className="clay-card">
        <div className="relative z-10 flex items-start gap-5">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-clay-button animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-3 w-24 bg-secondary rounded-full" />
            <div className="h-8 w-48 bg-secondary rounded-full" />
            <div className="h-4 w-32 bg-secondary rounded-full" />
            <div className="h-5 w-full bg-secondary rounded-full" />
            <div className="h-4 w-3/4 bg-secondary rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!word) return null;

  return (
    <div className="clay-card group hover:-translate-y-2">
      <div className="relative z-10 flex items-start gap-5">
        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-clay-button animate-clay-breathe">
          <BookOpen className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold uppercase tracking-widest text-[#059669] mb-4 block">
            Word of the Day
          </span>
          <div className="mb-4">
            <h3 className="font-display text-3xl sm:text-4xl text-foreground mb-1 font-bold">
              {word.word}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
              <span>{word.pronunciation}</span>
              <span>•</span>
              <span className="italic">{word.part_of_speech}</span>
            </div>
          </div>
          <p className="text-lg text-foreground mb-3 font-medium leading-relaxed">{word.definition}</p>
          <p className="text-muted-foreground italic font-medium">&ldquo;{word.example}&rdquo;</p>
        </div>
      </div>
    </div>
  );
};
