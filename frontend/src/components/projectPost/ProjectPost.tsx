//Types
import type { ProjectPost } from "@/types/ProjectPost";

import ProjectPostContainer from "./ProjectPostContainer";
import ParentProjectPostContent from "./ParentProjectPostContent";

function ProjectPost({ projectPost }: { projectPost: ProjectPost }) {
  const post = projectPost;

  return (
    <ProjectPostContainer>
      <ParentProjectPostContent post={post} isProjectPage />
    </ProjectPostContainer>
  );
}

export default ProjectPost;
