import { useState, useEffect, createContext, useContext, ReactNode } from "react";

export type ContentTheme = "all" | "stoicism" | "science" | "math" | "motivation" | "history" | "education" | "self-improvement" | "study-tips";

const THEME_KEY = "yoursdaily-theme";

interface ThemeContextType {
  theme: ContentTheme;
  setTheme: (t: ContentTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "all", setTheme: () => {} });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ContentTheme>(() => {
    try {
      return (localStorage.getItem(THEME_KEY) as ContentTheme) || "all";
    } catch {
      return "all";
    }
  });

  const setTheme = (t: ContentTheme) => {
    setThemeState(t);
    localStorage.setItem(THEME_KEY, t);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
