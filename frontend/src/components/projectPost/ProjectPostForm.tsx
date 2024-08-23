//Components
import PostForm from "../project/PostForm";
import PageTitle from "../common/ui/PageTitle";

//Types
import type { ProjectId } from "@/types/Project";

async function ProjectPostForm({ projectId }: { projectId: ProjectId }) {
  return (
    <div className="flex flex-col">
      <PageTitle>Create a new thread</PageTitle>
      <PostForm projectId={projectId} />
    </div>
  );
}

export default ProjectPostForm;
