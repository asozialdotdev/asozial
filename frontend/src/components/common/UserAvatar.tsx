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
  name: string;
  userId: UserId;
  className?: string;
};

function UserAvatar({ src, name, userId, className }: UserAvatarProps) {
  return (
    <TooltipProvider key={name}>
      <Tooltip>
        <TooltipTrigger>
          <Link title={name} href={`/users/${userId}`}>
            <Avatar className={clsx("flex-shrink-0", className)}>
              <AvatarImage src={src} alt={name} />
              <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>
        </TooltipTrigger>
        <TooltipContent>{name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default UserAvatar;
