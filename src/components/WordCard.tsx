import { BookOpen } from "lucide-react";

const words = [
  { word: "Serendipity", pronunciation: "/ˌser.ənˈdɪp.ə.ti/", partOfSpeech: "noun", definition: "The occurrence of events by chance in a happy or beneficial way.", example: "Finding that rare book in the small bookshop was pure serendipity." },
  { word: "Ephemeral", pronunciation: "/ɪˈfem.ər.əl/", partOfSpeech: "adjective", definition: "Lasting for a very short time.", example: "The ephemeral beauty of cherry blossoms draws visitors each spring." },
  { word: "Mellifluous", pronunciation: "/meˈlɪf.lu.əs/", partOfSpeech: "adjective", definition: "Sweet or musical; pleasant to hear.", example: "Her mellifluous voice captivated the entire audience." },
  { word: "Petrichor", pronunciation: "/ˈpe.trɪ.kɔːr/", partOfSpeech: "noun", definition: "The pleasant, earthy smell after rain falls on dry ground.", example: "After the storm, the petrichor filled the air with freshness." },
  { word: "Sonder", pronunciation: "/ˈsɒn.dər/", partOfSpeech: "noun", definition: "The realization that each passerby has a life as vivid and complex as your own.", example: "Walking through the busy street, she felt a moment of sonder." },
];

const getDailyWord = () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  return words[dayOfYear % words.length];
};

export const WordCard = () => {
  const word = getDailyWord();

  return (
    <div className="clay-card group hover:-translate-y-2">
      <div className="relative z-10 flex items-start gap-5">
        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-clay-button animate-clay-breathe">
          <BookOpen className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold uppercase tracking-widest text-[#059669] mb-4 block">
            Word of the Day
          </span>
          <div className="mb-4">
            <h3 className="font-display text-3xl sm:text-4xl text-foreground mb-1 font-black">
              {word.word}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
              <span>{word.pronunciation}</span>
              <span>•</span>
              <span className="italic">{word.partOfSpeech}</span>
            </div>
          </div>
          <p className="text-lg text-foreground mb-3 font-medium leading-relaxed">{word.definition}</p>
          <p className="text-muted-foreground italic font-medium">"{word.example}"</p>
        </div>
      </div>
    </div>
  );
};
