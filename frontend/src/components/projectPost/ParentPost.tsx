//Actions
import { fetchPostByIdAndReplies } from "@/actions";

//Components

import ProjectPostContainer from "./ProjectPostContainer";

//Types
import type { ProjectPostId } from "@/types/ProjectPost";
import ParentProjectPostContent from "./ParentProjectPostContent";
import ProjectPost from "./ProjectPost";

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
