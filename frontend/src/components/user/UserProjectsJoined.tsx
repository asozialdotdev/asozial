import { FolderGit } from "lucide-react";
import Link from "next/link";

type Project = {
  _id: string;
  title: string;
  slug: string;
  username: {
    info: {
      username: string;
    };
  };
};
type UserProjectsJoinedProps = {
  projectsJoinedCount: number;
  projectsJoined: Project[];
};

function UserProjectsJoined({
  projectsJoinedCount,
  projectsJoined,
}: UserProjectsJoinedProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="flex flex-wrap gap-4 font-semibold">
        <FolderGit size={24} />
        Projects Joined ({projectsJoinedCount})
      </h3>
      <div className="flex flex-wrap items-center gap-4">
        {projectsJoined.map((project) => (
          <Link
            key={project._id.toString()}
            href={`/${project.username.info.username}/${project.slug}/${project._id}`}
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

export default UserProjectsJoined;
