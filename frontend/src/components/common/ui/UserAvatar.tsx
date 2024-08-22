//Next
import Link from "next/link";

//Lib
import clsx from "clsx";

//Ui
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

//Types
import type { UserId } from "@/types/User";

type UserAvatarProps = {
  src: string;
  username: string;
  userId: UserId;
  className?: string;
};

function UserAvatar({ src, username, userId, className }: UserAvatarProps) {
  console.log("SRC", src);
  return (
    <TooltipProvider key={username}>
      <Tooltip>
        <TooltipTrigger>
          <Link title={username} href={`/users/${userId}`}>
            <Avatar className={clsx("flex-shrink-0", className)}>
              <AvatarImage src={src} alt={username} />
              <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>
        </TooltipTrigger>
        <TooltipContent>{username}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default UserAvatar;
