import { Link } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Icon } from "@/types/Ui";

const MatchIcon = ({ size = 25, className }: Icon) => {
  return <Link className={cn(className)} size={size} />;
};

export default MatchIcon;
