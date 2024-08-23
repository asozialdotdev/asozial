import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
type CustomLabel = {
  content: string;
  htmlFor: string;
  required?: boolean;
  className?: ClassValue[];
};

function CustomLabel({
  content,
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
        {content} {required && <span className="text-xl text-red-400">*</span>}
      </label>
    </>
  );
}

export default CustomLabel;
