import { searchForUserProjects } from "@/actions";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/Project";

type UserProjectsTableProps = {
  query: string;
  currentPage: number;
};

async function UserProjectsTable({
  query,
  currentPage,
}: UserProjectsTableProps) {
  const { projects } = await searchForUserProjects(query, currentPage);

  return (
    <article className="grid grid-cols-1 gap-4 pb-6 lg:grid-cols-2 2xl:grid-cols-3 2xl:gap-8">
      {projects.map((project: Project) => (
        <ProjectCard key={project._id.toString()} project={project} />
      ))}
    </article>
  );
}

export default UserProjectsTable;
