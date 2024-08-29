import { fetchAllMembersFromAProject } from "@/actions";
import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/sidebar/SidebarTitle";
import MembersTabs from "@/components/project/MembersTabs";
import { ProjectId } from "@/types/Project";

async function MembersPage({ params }: { params: { projectId: ProjectId } }) {
  const { projectId } = params;
  const result = await fetchAllMembersFromAProject(projectId);

  return (
    <PageContainer>
      <PageTitle>Members Page</PageTitle>
      <MembersTabs result={result} projectId={projectId} />
    </PageContainer>
  );
}

export default MembersPage;
