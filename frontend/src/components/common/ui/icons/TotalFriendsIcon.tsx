import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Users } from "lucide-react";
function TotalFriendsIcon() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span>
            <Users
              size={23}
              className="cursor-help"
            />
          </span>
        </TooltipTrigger>
        <TooltipContent>Total Friends</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default TotalFriendsIcon;
