import React from "react";

function PageCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-10 flex flex-col rounded-xl border-2 p-6 text-dark dark:text-light">
      {children}
    </div>
  );
}

export default PageCard;
