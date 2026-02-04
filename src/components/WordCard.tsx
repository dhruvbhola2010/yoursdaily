import { BookOpen } from "lucide-react";
import { Card, CardContent } from "./ui/card";

// Sample words - in production, this would come from an API
const words = [
  {
    word: "Serendipity",
    pronunciation: "/ˌser.ənˈdɪp.ə.ti/",
    partOfSpeech: "noun",
    definition:
      "The occurrence of events by chance in a happy or beneficial way.",
    example:
      "Finding that rare book in the small bookshop was pure serendipity.",
  },
  {
    word: "Ephemeral",
    pronunciation: "/ɪˈfem.ər.əl/",
    partOfSpeech: "adjective",
    definition: "Lasting for a very short time.",
    example: "The ephemeral beauty of cherry blossoms draws visitors each spring.",
  },
  {
    word: "Mellifluous",
    pronunciation: "/meˈlɪf.lu.əs/",
    partOfSpeech: "adjective",
    definition: "Sweet or musical; pleasant to hear.",
    example: "Her mellifluous voice captivated the entire audience.",
  },
  {
    word: "Petrichor",
    pronunciation: "/ˈpe.trɪ.kɔːr/",
    partOfSpeech: "noun",
    definition:
      "The pleasant, earthy smell after rain falls on dry ground.",
    example: "After the storm, the petrichor filled the air with freshness.",
  },
  {
    word: "Sonder",
    pronunciation: "/ˈsɒn.dər/",
    partOfSpeech: "noun",
    definition:
      "The realization that each passerby has a life as vivid and complex as your own.",
    example:
      "Walking through the busy street, she felt a moment of sonder.",
  },
];

// Get a consistent word for the day
const getDailyWord = () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return words[dayOfYear % words.length];
};

export const WordCard = () => {
  const word = getDailyWord();

  return (
    <Card className="bg-card shadow-card card-hover border-0 overflow-hidden">
      <CardContent className="p-8 sm:p-10">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-emerald-100">
            <BookOpen className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="flex-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-3 block">
              Word of the Day
            </span>
            <div className="mb-4">
              <h3 className="font-serif text-3xl sm:text-4xl text-foreground mb-1">
                {word.word}
              </h3>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <span>{word.pronunciation}</span>
                <span>•</span>
                <span className="italic">{word.partOfSpeech}</span>
              </div>
            </div>
            <p className="text-lg text-foreground mb-3">{word.definition}</p>
            <p className="text-muted-foreground italic">"{word.example}"</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
