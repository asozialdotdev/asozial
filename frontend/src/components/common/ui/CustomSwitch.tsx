import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type CustomSwitchProps = {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
};

function CustomSwitch({
  id,
  checked,
  onCheckedChange,
  className,
}: CustomSwitchProps) {
  return (
    <Switch
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        "data-[state=checked]:bg-dark data-[state=unchecked]:bg-zinc-500 dark:data-[state=checked]:bg-light dark:data-[state=unchecked]:bg-zinc-500",
        className,
      )}
    />
  );
}

export default CustomSwitch;
