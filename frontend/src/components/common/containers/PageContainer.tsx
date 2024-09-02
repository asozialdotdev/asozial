import React from "react";
import { cn } from "@/lib/utils";

type PageContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "mx-auto my-0 flex h-full w-full max-w-screen-md flex-col items-center gap-10 px-8 py-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default PageContainer;
