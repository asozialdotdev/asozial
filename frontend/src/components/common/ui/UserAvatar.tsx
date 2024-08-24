//Next
import Link from "next/link";

//Lib
import { cn } from "@/lib/utils";

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
        <TooltipTrigger asChild>
          <Link href={`/users/${username}`}>
            <Avatar className={cn("flex-shrink-0", className)}>
              <AvatarImage src={src} alt={username} />
              <AvatarFallback>
                {username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="left-0 top-0">{username}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default UserAvatar;