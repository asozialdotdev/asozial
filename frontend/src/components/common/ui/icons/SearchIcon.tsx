import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Icon } from "@/types/Ui";

const SearchIcon = ({ size = 25, className }: Icon) => {
  return <Search className={cn(className)} size={size} />;
};

export default SearchIcon;
