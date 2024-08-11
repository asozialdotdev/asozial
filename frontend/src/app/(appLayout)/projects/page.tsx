import { baseUrl } from "@/constants";
import ProjectCard from "@/components/project/ProjectCard";

async function Page() {
  const data = await fetch(`${baseUrl}/projects/index`);
  const projects = await data.json();
  console.log(projects[0]._id);
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-auto my-0 gap-4">
      <ProjectCard projects={projects} />
    </div>
  );
}

export default Page;
