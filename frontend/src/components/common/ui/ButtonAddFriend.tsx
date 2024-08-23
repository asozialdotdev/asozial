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
  senderId: string;
  receiverId: string;
};

function ButtonAddFriend({
  className,
  size = 25,
  senderId,
  receiverId,
}: ButtonAddFriendProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            size="icon"
            className={`flex flex-row ${cn(className)}`}
            onClick={() => {
              console.log("senderId", senderId);
              console.log("receiverId", receiverId);
            }}
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
