"use client";

import { useThemeContext } from "@/context/ThemeContext";

function UserContainer() {
  const { theme } = useThemeContext();
  return (
    <section
      className={`flex flex-col border-2 p-4 hover:grow lg:min-w-[400px] xl:min-w-[400px] ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}
    >
      <h1 className="py-6 text-xl">Users</h1>
    </section>
  );
}

export default UserContainer;
