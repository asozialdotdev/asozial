import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Icon } from "@/types/Ui";

const DashboardIcon = ({ size = 25, className }: Icon) => {
  return <LayoutDashboard className={cn(className)} size={size} />;
};

export default DashboardIcon;
