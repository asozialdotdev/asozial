import { languagesWithColors } from "@/constants";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { formatDistance } from "date-fns";

const techStackClass = (language: string) => {
  const stackColor = languagesWithColors.find(
    (lang) => lang.language === language,
  );
  return cn(
    "rounded-full px-2 py-1 text-sm text-light ",
    stackColor ? stackColor.bgColor : "bg-neutral-400 dark:bg-neutral-600",
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

const formattedData = (date: string | Date) => {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  })
    .replace("about", "")
    .replace("minutes", "min");
};

const generateSlug = (title: string) => {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export { techStackClass, setStatusIcon, formattedData, generateSlug };
