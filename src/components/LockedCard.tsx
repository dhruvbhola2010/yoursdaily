import { Lock, Lightbulb, BookOpen } from "lucide-react";
import { Card, CardContent } from "./ui/card";
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
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  word: {
    icon: BookOpen,
    title: "Word of the Day",
    preview: "Serendipity (n.) — The occurrence of events by chance in a happy...",
    description: "Expand your vocabulary with carefully selected words and definitions.",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
};

export const LockedCard = ({ type, price }: LockedCardProps) => {
  const config = cardConfig[type];
  const Icon = config.icon;
  const navigate = useNavigate();

  const handleUnlock = () => {
    navigate("/auth");
  };

  return (
    <Card className="bg-card shadow-card card-hover border-0 overflow-hidden relative">
      <CardContent className="p-8 sm:p-10">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${config.iconBg}`}>
            <Icon className={`w-6 h-6 ${config.iconColor}`} />
          </div>
          <div className="flex-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
              {config.title}
            </span>
            
            {/* Blurred preview content */}
            <div className="relative">
              <p className="font-serif text-2xl text-foreground leading-relaxed mb-4 blur-sm select-none">
                {config.preview}
              </p>
              
              {/* Lock overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-transparent via-card/80 to-card">
                <div className="p-4 rounded-full bg-secondary mb-4">
                  <Lock className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground text-center mb-4 max-w-xs">
                  {config.description}
                </p>
                <Button variant="gold" size="lg" onClick={handleUnlock}>
                  Start Free Trial
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Then {price}/month after 7 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
