import { Lightbulb } from "lucide-react";
import type { ContentTheme } from "./ThemeSelector";

const factsByTheme: Record<string, { fact: string; source: string }[]> = {
  all: [
    { fact: "Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible.", source: "National Geographic" },
    { fact: "Octopuses have three hearts: two pump blood to the gills, while the third pumps it to the rest of the body.", source: "Smithsonian" },
    { fact: "A group of flamingos is called a 'flamboyance'. They get their pink color from the beta-carotene in their diet.", source: "World Wildlife Fund" },
    { fact: "The shortest war in history lasted only 38-45 minutes between Britain and Zanzibar on August 27, 1896.", source: "History.com" },
    { fact: "Bananas are berries, but strawberries aren't. Botanically, a berry is a fruit produced from a single ovary.", source: "Scientific American" },
  ],
  "self-improvement": [
    { fact: "It takes an average of 66 days to form a new habit, not 21 as commonly believed.", source: "European Journal of Social Psychology" },
    { fact: "Writing down your goals makes you 42% more likely to achieve them.", source: "Dominican University" },
    { fact: "Reading just 20 minutes a day exposes you to about 1.8 million words per year.", source: "Reading Rockets" },
    { fact: "People who exercise regularly are 25% less likely to develop depression or anxiety.", source: "Harvard Medical School" },
    { fact: "Sleeping 7-9 hours improves memory consolidation by up to 40%.", source: "Nature Neuroscience" },
  ],
  stoicism: [
    { fact: "Marcus Aurelius wrote 'Meditations' as a private journal — it was never intended for publication.", source: "Stanford Encyclopedia of Philosophy" },
    { fact: "Stoicism was founded in Athens around 300 BC by Zeno of Citium after a shipwreck changed his life.", source: "Encyclopedia Britannica" },
    { fact: "Seneca was one of the wealthiest men in Rome while teaching about the virtue of simple living.", source: "History.com" },
    { fact: "Epictetus was born a slave and became one of the most influential philosophers in history.", source: "Internet Encyclopedia of Philosophy" },
    { fact: "The word 'stoic' comes from the Greek 'stoa,' meaning porch, where Zeno taught his students.", source: "Oxford Dictionary" },
  ],
  science: [
    { fact: "A teaspoon of a neutron star would weigh about 6 billion tons on Earth.", source: "NASA" },
    { fact: "Your body contains about 37.2 trillion cells, each performing thousands of chemical reactions per second.", source: "National Institutes of Health" },
    { fact: "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.", source: "NASA" },
    { fact: "The human brain can process images in as little as 13 milliseconds.", source: "MIT Research" },
    { fact: "There are more possible iterations of a game of chess than atoms in the known universe.", source: "Scientific American" },
  ],
  history: [
    { fact: "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid.", source: "National Geographic" },
    { fact: "The Great Wall of China is not actually visible from space with the naked eye — that's a myth.", source: "NASA" },
    { fact: "Oxford University is older than the Aztec Empire. Teaching began in Oxford as early as 1096 AD.", source: "University of Oxford" },
    { fact: "Ancient Egyptians used moldy bread as a treatment for infected wounds — an early form of antibiotics.", source: "Smithsonian" },
    { fact: "The Library of Alexandria may have held up to 400,000 scrolls at its peak.", source: "Britannica" },
  ],
  math: [
    { fact: "The number Pi (π) has been calculated to over 100 trillion digits — and it never repeats.", source: "Scientific American" },
    { fact: "Zero was invented independently in India and Mesoamerica, separated by thousands of miles.", source: "History of Mathematics" },
    { fact: "A Rubik's Cube can always be solved in 20 moves or fewer, known as 'God's Number'.", source: "MIT" },
    { fact: "The Fibonacci sequence appears everywhere in nature, from sunflower spirals to hurricane shapes.", source: "Nature" },
    { fact: "There are 10^80 atoms in the universe, but 10^120 possible chess games.", source: "American Mathematical Society" },
  ],
  education: [
    { fact: "Students who teach others retain 90% of what they learn, compared to 10% from lectures alone.", source: "National Training Laboratories" },
    { fact: "Finland has no standardized tests for students under 16, yet consistently ranks among the top in education.", source: "OECD" },
    { fact: "The average person forgets 70% of new information within 24 hours without review.", source: "Ebbinghaus Forgetting Curve" },
    { fact: "Handwriting notes improves recall by 34% compared to typing, according to research.", source: "Psychological Science" },
    { fact: "Spaced repetition can improve long-term retention by up to 200%.", source: "Journal of Experimental Psychology" },
  ],
  motivation: [
    { fact: "Visualizing your goals activates the same neural pathways as actually performing the task.", source: "Journal of Neurophysiology" },
    { fact: "People who maintain a gratitude journal are 25% happier than those who don't.", source: "Journal of Personality and Social Psychology" },
    { fact: "Taking a 10-minute walk can boost your energy more effectively than a cup of coffee.", source: "Health Psychology" },
    { fact: "The 'two-minute rule' suggests: if a task takes less than 2 minutes, do it immediately.", source: "David Allen, Getting Things Done" },
    { fact: "Morning exercise can boost your productivity for up to 10 hours after.", source: "British Journal of Sports Medicine" },
  ],
  "study-tips": [
    { fact: "The Pomodoro Technique (25 min study, 5 min break) increases focus by up to 50%.", source: "Francesco Cirillo" },
    { fact: "Studying in different locations improves recall because the brain creates multiple contextual cues.", source: "Cognitive Psychology" },
    { fact: "Background music without lyrics can improve concentration for up to 60% of students.", source: "Journal of Educational Psychology" },
    { fact: "Testing yourself is 50% more effective for learning than re-reading your notes.", source: "Science Magazine" },
    { fact: "Chewing gum while studying and during tests can improve performance by up to 5%.", source: "British Journal of Psychology" },
  ],
};

const getDailyFunFact = (theme: ContentTheme) => {
  const facts = factsByTheme[theme] || factsByTheme.all;
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  return facts[dayOfYear % facts.length];
};

interface FunFactCardProps {
  theme?: ContentTheme;
}

export const FunFactCard = ({ theme = "all" }: FunFactCardProps) => {
  const funFact = getDailyFunFact(theme);

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
