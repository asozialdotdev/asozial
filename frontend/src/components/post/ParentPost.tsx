//Actions
import { fetchPostByIdAndReplies } from "@/actions";

//Components
import PageTitle from "../common/PageTitle";

//Ui
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

//Lib
import { format } from "date-fns";

//Types
import type { ProjectPostId } from "@/types/Post";

async function ParentPost({ projectPostId }: { projectPostId: ProjectPostId }) {
  const { post } = await fetchPostByIdAndReplies(projectPostId);

  const createdAt = format(new Date(post.createdAt), "dd, MMM yyyy - HH:mm");

  return (
    <section className="flex w-full flex-col gap-1 rounded-md border border-dashed border-zinc-300 px-8 py-10 hover:bg-zinc-100 dark:border-zinc-600 dark:shadow-neutral-700/30 dark:hover:bg-zinc-800">
      <div className="flex items-start gap-4">
        {/* Avatar on the left side */}
        <Avatar className="flex-shrink-0">
          <AvatarImage src={post.userId.avatarUrl} alt="User Avatar" />
          <AvatarFallback>{post.userId.name.charAt(0)}</AvatarFallback>
        </Avatar>

        {/* Content on the right side */}
        <div className="flex-grow">
          <p className="font-medium text-neutral-500 dark:text-neutral-400">
            {post.userId.name}
          </p>
          <PageTitle>{post.title}</PageTitle>
          <p className="mt-2 text-justify font-light text-dark dark:text-light">
            {post.content}
          </p>
          <p className="mb-4 mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            <small>Posted </small>
            {createdAt}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ParentPost;
