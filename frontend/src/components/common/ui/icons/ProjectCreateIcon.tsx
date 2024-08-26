import { FolderPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Icon } from "@/types/Ui";

const ProjectCreateIcon = ({ size = 25, className }: Icon) => {
  return <FolderPlus className={cn(className)} size={size} />;
};

export default ProjectCreateIcon;
