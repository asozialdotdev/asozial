import React, { forwardRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash } from "lucide-react";

type DeleteIconProps = {
  handleDelete?: () => void;
};

const DeleteIcon = forwardRef<HTMLSpanElement, DeleteIconProps>(
  ({ handleDelete }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span ref={ref} onClick={handleDelete}>
              <Trash size={20} className="cursor-pointer hover:opacity-75" />
            </span>
          </TooltipTrigger>
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
);

DeleteIcon.displayName = "DeleteIcon";

export default DeleteIcon;
