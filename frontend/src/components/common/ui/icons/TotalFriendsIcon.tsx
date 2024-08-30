import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Users } from "lucide-react";
function TotalFriendsIcon() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <Users size={23} />
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-30 p-3">
        Total Friends
      </PopoverContent>
    </Popover>
  );
}

export default TotalFriendsIcon;
