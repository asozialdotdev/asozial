//Actions
import { fetchAllProjects } from "@/actions";

//Components
import MyProjects from "@/components/project/MyProjects";
import PageContainer from "@/components/common/PageContainer";

async function MyProjectsPage() {
  const projects = await fetchAllProjects();
  return (
    <PageContainer className="gap-10">
      <h1>My Projects</h1>
      {projects.length === 0 && <p>No projects found</p>}
      {projects.length > 0 && <MyProjects projects={projects} />}
    </PageContainer>
  );
}

export default MyProjectsPage;
