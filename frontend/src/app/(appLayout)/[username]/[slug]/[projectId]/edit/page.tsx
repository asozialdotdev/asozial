import { fetchProjectById } from "@/actions";
import { auth } from "@/auth";
import PageContainer from "@/components/common/containers/PageContainer";
import ButtonBack from "@/components/common/ui/buttons/ButtonBack";
import PageTitle from "@/components/common/ui/PageTitle";
import EditProject from "@/components/project/EditProject";
import { ProjectId } from "@/types/Project";

async function EditProjectPage({
  params,
}: {
  params: { projectId: ProjectId };
}) {
  const { projectId } = params;
  const project = await fetchProjectById(projectId);
  const session = await auth();
  const isOwner = project.owner._id === session?.user?.id;

  if (!isOwner) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4 pb-6">
        <PageTitle className="text-center">
          You are not the owner of this project
        </PageTitle>
        <div className="flex items-center gap-2">
          <ButtonBack size={40} />
          <p className="text-xl font-semibold">Go Back</p>
        </div>
      </div>
    );
  }
  return (
    <PageContainer className="gap-4">
      <PageTitle>Edit Project</PageTitle>
      <EditProject project={project} />
    </PageContainer>
  );
}

export default EditProjectPage;
