"use client";

import { useThemeContext } from "@/context/ThemeContext";

function DashboardContainer() {
  const { theme } = useThemeContext();
  return (
    <section
      className={`flex grow flex-col border-2 p-4 ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}
    >
      <h1 className="py-6 text-xl">Dashboard</h1>
    </section>
  );
}

export default DashboardContainer;
