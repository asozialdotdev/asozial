import { FolderPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Icon } from "@/types/Ui";

const ProjectCreateIcon: Icon = ({ size = 25, className }) => {
  return <FolderPlus className={cn(className)} size={size} />;
};

export default ProjectCreateIcon;
