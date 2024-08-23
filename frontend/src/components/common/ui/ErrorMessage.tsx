import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type ErrorMessageProps = {
  message: string;
  className?: ClassValue[];
};

function ErrorMessage({ message, className }: ErrorMessageProps) {
  return (
    <span
      className={cn(
        "text-base font-light text-red-700 dark:text-red-700",
        className,
      )}
    >
      {message}
    </span>
  );
}

export default ErrorMessage;
