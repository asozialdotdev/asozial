import { fetchProjectById } from "@/actions";
import PageContainer from "@/components/common/PageContainer";
import EditProject from "@/components/project/EditProject";
import { ProjectId } from "@/types/Project";

async function EditProjectPage({ params }: { params: { projectId: ProjectId } }) {
  const { projectId } = params;
  const project = await fetchProjectById(projectId);
  return (
    <PageContainer className='px-4'>
      <EditProject project={project} />
    </PageContainer>
  );
}

export default EditProjectPage;
