//Actions
import { fetchPostByIdAndReplies } from "@/actions";

//Types
import type { ProjectPostId } from "@/types/ProjectPost";
import UserAvatar from "../common/UserAvatar";
import ProjectPostContent from "./ProjectPostContent";
import ProjectPostButtons from "./ProjectPostButtons";
import ReplyCount from "./ReplyCount";
import ProjectPostContainer from "./ProjectPostContainer";

async function ParentPost({ projectPostId }: { projectPostId: ProjectPostId }) {
  const { post, replies } = await fetchPostByIdAndReplies(projectPostId);
  console.log("ParentPost:||||||||||||||||||", post);

  return (
    <ProjectPostContainer>
      <div className="flex items-start gap-4">
        {/* Avatar on the left side */}

        <UserAvatar src={post.userId.avatarUrl} name={post.userId.name} />

        {/* Content on the right side */}

        <ProjectPostContent
          name={post.userId.name}
          title={post.title}
          content={post.content}
          createdAt={post.createdAt}
        />
      </div>
      <div className="flex items-center gap-4">
        <ReplyCount replies={replies.length} />
        <ProjectPostButtons projectPost={post} />
      </div>
    </ProjectPostContainer>
  );
}

export default ParentPost;
