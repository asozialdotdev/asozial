"use server";

import { fetchProjectPosts } from "@/actions";
import { fetchProjectById, handleJoinProject } from "@/actions/projects.server";
//Actions

//Components
import PageContainer from "@/components/common/PageContainer";
import ProjectComponent from "@/components/project/ProjectComponent";
import ProjectPostsList from "@/components/projectPost/ProjectPostsList";

//Ui
import { Button } from "@/components/ui/button";

//Types
import type { ProjectId } from "@/types/Project";
import { notFound } from "next/navigation";

const membersJoined = ["Benjamin", "Mirko", "John", "Jane", "José"];

async function Page({ params }: { params: { projectId: ProjectId } }) {
  const { projectId } = params;
  const project = await fetchProjectById(projectId);

  const posts = await fetchProjectPosts(projectId);


  const isMember = membersJoined.includes("Jos"); // hardcoded
  // const isMember = membersJoined.includes(user._id); // dynamic
  if (!project) {
    notFound();
  }
  return (
    <PageContainer className="w-full max-w-screen-md gap-4">
      <ProjectComponent project={project} />

      {!isMember ? (
        <ProjectPostsList projectPosts={posts} projectId={projectId} />
      ) : (
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
