import { Post } from "@/types/Post";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import PageTitle from "../common/PageTitle";
import { format } from "date-fns";

function Replies({ post }: { post: Post }) {
  const createdAt = format(new Date(post.createdAt), "dd, MMM yyyy - HH:mm");

  return (
    <section className="w-full">
      {post.replies.map((reply) => (
        <div className="mt-6 flex items-start gap-4 border-b border-b-neutral-300 pl-14">
          {/* Avatar on the left side */}
          <Avatar className="flex-shrink-0">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="User Avatar"
            />
            <AvatarFallback>{reply.userId.toString().charAt(0)}</AvatarFallback>
          </Avatar>

          {/* Content on the right side */}
          <div className="flex-grow">
            <PageTitle>{reply.title}</PageTitle>
            <p className="font-medium text-neutral-500 dark:text-neutral-400">
              {reply.userId.toString()}
            </p>
            <p className="mt-2 text-justify font-light text-dark dark:text-light">
              {reply.content}
            </p>
            <p className="mb-6 mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              <small>Posted at </small>
              {createdAt}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Replies;
