import { type ContentTheme, useTheme } from "@/contexts/ThemeContext";

const themes: { value: ContentTheme; label: string; icon: string }[] = [
  { value: "all", label: "All", icon: "✦" },
  { value: "stoicism", label: "Stoicism", icon: "🏛" },
  { value: "science", label: "Science", icon: "🔬" },
  { value: "math", label: "Math", icon: "∑" },
  { value: "motivation", label: "Motivation", icon: "🔥" },
  { value: "history", label: "History", icon: "📜" },
  { value: "education", label: "Education", icon: "📚" },
  { value: "self-improvement", label: "Growth", icon: "🌱" },
  { value: "study-tips", label: "Study Tips", icon: "💡" },
];

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-wrap gap-2">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={`px-3.5 py-2 text-xs font-sans tracking-wide rounded-full border transition-all duration-300 ${
            theme === t.value
              ? "border-primary/50 bg-primary/10 text-primary"
              : "border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
          }`}
        >
          <span className="mr-1.5">{t.icon}</span>
          {t.label}
        </button>
      ))}
    </div>
  );
};
