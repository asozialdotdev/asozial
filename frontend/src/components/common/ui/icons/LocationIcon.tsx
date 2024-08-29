import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MapPinHouse } from "lucide-react";
function LocationIcon() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span>
            <MapPinHouse size={23} className="cursor-help" />
          </span>
        </TooltipTrigger>
        <TooltipContent>Location</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default LocationIcon;
