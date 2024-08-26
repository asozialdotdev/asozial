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

//Ui
import { Button } from "@/components/ui/button";

//Lib
import { auth } from "@/auth";

//Types
import type { ProjectId } from "@/types/Project";
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

  const isMember = project.membersJoined?.some(
    (member: UserId) => member === session?.user?.id.toString(),
  );
  const isOwner = project.owner._id === session?.user?.id;

  const hasApplied = project.membersApplied?.some(
    (member: UserId) => member === session?.user?.id.toString(),
  );
  console.log("membersApplied", project.membersApplied);

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
