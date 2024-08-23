import React from "react";
import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("px-8 py-4 mx-auto my-0 flex flex-col items-center w-full max-w-screen-md", className)}>
      {children}
    </div>
  );
};

export default PageContainer;
