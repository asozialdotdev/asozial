import { cn } from "@/lib/utils";
import { SquareCheck } from "lucide-react";

function SuccessMessage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 font-light text-zinc-500 dark:text-zinc-400",
        className,
      )}
    >
      <span>
        <SquareCheck />
      </span>
      {children}
    </span>
  );
}

export default SuccessMessage;
