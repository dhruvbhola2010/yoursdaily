import { Quote } from "lucide-react";
import { Card, CardContent } from "./ui/card";

// Sample quotes - in production, this would come from an API
const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  {
    text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
];

// Get a consistent quote for the day
const getDailyQuote = () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return quotes[dayOfYear % quotes.length];
};

export const QuoteCard = () => {
  const quote = getDailyQuote();

  return (
    <Card className="bg-card shadow-card card-hover border-0 overflow-hidden">
      <CardContent className="p-8 sm:p-10">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-secondary">
            <Quote className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-3 block">
              Quote of the Day
            </span>
            <blockquote className="font-serif text-2xl sm:text-3xl text-foreground leading-relaxed mb-4">
              "{quote.text}"
            </blockquote>
            <p className="text-muted-foreground font-medium">— {quote.author}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
