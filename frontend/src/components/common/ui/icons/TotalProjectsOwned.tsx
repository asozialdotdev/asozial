import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FolderCode } from "lucide-react";
function TotalProjectsOwned() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <FolderCode size={23} />
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-30 p-3">
        Projects Owned
      </PopoverContent>
    </Popover>
  );
}

export default TotalProjectsOwned;
