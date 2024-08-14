import { ProjectId } from "@/types/Project";
import { fetchPosts } from "@/actions";

import PostForm from "../project/PostForm";

async function ProjectPostForm({ projectId }: { projectId: ProjectId }) {

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold">Create a new post</h2>
      <PostForm projectId={projectId} />
    </div>
  );
}

export default ProjectPostForm;
