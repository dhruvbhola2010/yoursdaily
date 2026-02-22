import { Quote } from "lucide-react";
import type { ContentTheme } from "./ThemeSelector";

const quotesByTheme: Record<string, { text: string; author: string }[]> = {
  all: [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  ],
  "self-improvement": [
    { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
    { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
    { text: "Growth is the only evidence of life.", author: "John Henry Newman" },
    { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle" },
    { text: "Be not afraid of growing slowly; be afraid only of standing still.", author: "Chinese Proverb" },
  ],
  stoicism: [
    { text: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius" },
    { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
    { text: "It is not things that disturb us, but our judgments about things.", author: "Epictetus" },
    { text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius" },
    { text: "No man is free who is not master of himself.", author: "Epictetus" },
  ],
  education: [
    { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { text: "The mind is not a vessel to be filled, but a fire to be kindled.", author: "Plutarch" },
    { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
    { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
    { text: "Education is not preparation for life; education is life itself.", author: "John Dewey" },
  ],
  science: [
    { text: "Somewhere, something incredible is waiting to be known.", author: "Carl Sagan" },
    { text: "The important thing is not to stop questioning. Curiosity has its own reason for existence.", author: "Albert Einstein" },
    { text: "Science is a way of thinking much more than it is a body of knowledge.", author: "Carl Sagan" },
    { text: "Nothing in life is to be feared, it is only to be understood.", author: "Marie Curie" },
    { text: "Research is what I'm doing when I don't know what I'm doing.", author: "Wernher von Braun" },
  ],
  history: [
    { text: "Those who cannot remember the past are condemned to repeat it.", author: "George Santayana" },
    { text: "History is not the past. It is the present. We carry our history with us.", author: "James Baldwin" },
    { text: "The only thing we learn from history is that we learn nothing from history.", author: "Georg Wilhelm Friedrich Hegel" },
    { text: "A generation which ignores history has no past — and no future.", author: "Robert A. Heinlein" },
    { text: "Study the past if you would define the future.", author: "Confucius" },
  ],
  math: [
    { text: "Mathematics is the queen of the sciences.", author: "Carl Friedrich Gauss" },
    { text: "Pure mathematics is, in its way, the poetry of logical ideas.", author: "Albert Einstein" },
    { text: "Do not worry about your difficulties in mathematics. I can assure you mine are still greater.", author: "Albert Einstein" },
    { text: "The essence of mathematics lies in its freedom.", author: "Georg Cantor" },
    { text: "Mathematics is not about numbers, equations, or algorithms: it is about understanding.", author: "William Paul Thurston" },
  ],
  motivation: [
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Your limitation—it's only your imagination.", author: "Unknown" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
    { text: "Dream bigger. Do bigger.", author: "Unknown" },
  ],
  "study-tips": [
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
    { text: "There are no shortcuts to any place worth going.", author: "Beverly Sills" },
    { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  ],
};

const getDailyQuote = (theme: ContentTheme) => {
  const quotes = quotesByTheme[theme] || quotesByTheme.all;
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  return quotes[dayOfYear % quotes.length];
};

interface QuoteCardProps {
  theme?: ContentTheme;
}

export const QuoteCard = ({ theme = "all" }: QuoteCardProps) => {
  const quote = getDailyQuote(theme);

  return (
    <div className="clay-card group hover:-translate-y-2">
      <div className="relative z-10 flex items-start gap-5">
        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-clay-button animate-clay-breathe">
          <Quote className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">
            Quote of the Day
          </span>
          <blockquote className="font-display text-2xl sm:text-3xl text-foreground leading-relaxed mb-4 font-bold">
            "{quote.text}"
          </blockquote>
          <p className="text-muted-foreground font-semibold">— {quote.author}</p>
        </div>
      </div>
    </div>
  );
};
