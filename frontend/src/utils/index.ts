import { languagesWithColors } from "@/constants";
import clsx from "clsx";

const techStackClass = (language: string) => {
  const stackColor = languagesWithColors.find(
    (lang) => lang.language === language,
  );
  return clsx(
    "rounded-full px-2 py-1 text-sm text-light ",
    stackColor ? stackColor.color : "bg-neutral-400 dark:bg-neutral-600",
  );
};


const setStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return "🟢";
    case "inactive":
      return "🔴";
    case "completed":
      return "🟡";
    default:
      return "";
  }
};

export { techStackClass, setStatusIcon };
