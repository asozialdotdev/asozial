import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Hourglass, User } from "lucide-react";
function FriendshipPendingIcon() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='flex items-start'>
          <User  />
          <Hourglass size={16} />
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-30 p-3">
        Friendship pending
      </PopoverContent>
    </Popover>
  );
}

export default FriendshipPendingIcon;
