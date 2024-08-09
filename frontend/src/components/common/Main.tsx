"use client";

import { useThemeContext } from "@/context/ThemeContext";

function Main({ children }: Readonly<{ children: React.ReactNode }>) {
  const { theme } = useThemeContext();

  return (
    <main
      className={`flex h-full w-full flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}
    >
      {children}
    </main>
  );
}

export default Main;
