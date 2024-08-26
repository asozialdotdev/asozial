import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Icon } from "@/types/Ui";

const DashboardIcon: Icon = ({ size = 25, className }) => {
  return <LayoutDashboard className={cn(className)} size={size} />;
};

export default DashboardIcon;
