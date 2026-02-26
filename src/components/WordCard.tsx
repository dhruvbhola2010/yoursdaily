import { useDailyWord } from "@/hooks/useDailyContent";

interface WordCardProps {
  theme?: string;
}

export const WordCard = ({ theme = "all" }: WordCardProps) => {
  const { data: word, isLoading } = useDailyWord(theme);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-3 w-24 bg-secondary/30 rounded animate-pulse" />
        <div className="h-10 w-48 bg-secondary/20 rounded animate-pulse" />
        <div className="h-4 w-32 bg-secondary/20 rounded animate-pulse" />
        <div className="h-5 w-full bg-secondary/20 rounded animate-pulse mt-6" />
      </div>
    );
  }

  if (!word) return null;

  return (
    <div>
      <div className="editorial-line mb-12" />
      <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 font-sans">
        Word of the Day
      </p>
      <h3 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-3 font-light italic">
        {word.word}
      </h3>
      <div className="flex items-center gap-3 text-muted-foreground text-sm font-sans font-light mb-8">
        <span>{word.pronunciation}</span>
        <span className="text-border">·</span>
        <span className="italic">{word.part_of_speech}</span>
      </div>
      <p className="text-lg sm:text-xl text-foreground/80 font-light leading-relaxed mb-6">
        {word.definition}
      </p>
      <p className="text-muted-foreground/60 italic font-light text-sm">
        &ldquo;{word.example}&rdquo;
      </p>
    </div>
  );
};
