import { BookOpen } from "lucide-react";
import type { ContentTheme } from "./ThemeSelector";

const wordsByTheme: Record<string, { word: string; pronunciation: string; partOfSpeech: string; definition: string; example: string }[]> = {
  all: [
    { word: "Serendipity", pronunciation: "/ˌser.ənˈdɪp.ə.ti/", partOfSpeech: "noun", definition: "The occurrence of events by chance in a happy or beneficial way.", example: "Finding that rare book in the small bookshop was pure serendipity." },
    { word: "Ephemeral", pronunciation: "/ɪˈfem.ər.əl/", partOfSpeech: "adjective", definition: "Lasting for a very short time.", example: "The ephemeral beauty of cherry blossoms draws visitors each spring." },
    { word: "Mellifluous", pronunciation: "/meˈlɪf.lu.əs/", partOfSpeech: "adjective", definition: "Sweet or musical; pleasant to hear.", example: "Her mellifluous voice captivated the entire audience." },
    { word: "Petrichor", pronunciation: "/ˈpe.trɪ.kɔːr/", partOfSpeech: "noun", definition: "The pleasant, earthy smell after rain falls on dry ground.", example: "After the storm, the petrichor filled the air with freshness." },
    { word: "Sonder", pronunciation: "/ˈsɒn.dər/", partOfSpeech: "noun", definition: "The realization that each passerby has a life as vivid and complex as your own.", example: "Walking through the busy street, she felt a moment of sonder." },
  ],
  "self-improvement": [
    { word: "Eudaimonia", pronunciation: "/juːˌdaɪˈmoʊ.ni.ə/", partOfSpeech: "noun", definition: "Human flourishing; a state of well-being and purposeful living.", example: "She pursued eudaimonia by aligning her career with her values." },
    { word: "Kaizen", pronunciation: "/ˈkaɪ.zɛn/", partOfSpeech: "noun", definition: "Continuous improvement through small, incremental changes.", example: "The team embraced kaizen, improving their process daily." },
    { word: "Resilience", pronunciation: "/rɪˈzɪl.i.əns/", partOfSpeech: "noun", definition: "The capacity to recover quickly from difficulties.", example: "Her resilience after the setback inspired everyone around her." },
    { word: "Tenacious", pronunciation: "/tɪˈneɪ.ʃəs/", partOfSpeech: "adjective", definition: "Holding firmly to something; persistent and determined.", example: "His tenacious pursuit of knowledge set him apart." },
    { word: "Metamorphosis", pronunciation: "/ˌmet.əˈmɔːr.fə.sɪs/", partOfSpeech: "noun", definition: "A complete change of form, structure, or character.", example: "Her personal metamorphosis over the year was remarkable." },
  ],
  stoicism: [
    { word: "Ataraxia", pronunciation: "/ˌæt.əˈræk.si.ə/", partOfSpeech: "noun", definition: "A state of serene calmness; freedom from emotional disturbance.", example: "Through daily meditation, he achieved a sense of ataraxia." },
    { word: "Apatheia", pronunciation: "/ˌæp.əˈθiː.ə/", partOfSpeech: "noun", definition: "Freedom from irrational passions; equanimity of mind.", example: "The Stoics valued apatheia as the path to true wisdom." },
    { word: "Prohairesis", pronunciation: "/proʊ.haɪˈriː.sɪs/", partOfSpeech: "noun", definition: "The faculty of moral choice and rational will.", example: "Epictetus taught that prohairesis is our greatest power." },
    { word: "Eudaimonia", pronunciation: "/juːˌdaɪˈmoʊ.ni.ə/", partOfSpeech: "noun", definition: "The good life achieved through virtue and rational activity.", example: "For the Stoics, eudaimonia was the ultimate goal of existence." },
    { word: "Logos", pronunciation: "/ˈloʊ.ɡɒs/", partOfSpeech: "noun", definition: "The rational principle governing the universe.", example: "The Stoics believed the logos connected all living things." },
  ],
  science: [
    { word: "Entropy", pronunciation: "/ˈen.trə.pi/", partOfSpeech: "noun", definition: "A measure of disorder or randomness in a system.", example: "The second law of thermodynamics states that entropy always increases." },
    { word: "Quasar", pronunciation: "/ˈkweɪ.zɑːr/", partOfSpeech: "noun", definition: "An extremely luminous active galactic nucleus powered by a supermassive black hole.", example: "The quasar was so bright it outshone its entire galaxy." },
    { word: "Symbiosis", pronunciation: "/ˌsɪm.baɪˈoʊ.sɪs/", partOfSpeech: "noun", definition: "A close, prolonged interaction between two different biological organisms.", example: "The clownfish and sea anemone live in perfect symbiosis." },
    { word: "Paradigm", pronunciation: "/ˈpær.ə.daɪm/", partOfSpeech: "noun", definition: "A typical example or pattern of something; a framework of ideas.", example: "The discovery caused a paradigm shift in physics." },
    { word: "Bioluminescence", pronunciation: "/ˌbaɪ.oʊˌluː.mɪˈnes.əns/", partOfSpeech: "noun", definition: "The emission of light by a living organism.", example: "The ocean glowed at night thanks to bioluminescence." },
  ],
  history: [
    { word: "Zeitgeist", pronunciation: "/ˈzaɪt.ɡaɪst/", partOfSpeech: "noun", definition: "The spirit or mood of a particular period of history.", example: "The protest movement captured the zeitgeist of the 1960s." },
    { word: "Hegemony", pronunciation: "/hɪˈdʒem.ə.ni/", partOfSpeech: "noun", definition: "Leadership or dominance, especially by one country over others.", example: "Rome's hegemony over the Mediterranean lasted centuries." },
    { word: "Anachronism", pronunciation: "/əˈnæk.rə.nɪ.zəm/", partOfSpeech: "noun", definition: "A thing belonging to a period other than the one in which it exists.", example: "The wristwatch in the medieval painting was an obvious anachronism." },
    { word: "Manifesto", pronunciation: "/ˌmæn.ɪˈfes.toʊ/", partOfSpeech: "noun", definition: "A public declaration of intentions, motives, or views.", example: "The revolutionary manifesto inspired people across the continent." },
    { word: "Renaissance", pronunciation: "/ˈren.ə.sɑːns/", partOfSpeech: "noun", definition: "A revival of or renewed interest in something; a cultural rebirth.", example: "The city experienced a renaissance of art and innovation." },
  ],
  math: [
    { word: "Algorithm", pronunciation: "/ˈæl.ɡə.rɪ.ðəm/", partOfSpeech: "noun", definition: "A step-by-step procedure for solving a problem or accomplishing a task.", example: "The search algorithm sorted through millions of results in milliseconds." },
    { word: "Asymptote", pronunciation: "/ˈæs.ɪm.toʊt/", partOfSpeech: "noun", definition: "A line that a curve approaches but never quite reaches.", example: "The graph approached the asymptote but never crossed it." },
    { word: "Theorem", pronunciation: "/ˈθɪə.rəm/", partOfSpeech: "noun", definition: "A statement that has been proven true based on previously established axioms.", example: "The Pythagorean theorem is one of the most famous in mathematics." },
    { word: "Fractal", pronunciation: "/ˈfræk.təl/", partOfSpeech: "noun", definition: "A complex geometric shape that looks similar at every scale.", example: "Snowflakes are natural fractals with intricate repeating patterns." },
    { word: "Infinity", pronunciation: "/ɪnˈfɪn.ɪ.ti/", partOfSpeech: "noun", definition: "A quantity without bound or end; the concept of something limitless.", example: "Georg Cantor proved that some infinities are larger than others." },
  ],
  education: [
    { word: "Pedagogy", pronunciation: "/ˈped.ə.ɡɒ.dʒi/", partOfSpeech: "noun", definition: "The method and practice of teaching.", example: "Modern pedagogy emphasizes student-centered learning." },
    { word: "Didactic", pronunciation: "/daɪˈdæk.tɪk/", partOfSpeech: "adjective", definition: "Intended to teach or instruct.", example: "The didactic approach helped students grasp complex concepts." },
    { word: "Curriculum", pronunciation: "/kəˈrɪk.jʊ.ləm/", partOfSpeech: "noun", definition: "The subjects and content taught in a school or educational program.", example: "The new curriculum includes coding from elementary school." },
    { word: "Autodidact", pronunciation: "/ˌɔː.toʊˈdaɪ.dækt/", partOfSpeech: "noun", definition: "A self-taught person.", example: "Leonardo da Vinci was the ultimate autodidact." },
    { word: "Epistemology", pronunciation: "/ɪˌpɪs.tɪˈmɒl.ə.dʒi/", partOfSpeech: "noun", definition: "The branch of philosophy concerned with the nature of knowledge.", example: "Epistemology asks the question: how do we know what we know?" },
  ],
  motivation: [
    { word: "Perseverance", pronunciation: "/ˌpɜːr.sɪˈvɪr.əns/", partOfSpeech: "noun", definition: "Persistence in doing something despite difficulty or delay.", example: "Her perseverance through setbacks led to her breakthrough." },
    { word: "Audacious", pronunciation: "/ɔːˈdeɪ.ʃəs/", partOfSpeech: "adjective", definition: "Showing a willingness to take surprisingly bold risks.", example: "His audacious plan to climb Everest solo stunned everyone." },
    { word: "Indomitable", pronunciation: "/ɪnˈdɒm.ɪ.tə.bəl/", partOfSpeech: "adjective", definition: "Impossible to subdue or defeat.", example: "Her indomitable spirit carried her through every challenge." },
    { word: "Catalyst", pronunciation: "/ˈkæt.əl.ɪst/", partOfSpeech: "noun", definition: "A person or thing that precipitates a change.", example: "The mentor became a catalyst for her personal transformation." },
    { word: "Momentum", pronunciation: "/moʊˈmen.təm/", partOfSpeech: "noun", definition: "The impetus gained by movement or progress.", example: "Once you build momentum, progress becomes effortless." },
  ],
  "study-tips": [
    { word: "Mnemonic", pronunciation: "/nɪˈmɒn.ɪk/", partOfSpeech: "noun", definition: "A pattern of letters, ideas, or associations that aids memory.", example: "ROY G. BIV is a mnemonic for the colors of the rainbow." },
    { word: "Synthesis", pronunciation: "/ˈsɪn.θə.sɪs/", partOfSpeech: "noun", definition: "The combination of ideas to form a theory or system.", example: "Her essay was a brilliant synthesis of multiple viewpoints." },
    { word: "Consolidation", pronunciation: "/kənˌsɒl.ɪˈdeɪ.ʃən/", partOfSpeech: "noun", definition: "The process by which memories become stable and long-lasting.", example: "Sleep plays a key role in memory consolidation." },
    { word: "Annotation", pronunciation: "/ˌæn.oʊˈteɪ.ʃən/", partOfSpeech: "noun", definition: "A note added to a text to explain or comment on it.", example: "Her detailed annotations made the textbook much easier to study." },
    { word: "Cognition", pronunciation: "/kɒɡˈnɪʃ.ən/", partOfSpeech: "noun", definition: "The mental process of acquiring knowledge through thought and experience.", example: "Cognition improves significantly with regular physical exercise." },
  ],
};

const getDailyWord = (theme: ContentTheme) => {
  const words = wordsByTheme[theme] || wordsByTheme.all;
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  return words[dayOfYear % words.length];
};

interface WordCardProps {
  theme?: ContentTheme;
}

export const WordCard = ({ theme = "all" }: WordCardProps) => {
  const word = getDailyWord(theme);

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
            <h3 className="font-display text-3xl sm:text-4xl text-foreground mb-1 font-bold">
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
