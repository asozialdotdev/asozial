import { FolderGit } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Icon } from "@/types/Ui";

const ProjectIcon: React.FC<Icon> = ({ size = 25, className }) => {
  return <FolderGit className={cn(className)} size={size} />;
};

export default ProjectIcon;
