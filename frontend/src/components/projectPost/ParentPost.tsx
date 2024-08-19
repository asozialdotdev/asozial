//Actions
import { fetchPostByIdAndReplies } from "@/actions";

//Components
import UserAvatar from "../common/UserAvatar";
import ProjectPostContent from "./ProjectPostContent";
import ProjectPostButtons from "./ProjectPostButtons";
import ReplyCount from "./ReplyCount";
import ProjectPostContainer from "./ProjectPostContainer";

//Types
import type { ProjectPostId } from "@/types/ProjectPost";

async function ParentPost({ projectPostId }: { projectPostId: ProjectPostId }) {
  const { post, replies } = await fetchPostByIdAndReplies(projectPostId);
  console.log("ParentPost:||||||||||||||||||", post);

  return (
    <ProjectPostContainer>
      <div className="flex items-start gap-4">
        <div className="flex flex-col gap-3 pl-2 lg:contents">
          {/* Avatar on the left side */}

          <UserAvatar
            src={post.userId.image}
            name={post.userId.name}
            userId={post.userId._id}
          />

          {/* Content on the right side */}

          <ProjectPostContent
            name={post.userId.name}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ReplyCount replies={replies.length} />
        <ProjectPostButtons projectPost={post} />
      </div>
    </ProjectPostContainer>
  );
}

export default ParentPost;
