import { cn } from "@/lib/utils";
import React from "react";

type PageCardProps = {
  children: React.ReactNode;
  className?: string;
};

function PageCard({ children, className }: PageCardProps) {
  return (
    <div
      className={cn(
        "mx-10 flex flex-col rounded-xl border-2 border-dashed border-zinc-300 bg-inherit bg-zinc-100 p-6 text-dark hover:bg-zinc-100 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:text-light dark:shadow-neutral-700/30 dark:hover:bg-zinc-800",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default PageCard;
