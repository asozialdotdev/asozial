//Actions
import { fetchPostByIdAndReplies } from "@/actions";

//Components

import ProjectPostContainer from "./ProjectPostContainer";
import ParentProjectPostContent from "./ParentProjectPostContent";

//Types
import type { ProjectPostId } from "@/types/ProjectPost";

async function ParentPost({ projectPostId }: { projectPostId: ProjectPostId }) {
  const { post, replies } = await fetchPostByIdAndReplies(projectPostId);

  return (
    <>
      <ProjectPostContainer className="w-full">
        <ParentProjectPostContent
          post={post}
          isProjectPage={false}
          replies={replies}
        />
      </ProjectPostContainer>
    </>
  );
}

export default ParentPost;
