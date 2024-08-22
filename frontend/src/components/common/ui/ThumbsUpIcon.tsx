import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThumbsUp } from "lucide-react";

type ThumbsUpIconProps = {
  handleLike: () => void;
  userLiked: boolean | undefined;
};

function ThumbsUpIcon({ handleLike, userLiked }: ThumbsUpIconProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className='mb-[0.2rem]'>
          <span
            className={`hover:opacity-75 cursor-pointer ${userLiked ? "text-green-700 dark:text-green-600" : "text-dark dark:text-light"}`}
            onClick={handleLike}
          >
            <ThumbsUp size={20} />
          </span>
        </TooltipTrigger>
        <TooltipContent>Reply</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ThumbsUpIcon;
