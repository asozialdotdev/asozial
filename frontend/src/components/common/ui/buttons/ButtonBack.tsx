"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SquareChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ButtonBackProps = {
  className?: string;
  size?: number;
};

function ButtonBack({ className, size = 25 }: ButtonBackProps) {
  const router = useRouter();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            size="icon"
            className={cn("hover:opacity-75", className)}
            onClick={router.back}
          >
            <SquareChevronLeft size={size} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">Go back</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ButtonBack;
