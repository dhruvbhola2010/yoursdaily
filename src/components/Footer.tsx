import { Sparkles, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="clay-card !p-8 sm:!p-10 hover:!-translate-y-0">
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-lg font-black text-foreground">
                Yours Daily
              </span>
            </div>

            <p className="text-sm text-muted-foreground flex items-center gap-1 font-medium">
              Made with <Heart className="w-4 h-4 text-accent fill-accent" /> for curious minds
            </p>

            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
