import { cn } from "@/lib/utils";
import { SquareX } from "lucide-react";

type ErrorMessageProps = {
  children: React.ReactNode;
  className?: string;
  size?: number;
};

function ErrorMessage({ children, size, className }: ErrorMessageProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-1 text-base font-light text-red-700 dark:text-red-700",
        className,
      )}
    >
      <span>
        <SquareX size={size} />
      </span>
      {children}
    </span>
  );
}

export default ErrorMessage;
