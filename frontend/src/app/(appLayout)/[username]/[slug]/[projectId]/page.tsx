"use server";
//Next
import { notFound } from "next/navigation";
//React
import { Suspense } from "react";

//Actions
import {
  fetchProjectPosts,
  fetchProjectById,
  checkIsMember,
  checkIsOwner,
  checkMemberHasApplied,
} from "@/actions";

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

  const [project, posts, isMember, isOwner, hasApplied] = await Promise.all([
    fetchProjectById(projectId),
    fetchProjectPosts(projectId),
    checkIsMember(projectId),
    checkIsOwner(projectId),
    checkMemberHasApplied(projectId),
  ]);

  console.log("HasApplied", hasApplied);

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
        <ProjectComponent
          project={project}
          isMember={isMember}
          isOwner={isOwner}
        />
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
