import { format } from "date-fns";
import PageTitle from "../common/PageTitle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Post } from "@/types/Post";

function ParentPost({ post }: { post: Post }) {
  const createdAt = format(new Date(post.createdAt), "dd, MMM yyyy - HH:mm");

  return (
    <section className="flex w-[768px] flex-col gap-1 rounded-md border-b border-b-neutral-300 px-8 py-10 shadow-md dark:border-b-neutral-600 dark:shadow-neutral-700/30">
      <div className="flex items-start gap-4">
        {/* Avatar on the left side */}
        <Avatar className="flex-shrink-0">
          <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
          <AvatarFallback>{post.userId.toString().charAt(0)}</AvatarFallback>
        </Avatar>

        {/* Content on the right side */}
        <div className="flex-grow">
          <PageTitle>{post.title}</PageTitle>
          <p className="font-medium text-neutral-500 dark:text-neutral-400">
            {post.userId.toString()}
          </p>
          <p className="mt-2 text-justify font-light text-dark dark:text-light">
            {post.content}
          </p>
          <p className="mb-4 mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            <small>Posted at </small>
            {createdAt}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ParentPost;