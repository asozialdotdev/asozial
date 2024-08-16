import { ProjectId } from "@/types/Project";
import { fetchPosts } from "@/actions";

import PostForm from "./PostForm";
import PageTitle from "../common/PageTitle";

async function ProjectPostForm({ projectId }: { projectId: ProjectId }) {
  return (
    <div className="flex flex-col">
      <PageTitle >Create a new thread</PageTitle>
      <PostForm projectId={projectId} />
    </div>
  );
}

export default ProjectPostForm;
