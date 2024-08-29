import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FolderGit } from "lucide-react";
function GithubReposIcon() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span>
            <FolderGit size={23} className="cursor-help" />
          </span>
        </TooltipTrigger>
        <TooltipContent>Location</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default GithubReposIcon;
