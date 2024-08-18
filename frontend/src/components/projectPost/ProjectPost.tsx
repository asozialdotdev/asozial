//Types
import type { ProjectPost } from "@/types/ProjectPost";
import UserAvatar from "../common/UserAvatar";
import ProjectPostContent from "./ProjectPostContent";
import ProjectPostButtons from "./ProjectPostButtons";
import ReplyCount from "./ReplyCount";

function ProjectPost({ projectPost }: { projectPost: ProjectPost }) {
  const post = projectPost;

  return (
    <div
      key={post._id.toString()}
      className="flex flex-col gap-1 rounded-md border border-dashed border-zinc-300 px-8 py-10 hover:bg-zinc-100 dark:border-zinc-600 dark:shadow-neutral-700/30 dark:hover:bg-zinc-800"
    >
      <div className="flex items-start gap-4">
        {/* Avatar  */}

        <UserAvatar src={post.userId.avatarUrl} name={post.userId.name} />

        <ProjectPostContent
          name={post.userId.name}
          title={post.title}
          content={post.content}
          createdAt={post.createdAt}
        />
      </div>
      <div>
        <div className="flex items-center gap-4">
          <ReplyCount replies={post.replyCount} />
          <ProjectPostButtons projectPost={post} />
        </div>
      </div>
    </div>
  );
}

export default ProjectPost;
