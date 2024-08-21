import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash } from "lucide-react";
type DeleteIconProps = {
  handleDelete: () => void;
};

function DeleteIcon({ handleDelete }: DeleteIconProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span onClick={handleDelete}>
            <Trash size={20} className="cursor-pointer hover:opacity-75" />
          </span>
        </TooltipTrigger>
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default DeleteIcon;
