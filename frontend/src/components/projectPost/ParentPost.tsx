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
import ParentProjectPostContent from "./ParentProjectPostContent";

async function ParentPost({ projectPostId }: { projectPostId: ProjectPostId }) {
  const { post, replies } = await fetchPostByIdAndReplies(projectPostId);
  console.log("ParentPost:||||||||||||||||||", post);

  return (
    <ProjectPostContainer>
      {/* <div className="flex items-start gap-4">
        <div className="flex flex-col gap-3 pl-2 lg:contents">

          <UserAvatar
            src={post.userId.image}
            username={post.userId.username}
            userId={post.userId._id}
          />


          <ProjectPostContent projectPost={post}  />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ReplyCount replies={replies.length} />
        <ProjectPostButtons projectPost={post}  />
      </div> */}
      <ParentProjectPostContent post={post} isPostList={false} />
    </ProjectPostContainer>
  );
}

export default ParentPost;
