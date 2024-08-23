"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SquareChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ButtonForwardProps = {
  className?: string;
  size?: number;
  handler?: () => void;
  text?: string;
};

function ButtonForward({
  className,
  size = 25,
  handler,
  text,
}: ButtonForwardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            size="icon"
            className={cn(className)}
            onClick={handler}
          >
            <SquareChevronRight size={size} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ButtonForward;
