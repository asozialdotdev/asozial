import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessagesSquare } from 'lucide-react';

function ReplyCount({ replies }: { replies?: number }) {
  return (
    <div className="mb-3 flex gap-2 lg:ml-14">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MessagesSquare size={26} />
            </TooltipTrigger>
            <TooltipContent>Total Replies</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      <p className="text-lg mb-[0] text-neutral-500 dark:text-neutral-400">
        {replies}
      </p>
    </div>
  );
}

export default ReplyCount;
