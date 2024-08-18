//Actions
import { fetchPostByIdAndReplies } from "@/actions";

//Types
import type { ProjectPostId } from "@/types/ProjectPost";
import UserAvatar from "../common/UserAvatar";
import ProjectPostContent from "./ProjectPostContent";
import ProjectPostButtons from "./ProjectPostButtons";
import ReplyCount from "./ReplyCount";

async function ParentPost({ projectPostId }: { projectPostId: ProjectPostId }) {
  const { post, replies } = await fetchPostByIdAndReplies(projectPostId);
  console.log("ParentPost:||||||||||||||||||", post);

  return (
    <section className="flex w-full flex-col gap-1 rounded-md border border-dashed border-zinc-300 px-8 py-10 hover:bg-zinc-100 dark:border-zinc-600 dark:shadow-neutral-700/30 dark:hover:bg-zinc-800">
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
    </section>
  );
}

export default ParentPost;
