import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "@/types/User";
import { Building, Code, FolderGit, Star, Users } from "lucide-react";

function UserGithubStatus({ user }: { user: User }) {
  return (
    <div className="flex flex-row justify-start gap-6 text-xs">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <p className="flex flex-row items-center gap-2">
              <Users size={15} /> {user.github.followersNumber || 0}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{user.github.followersNumber || 0} followers</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <p className="flex flex-row items-center gap-2">
              <Star size={15} /> {user.github.subscriptionsNumber || 0}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{user.github.subscriptionsNumber || 0} starred</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <p className="flex flex-row items-center gap-2">
              <Building size={15} /> {user.github.organizationsNumber || 0}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{user.github.organizationsNumber || 0} organizations</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <p className="flex flex-row items-center gap-2">
              <FolderGit size={15} /> {user.github.publicReposNumber || 0}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{user.github.publicReposNumber} public repos</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <p className="flex flex-row items-center gap-2">
              <Code size={15} /> {user.github.publicGistsNumber}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{user.github.publicGistsNumber} public gists</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default UserGithubStatus;
