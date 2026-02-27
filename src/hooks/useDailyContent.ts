import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export function useDailyQuote(theme: string) {
  return useQuery({
    queryKey: ["daily-quote", theme],
    queryFn: async () => {
      const t = theme === "all" ? undefined : theme;
      let query = supabase.from("quotes").select("text, author");
      if (t) query = query.eq("theme", t);
      const { data, error } = await query;
      if (error) throw error;
      if (!data || data.length === 0) return null;
      return data[getDayOfYear() % data.length];
    },
    staleTime: 1000 * 60 * 60,
    placeholderData: (prev) => prev,
  });
}

export function useDailyFunFact(theme: string) {
  return useQuery({
    queryKey: ["daily-fun-fact", theme],
    queryFn: async () => {
      const t = theme === "all" ? undefined : theme;
      let query = supabase.from("fun_facts").select("fact, source");
      if (t) query = query.eq("theme", t);
      const { data, error } = await query;
      if (error) throw error;
      if (!data || data.length === 0) return null;
      return data[getDayOfYear() % data.length];
    },
    staleTime: 1000 * 60 * 60,
    placeholderData: (prev) => prev,
  });
}

export function useDailyWord(theme: string) {
  return useQuery({
    queryKey: ["daily-word", theme],
    queryFn: async () => {
      const t = theme === "all" ? undefined : theme;
      let query = supabase.from("words").select("word, pronunciation, part_of_speech, definition, example");
      if (t) query = query.eq("theme", t);
      const { data, error } = await query;
      if (error) throw error;
      if (!data || data.length === 0) return null;
      return data[getDayOfYear() % data.length];
    },
    staleTime: 1000 * 60 * 60,
    placeholderData: (prev) => prev,
  });
}
