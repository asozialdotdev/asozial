import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserCheck } from "lucide-react";
function IsFriendIcon() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-start">
          <UserCheck />
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-30 p-3">
        You are friends
      </PopoverContent>
    </Popover>
  );
}

export default IsFriendIcon;
