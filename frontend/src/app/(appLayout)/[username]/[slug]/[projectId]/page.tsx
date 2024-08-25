"use server";
//Next
import { notFound } from "next/navigation";
//Actions
import {
  fetchProjectPosts,
  checkIsMember,
  fetchProjectById,
  joinAProject,
} from "@/actions";

//Components
import PageContainer from "@/components/common/containers/PageContainer";
import ProjectComponent from "@/components/project/ProjectComponent";
import ProjectPostsList from "@/components/projectPost/ProjectPostsList";

//Ui
import { Button } from "@/components/ui/button";

//Lib
import { auth } from "@/auth";

//Types
import type { Member, ProjectId } from "@/types/Project";
import { Suspense } from "react";
import ProjectLoadingSkeleton from "@/components/project/ProjectLoadingSkeleton";
import PostLoadingSkeleton from "@/components/project/PostLoadingSkeleton";
import { fetchProjectBySlug } from "@/actions/projects.server/fetchProjectBySlug.server";
import NewProjectLoadingSkeleton from "@/components/project/NewProjectLoadingSkeleton";
import ParentPostLoading from "@/components/projectPost/ParentPostLoading";

type Params = {
  username: string;
  slug: string;
  projectId: ProjectId;
};

async function Page({ params }: { params: Params }) {
  const session = await auth();
  const paramsObj = params;
  console.log("paramsOBJ", paramsObj);
  const { projectId } = paramsObj;

  const [project, posts] = await Promise.all([
    fetchProjectById(projectId),
    fetchProjectPosts(projectId),
  ]);

  const isMember = project.membersJoined.some(
    (member: Member) => member._id === session?.user?.id,
  );
  const isOwner = project.owner._id === session?.user?.id;

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
        <Suspense fallback={<PostLoadingSkeleton />}>
          <ProjectPostsList projectPosts={posts} projectId={projectId} />
        </Suspense>
      ) : (
        // Join Project
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <h3 className="text-xl font-semibold">
            Join this project to see the threads
          </h3>
          <form action={joinAProject}>
            <input type="hidden" name="projectId" value={project._id} />
            <Button type="submit">Join this project</Button>
          </form>
        </div>
      )}
    </PageContainer>
  );
}

export default Page;
