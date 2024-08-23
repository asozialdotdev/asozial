import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type CustomTextareaProps = {
  placeholder: string;
  name: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: ClassValue[];
};
function CustomTextarea({
  placeholder,
  name,
  id,
  value,
  onChange,
  className,
}: CustomTextareaProps) {
  return (
    <Textarea
      placeholder={placeholder}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      className={cn(
        "h-32 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800",
        className,
      )}
    />
  );
}

export default CustomTextarea;
