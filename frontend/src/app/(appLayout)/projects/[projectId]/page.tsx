"use server";
//Next
import { notFound } from "next/navigation";
//Actions
import { fetchProjectPosts } from "@/actions";
import {
  checkIsMember,
  fetchProjectById,
  handleJoinProject,
} from "@/actions/projects.server";

//Components
import PageContainer from "@/components/common/PageContainer";
import ProjectComponent from "@/components/project/ProjectComponent";
import ProjectPostsList from "@/components/projectPost/ProjectPostsList";

//Ui
import { Button } from "@/components/ui/button";

//Lib
import { auth } from "@/auth";

//Types
import type { ProjectId } from "@/types/Project";

// const membersJoined = ["Benjamin", "Mirko", "John", "Jane", "José"];

async function Page({ params }: { params: { projectId: ProjectId } }) {
  const session = await auth();
  const { projectId } = params;
  const project = await fetchProjectById(projectId);

  const posts = await fetchProjectPosts(projectId);

  const isMember = await checkIsMember(projectId);

  const isOwner = project.owner._id === session?.user?.id;

  if (!project) {
    notFound();
  }
  return (
    <PageContainer className="w-full max-w-screen-md gap-4">
      {/* Project */}
      <ProjectComponent project={project} />

      {isMember || isOwner ? (
        // Posts
        <ProjectPostsList projectPosts={posts} projectId={projectId} />
      ) : (
        // Join Project
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <h3 className="text-xl font-semibold">
            Join this project to see the threads
          </h3>
          <form action={handleJoinProject}>
            <input type="hidden" name="projectId" value={project._id} />
            <Button type="submit">Join this project</Button>
          </form>
        </div>
      )}
    </PageContainer>
  );
}

export default Page;
