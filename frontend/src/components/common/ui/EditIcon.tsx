import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FilePenLine } from "lucide-react";

type EditIconProps = {
  toggleEditing: () => void;
};

function EditIcon({ toggleEditing }: EditIconProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span
            className="-ml-1 mb-4 flex cursor-pointer items-center gap-2 text-base hover:opacity-75"
            onClick={toggleEditing}
          >
            <FilePenLine size={20} />
          </span>
        </TooltipTrigger>
        <TooltipContent>Edit</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default EditIcon;
