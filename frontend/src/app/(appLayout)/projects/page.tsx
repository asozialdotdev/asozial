import MyProjects from "@/components/project/MyProjects";
import { baseUrl } from "@/constants";

async function MyProjectsPage() {
  const data = await fetch(`${baseUrl}/projects/my-projects`);
  const projects = await data.json();
  console.log(projects[0]._id);
  return (
    <>
      <MyProjects projects={projects} />
    </>
  );
}

export default MyProjectsPage;
