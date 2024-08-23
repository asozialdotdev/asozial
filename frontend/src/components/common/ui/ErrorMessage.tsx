import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type ErrorMessageProps = {
  children: React.ReactNode;
  className?: ClassValue[];
};

function ErrorMessage({ children, className }: ErrorMessageProps) {
  return (
    <span
      className={cn(
        "text-base font-light text-red-700 dark:text-red-700",
        className,
      )}
    >
      {children}
    </span>
  );
}

export default ErrorMessage;
