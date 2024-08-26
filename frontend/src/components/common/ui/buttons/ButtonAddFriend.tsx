"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Users, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ButtonAddFriendProps = {
  className?: string;
  size?: number;
  sendFriendship: (userId: string, friendId: string) => void;
  userId: string;
  friendId: string;
};

function ButtonAddFriend({
  className,
  size = 25,
  sendFriendship,
  userId,
  friendId,
}: ButtonAddFriendProps) {
  console.log("ButtonAddFriend", userId, friendId);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            size="icon"
            className={`flex flex-row ${cn(className)}`}
            onClick={() => sendFriendship(userId, friendId)}
          >
            <Users size={size} />
            <Plus size={size} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">Add friend</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ButtonAddFriend;
