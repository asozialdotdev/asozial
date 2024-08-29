import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FolderCode, Users } from "lucide-react";
function TotalProjectsOwned() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span>
            <FolderCode size={23} className="cursor-help" />
          </span>
        </TooltipTrigger>
        <TooltipContent>Projects Owned</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default TotalProjectsOwned;
