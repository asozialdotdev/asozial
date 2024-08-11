import { fetchAllProjects } from "@/actions";
import MyProjects from "@/components/project/MyProjects";
import { baseUrl } from "@/constants";

async function MyProjectsPage() {
  const projects = await fetchAllProjects();
  console.log("projects:", projects);
  return (
    <>
      <MyProjects projects={projects} />
    </>
  );
}

export default MyProjectsPage;
