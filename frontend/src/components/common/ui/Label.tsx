import { cn } from "@/lib/utils";
type CustomLabel = {
  children?: React.ReactNode;
  htmlFor: string;
  required?: boolean;
  className?: string;
};

function CustomLabel({
  children,
  htmlFor,
  required = false,
  className,
}: CustomLabel) {
  return (
    <>
      <label
        className={cn(
          "font-semibold text-zinc-500 dark:text-zinc-400",
          className,
        )}
        htmlFor={htmlFor}
      >
        {children} {required && <span className="text-xl text-red-400">*</span>}
      </label>
    </>
  );
}

export default CustomLabel;
