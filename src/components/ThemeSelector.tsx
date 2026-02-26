import {
  Brain,
  Flame,
  GraduationCap,
  FlaskConical,
  Landmark,
  Calculator,
  Dumbbell,
  BookHeart,
  Sparkles,
} from "lucide-react";

export type ContentTheme =
  | "all"
  | "self-improvement"
  | "stoicism"
  | "education"
  | "science"
  | "history"
  | "math"
  | "motivation"
  | "study-tips";

interface ThemeSelectorProps {
  selected: ContentTheme;
  onChange: (theme: ContentTheme) => void;
}

const themes: { id: ContentTheme; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "self-improvement", label: "Self Improvement", icon: Brain },
  { id: "stoicism", label: "Stoicism", icon: Flame },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "science", label: "Science", icon: FlaskConical },
  { id: "history", label: "History", icon: Landmark },
  { id: "math", label: "Math", icon: Calculator },
  { id: "motivation", label: "Motivation", icon: Dumbbell },
  { id: "study-tips", label: "Study Tips", icon: BookHeart },
];

export const ThemeSelector = ({ selected, onChange }: ThemeSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {themes.map((theme) => {
        const Icon = theme.icon;
        const isSelected = selected === theme.id;
        return (
          <button
            key={theme.id}
            onClick={() => onChange(theme.id)}
            className={`
              inline-flex items-center gap-2 px-4 py-2.5 text-xs tracking-wide font-sans font-light
              transition-all duration-300 border
              ${
                isSelected
                  ? "border-primary/40 text-primary bg-primary/5"
                  : "border-border/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              }
            `}
          >
            <Icon className="w-3 h-3" />
            {theme.label}
          </button>
        );
      })}
    </div>
  );
};
