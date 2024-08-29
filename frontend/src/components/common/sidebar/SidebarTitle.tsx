import { cn } from "@/lib/utils";

type SidebarTitleProps = {
  children: React.ReactNode;
  className?: string;
};
function SidebarTitle({ children, className }: SidebarTitleProps) {
  return (
    <h1
      className={cn(
        "tracking-wide' text-xl font-bold text-dark dark:text-light",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export default SidebarTitle;
