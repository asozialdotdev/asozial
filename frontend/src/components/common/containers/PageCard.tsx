import clsx from "clsx";
import React from "react";

type PageCardProps = {
  children: React.ReactNode;
  className?: string;
};

function PageCard({ children, className }: PageCardProps) {
  return (
    <div
      className={clsx(
        "mx-10 flex flex-col rounded-xl border-2 p-6 text-dark dark:text-light",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default PageCard;
