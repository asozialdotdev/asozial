import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThumbsDown } from "lucide-react";

type ThumbsDownIconProps = {
  handleDislike: () => void;
  userDisliked: boolean;
};

function ThumbsDownIcon({ handleDislike, userDisliked }: ThumbsDownIconProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button
            className={`hover:opacity-75 ${userDisliked ? "text-orange-700 dark:text-orange-600" : "text-dark dark:text-light"}`}
            onClick={handleDislike}
          >
            <ThumbsDown size={20} />
          </button>
        </TooltipTrigger>
        <TooltipContent>Reply</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ThumbsDownIcon;
