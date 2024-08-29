import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FolderInput } from "lucide-react";
function TotalProjectsJoinedIcon() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <FolderInput size={23} />
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-30 p-3">
        Projects Joined
      </PopoverContent>
    </Popover>
  );
}

export default TotalProjectsJoinedIcon;
