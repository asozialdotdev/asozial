import { Project } from "@/types/Project";
import { User } from "@/types/User";
import { FolderGit } from "lucide-react";
import Link from "next/link";
type UserProjectsOwnedProps = {
  user: User;
  projectsOwned: Project[];
  projectsOwnedCount: number;
};

function UserProjectsOwned({
  user,
  projectsOwned,
  projectsOwnedCount,
}: UserProjectsOwnedProps) {
  return (
    <div className="flex flex-col  gap-4">
      <h3 className="flex gap-4 font-semibold">
        <FolderGit size={24} />
        Projects Owned ({projectsOwnedCount})
      </h3>
      <div className="flex items-center flex-wrap gap-4">
        {projectsOwned.map((project) => (
          <Link
            key={project._id.toString()}
            href={`/${user.info.username}/${project.slug}/${project._id}`}
            className="flex gap-4 hover:opacity-75"
          >
            <h3 className="font-semibold text-neutral-500 dark:text-neutral-400">
              {project.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default UserProjectsOwned;
