import { useState } from "react";
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

const themes: { id: ContentTheme; label: string; icon: React.ElementType; color: string }[] = [
  { id: "all", label: "All", icon: Sparkles, color: "from-purple-400 to-purple-600" },
  { id: "self-improvement", label: "Self Improvement", icon: Brain, color: "from-violet-400 to-violet-600" },
  { id: "stoicism", label: "Stoicism", icon: Flame, color: "from-slate-400 to-slate-600" },
  { id: "education", label: "Education", icon: GraduationCap, color: "from-blue-400 to-blue-600" },
  { id: "science", label: "Science", icon: FlaskConical, color: "from-emerald-400 to-emerald-600" },
  { id: "history", label: "History", icon: Landmark, color: "from-amber-400 to-amber-600" },
  { id: "math", label: "Math", icon: Calculator, color: "from-pink-400 to-pink-600" },
  { id: "motivation", label: "Motivation", icon: Dumbbell, color: "from-orange-400 to-orange-600" },
  { id: "study-tips", label: "Study Tips", icon: BookHeart, color: "from-cyan-400 to-cyan-600" },
];

export const ThemeSelector = ({ selected, onChange }: ThemeSelectorProps) => {
  return (
    <div className="mb-8 animate-fade-in">
      <h3 className="font-display text-lg font-bold text-foreground mb-4 tracking-tight">
        Choose Your Vibe
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {themes.map((theme) => {
          const Icon = theme.icon;
          const isSelected = selected === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => onChange(theme.id)}
              className={`
                inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold
                transition-all duration-300 hover:-translate-y-0.5
                ${
                  isSelected
                    ? "bg-gradient-to-br text-white shadow-clay-button " + theme.color
                    : "bg-white/70 backdrop-blur-xl text-muted-foreground shadow-clay-card hover:text-foreground"
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {theme.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
