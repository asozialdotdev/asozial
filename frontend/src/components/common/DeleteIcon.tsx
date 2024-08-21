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
          <button onClick={handleDelete}>
            <Trash size={20} className="hover:opacity-75" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default DeleteIcon;
