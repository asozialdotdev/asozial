"use client";
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: (e: React.MouseEvent) => void;
};

const defaultContextValue: ThemeContextType = {
  isDarkMode: false,
  toggleTheme: () => {},
};

const ThemeContext = createContext(defaultContextValue);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { value: isDarkMode, setValue: setIsDarkMode } = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode",
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    },
    [isDarkMode],
  );

  function toggleTheme(e: React.MouseEvent) {
    e.stopPropagation();
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { useThemeContext, ThemeProvider };
