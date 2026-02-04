import { Lightbulb } from "lucide-react";
import { Card, CardContent } from "./ui/card";

// Sample fun facts - in production, this would come from an API
const funFacts = [
  {
    fact: "Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible.",
    source: "National Geographic",
  },
  {
    fact: "Octopuses have three hearts: two pump blood to the gills, while the third pumps it to the rest of the body.",
    source: "Smithsonian",
  },
  {
    fact: "A group of flamingos is called a 'flamboyance'. They get their pink color from the beta-carotene in their diet.",
    source: "World Wildlife Fund",
  },
  {
    fact: "The shortest war in history lasted only 38-45 minutes. It was between Britain and Zanzibar on August 27, 1896.",
    source: "History.com",
  },
  {
    fact: "Bananas are berries, but strawberries aren't. Botanically, a berry is a fruit produced from a single ovary.",
    source: "Scientific American",
  },
];

// Get a consistent fun fact for the day
const getDailyFunFact = () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return funFacts[dayOfYear % funFacts.length];
};

export const FunFactCard = () => {
  const funFact = getDailyFunFact();

  return (
    <Card className="bg-card shadow-card card-hover border-0 overflow-hidden">
      <CardContent className="p-8 sm:p-10">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-100">
            <Lightbulb className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-3 block">
              Fun Fact of the Day
            </span>
            <p className="font-serif text-2xl sm:text-3xl text-foreground leading-relaxed mb-4">
              {funFact.fact}
            </p>
            <p className="text-sm text-muted-foreground">
              Source: {funFact.source}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
