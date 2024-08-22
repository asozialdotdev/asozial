//Next
import { notFound } from "next/navigation";

//Actions
import { fetchAllProjectsFromAUser } from "@/actions";
//Components
import MyProjects from "@/components/project/MyProjects";
import PageContainer from "@/components/common/containers/PageContainer";

async function MyProjectsPage() {
  const projects = await fetchAllProjectsFromAUser();

  if (!projects) {
    notFound();
  }

  return (
    <PageContainer className="gap-10 2xl:max-w-screen-xl">
      {projects.length === 0 && <p>No projects found</p>}
      {projects.length > 0 && <MyProjects projects={projects} />}
    </PageContainer>
  );
}

export default MyProjectsPage;
