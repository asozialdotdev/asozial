import { fetchAllProjects } from "@/actions";
import PageContainer from "@/components/common/PageContainer";
import MyProjects from "@/components/project/MyProjects";
import { baseUrl } from "@/constants";

async function MyProjectsPage() {
  const projects = await fetchAllProjects();
  console.log("projects:", projects);
  return (
    <PageContainer className="gap-10">
      <MyProjects projects={projects} />
    </PageContainer>
  );
}

export default MyProjectsPage;
