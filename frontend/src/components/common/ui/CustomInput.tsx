import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CustomInputProps = {
  type: string;
  placeholder?: string;
  value?: string;
  name: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
};

function CustomInput({
  type,
  placeholder,
  name,
  id,
  value,
  onChange,
  disabled = false,
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
      disabled={disabled}
      className={cn(
        "h-12 w-full border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800",
        className,
      )}
    />
  );
}

export default CustomInput;
