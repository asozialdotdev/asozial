"use server";
//Next
import { notFound } from "next/navigation";
//React
import { Suspense } from "react";

//Actions
import { fetchProjectPosts, fetchProjectById } from "@/actions";

//Components
import PageContainer from "@/components/common/containers/PageContainer";
import ProjectComponent from "@/components/project/ProjectComponent";
import ProjectPostsList from "@/components/projectPost/ProjectPostsList";
import ProjectLoadingSkeleton from "@/components/project/ProjectLoadingSkeleton";
import ApplyProject from "@/components/project/requests/ApplyProject";

//Lib
import { auth } from "@/auth";

//Types
import type { Member, ProjectId } from "@/types/Project";
import { UserId } from "@/types/User";

type Params = {
  username: string;
  slug: string;
  projectId: ProjectId;
};

async function Page({ params }: { params: Params }) {
  const session = await auth();
  const paramsObj = params;
  const { projectId } = paramsObj;

  const [project, posts] = await Promise.all([
    fetchProjectById(projectId),
    fetchProjectPosts(projectId),
  ]);

  const isMember = project.members.membersJoined?.some(
    (member: Member) => member._id.toString() === session?.user?.id.toString(),
  );
  const isOwner = project.owner._id.toString() === session?.user?.id.toString();

  const hasApplied = project.members.membersApplied?.some(
    (member: Member) => member._id.toString() === session?.user?.id.toString(),
  );
  console.log("membersApplied", project.members.membersApplied);

  if (!project) {
    notFound();
  }

  // if (project) {
  //   return <ParentPostLoading/>;
  // }
  return (
    <PageContainer className="gap-4">
      {/* Project */}
      <Suspense fallback={<ProjectLoadingSkeleton />}>
        <ProjectComponent project={project} />
      </Suspense>

      {isMember || isOwner ? (
        // Posts
        <ProjectPostsList projectPosts={posts} projectId={projectId} />
      ) : (
        // Apply Project
        <ApplyProject project={project} hasApplied={hasApplied} />
      )}
    </PageContainer>
  );
}

export default Page;
