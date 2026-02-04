import { Sparkles } from "lucide-react";

export const Hero = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="text-center py-16 px-4 animate-fade-in">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-6">
        <Sparkles className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium text-muted-foreground">{today}</span>
      </div>
      
      <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-tight">
        Yours <span className="text-gradient-gold">Daily</span>
      </h1>
      
      <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Start each day with inspiration, knowledge, and wonder. 
        A curated collection of wisdom delivered fresh to you.
      </p>
    </section>
  );
};
