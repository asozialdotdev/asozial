import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FolderGit } from "lucide-react";
function GithubReposIcon() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <FolderGit size={23} />
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-30 p-3">
        Github Repos
      </PopoverContent>
    </Popover>
  );
}

export default GithubReposIcon;
