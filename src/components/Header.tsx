import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-accent" />
          <span className="font-serif text-xl font-semibold text-foreground">
            Yours Daily
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            About
          </Button>
          <Button variant="gold" size="sm">
            Subscribe
          </Button>
        </nav>
      </div>
    </header>
  );
};
