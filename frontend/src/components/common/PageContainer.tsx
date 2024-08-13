import React from "react";
import clsx from "clsx";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx("mx-auto my-0 flex flex-col items-center", className)}>
      {children}
    </div>
  );
};

export default PageContainer;
