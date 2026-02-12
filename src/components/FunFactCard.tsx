import { Lightbulb } from "lucide-react";

const funFacts = [
  { fact: "Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible.", source: "National Geographic" },
  { fact: "Octopuses have three hearts: two pump blood to the gills, while the third pumps it to the rest of the body.", source: "Smithsonian" },
  { fact: "A group of flamingos is called a 'flamboyance'. They get their pink color from the beta-carotene in their diet.", source: "World Wildlife Fund" },
  { fact: "The shortest war in history lasted only 38-45 minutes. It was between Britain and Zanzibar on August 27, 1896.", source: "History.com" },
  { fact: "Bananas are berries, but strawberries aren't. Botanically, a berry is a fruit produced from a single ovary.", source: "Scientific American" },
];

const getDailyFunFact = () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  return funFacts[dayOfYear % funFacts.length];
};

export const FunFactCard = () => {
  const funFact = getDailyFunFact();

  return (
    <div className="clay-card group hover:-translate-y-2">
      <div className="relative z-10 flex items-start gap-5">
        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-clay-button animate-clay-breathe">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D97706] mb-4 block">
            Fun Fact of the Day
          </span>
          <p className="font-display text-2xl sm:text-3xl text-foreground leading-relaxed mb-4 font-bold">
            {funFact.fact}
          </p>
          <p className="text-sm text-muted-foreground font-semibold">
            Source: {funFact.source}
          </p>
        </div>
      </div>
    </div>
  );
};
