import { Lock, Lightbulb, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface LockedCardProps {
  type: "funFact" | "word";
  price: string;
}

const cardConfig = {
  funFact: {
    icon: Lightbulb,
    title: "Fun Fact of the Day",
    preview: "Did you know that honey never spoils? Archaeologists have found...",
    description: "Unlock daily fascinating facts that will surprise and delight you.",
    gradient: "from-amber-400 to-amber-600",
  },
  word: {
    icon: BookOpen,
    title: "Word of the Day",
    preview: "Serendipity (n.) — The occurrence of events by chance in a happy...",
    description: "Expand your vocabulary with carefully selected words and definitions.",
    gradient: "from-emerald-400 to-emerald-600",
  },
};

export const LockedCard = ({ type, price }: LockedCardProps) => {
  const config = cardConfig[type];
  const Icon = config.icon;
  const navigate = useNavigate();

  return (
    <div className="clay-card relative">
      <div className="relative z-10 flex items-start gap-5">
        <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-clay-button opacity-50`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 block">
            {config.title}
          </span>

          {/* Blurred preview */}
          <div className="relative">
            <p className="font-display text-2xl text-foreground leading-relaxed mb-4 blur-sm select-none font-bold">
              {config.preview}
            </p>

            {/* Lock overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-transparent via-white/60 to-white/90 backdrop-blur-[2px]">
              <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-xl shadow-clay-card flex items-center justify-center mb-4 animate-clay-breathe">
                <Lock className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground text-center mb-4 max-w-xs font-medium">
                {config.description}
              </p>
              <Button variant="clay" size="default" onClick={() => navigate("/auth")}>
                Subscribe to Unlock
              </Button>
              <p className="text-xs text-muted-foreground mt-2 font-medium">
                Starting at {price}/month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
