import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { MessageSquareReply } from "lucide-react";

function ReplyIcon({ toggleOpen }: { toggleOpen: () => void }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button
            className="flex items-center gap-2 text-sm hover:opacity-75"
            onClick={toggleOpen}
          >
            <MessageSquareReply size={22} />
          </button>
        </TooltipTrigger>
        <TooltipContent>Reply</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ReplyIcon;
