import { cn } from "@/lib/utils";

type PageTitleProps = {
  children: React.ReactNode;
  className?: string;
};
function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1
      className={cn(
        "tracking-wide' text-3xl font-bold text-dark dark:text-light",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export default PageTitle;
