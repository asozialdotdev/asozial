import { FolderGit } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Icon } from "@/types/Ui";

const ProjectIcon = ({ size = 25, className }: Icon) => {
  return <FolderGit className={cn(className)} size={size} />;
};

export default ProjectIcon;
