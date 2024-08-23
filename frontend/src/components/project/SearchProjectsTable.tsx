import { searchForProjects } from "@/actions";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/Project";

type SearchProjectsTableProps = {
  query: string;
  currentPage: number;
};

async function SearchProjectsTable({
  query,
  currentPage,
}: SearchProjectsTableProps) {
  if (!query) return null;
  const { projects } = await searchForProjects(query, currentPage);

  if (!projects || projects.error) {
    return <p>No projects found</p>;
  }
  console.log("PROJECTSSSSSSS", projects.projects);
  return (
    <div className="grid grid-cols-1 gap-4 pb-6 lg:grid-cols-2 2xl:grid-cols-3 2xl:gap-8">
      {projects.map((project: Project) => (
        <ProjectCard key={project._id.toString()} project={project} />
      ))}
    </div>
  );
}

export default SearchProjectsTable;
