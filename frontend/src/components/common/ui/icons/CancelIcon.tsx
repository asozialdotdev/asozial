import React, { forwardRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SquareX } from "lucide-react";

type CancelIconProps = {
  handler?: () => void;
};

const CancelIcon = forwardRef<HTMLSpanElement, CancelIconProps>(
  ({ handler }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span ref={ref} onClick={handler}>
              <SquareX
                size={23}
                className="-ml-1 mb-4 flex cursor-pointer items-center gap-2 text-base hover:opacity-75"
              />
            </span>
          </TooltipTrigger>
          <TooltipContent>Cancel</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
);

CancelIcon.displayName = "CancelIcon";

export default CancelIcon;
