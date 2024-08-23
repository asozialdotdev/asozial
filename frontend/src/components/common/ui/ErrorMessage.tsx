import { cn } from "@/lib/utils";

type ErrorMessageProps = {
  children: React.ReactNode;
  className?: string;
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
