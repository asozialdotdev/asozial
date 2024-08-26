import { Link } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Icon } from "@/types/Ui";

const MatchIcon: React.FC<Icon> = ({ size = 25, className }) => {
  return <Link className={cn(className)} size={size} />;
};

export default MatchIcon;
