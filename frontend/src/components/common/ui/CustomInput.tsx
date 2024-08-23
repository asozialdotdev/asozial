import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type CustomInputProps = {
  type: string;
  placeholder?: string;
  value?: string;
  name: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: ClassValue[];
};

function CustomInput({
  type,
  placeholder,
  name,
  id,
  value,
  onChange,
  className,
}: CustomInputProps) {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      className={cn(
        "h-14 w-[75%] border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800",
        className,
      )}
    />
  );
}

export default CustomInput;
