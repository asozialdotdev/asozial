"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Users, Plus, UserCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFormStatus } from "react-dom";
import LoadingTextButton from "../common/ui/loading/LoadingTextButton";

type ButtonAddFriendProps = {
  className?: string;
  size?: number;
  success?: boolean;
};

function ButtonAddFriend({
  className,
  size = 25,
  success,
}: ButtonAddFriendProps) {
  const { pending } = useFormStatus();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            size="icon"
            className={`flex flex-row ${cn(className)}`}
            disabled={pending || success}
          >
            {pending ? (
              <LoadingTextButton />
            ) : success ? (
              <UserCheck size={size} />
            ) : (
              <>
                <Users size={size} />
                <Plus size={size} />
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">Add friend</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ButtonAddFriend;
