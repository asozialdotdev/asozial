import { checkIsOwner, fetchProjectById } from "@/actions";
import { auth } from "@/auth";
import PageContainer from "@/components/common/containers/PageContainer";
import ButtonBack from "@/components/common/ui/buttons/ButtonBack";
import NotFoundComponent from "@/components/common/ui/NotFoundComponent";
import PageTitle from "@/components/common/ui/PageTitle";
import EditProject from "@/components/project/EditProject";
import NewProjectLoadingSkeleton from "@/components/project/NewProjectLoadingSkeleton";
import { ProjectId } from "@/types/Project";
import { Suspense } from "react";

async function EditProjectPage({
  params,
}: {
  params: { projectId: ProjectId };
}) {
  const { projectId } = params;
  const [project, isOwner] = await Promise.all([
    fetchProjectById(projectId),
    checkIsOwner(projectId),
  ]);

  if (!isOwner) {
    return (
      <NotFoundComponent page="Edit Project" message="You should not be here" />
    );
  }
  return (
    <PageContainer className="gap-4">
      <PageTitle>Edit Project</PageTitle>
      <Suspense fallback={<NewProjectLoadingSkeleton />}>
        <EditProject project={project} />
      </Suspense>
    </PageContainer>
  );
}

export default EditProjectPage;
