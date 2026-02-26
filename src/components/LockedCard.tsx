import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LockedCardProps {
  type: "funFact" | "word";
  price: string;
}

const cardConfig = {
  funFact: {
    title: "Fact of the Day",
    preview: "Did you know that honey never spoils? Archaeologists have found...",
    description: "Unlock daily fascinating facts.",
  },
  word: {
    title: "Word of the Day",
    preview: "Serendipity — The occurrence of events by chance in a happy...",
    description: "Expand your vocabulary daily.",
  },
};

export const LockedCard = ({ type, price }: LockedCardProps) => {
  const config = cardConfig[type];
  const navigate = useNavigate();

  return (
    <div>
      <div className="editorial-line mb-12" />
      <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 font-sans">
        {config.title}
      </p>

      <div className="relative">
        <p className="font-display text-2xl sm:text-3xl text-foreground/30 leading-relaxed font-light blur-[6px] select-none">
          {config.preview}
        </p>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Lock className="w-5 h-5 text-muted-foreground/40 mb-4" />
          <p className="text-sm text-muted-foreground/60 text-center mb-4 font-light">
            {config.description}
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="text-sm text-primary/70 hover:text-primary transition-colors duration-300 font-sans font-light tracking-wide"
          >
            Subscribe from {price}/mo →
          </button>
        </div>
      </div>
    </div>
  );
};
