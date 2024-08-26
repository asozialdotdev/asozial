import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Icon } from "@/types/Ui";

const SearchIcon: React.FC<Icon> = ({ size = 25, className }) => {
  return <Search className={cn(className)} size={size} />;
};

export default SearchIcon;
