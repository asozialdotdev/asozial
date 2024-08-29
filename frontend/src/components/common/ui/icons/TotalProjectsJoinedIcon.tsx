import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Folder, FolderInput, Users } from "lucide-react";
function TotalProjectsJoinedIcon() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span>
            <FolderInput size={23} className="cursor-help" />
          </span>
        </TooltipTrigger>
        <TooltipContent>Projects Joined</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default TotalProjectsJoinedIcon;
