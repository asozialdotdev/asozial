//Utils
import { format } from "date-fns";

//Ui
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

//Types
import type { Post } from "@/types/Post";
function ProjectPost({ post }: { post: Post }) {
  const createdAt = format(new Date(post.createdAt), "dd, MMM yyyy - HH:mm");

  return (
    <div
      key={post._id.toString()}
      className="flex flex-col gap-1 rounded-md border-b border-b-zinc-300 px-8 py-10 shadow-md hover:bg-zinc-100 dark:border-b-zinc-600 dark:shadow-neutral-700/30 dark:hover:bg-zinc-800"
    >
      <div className="flex items-start gap-4">
        {/* Avatar  */}
        <Avatar className="flex-shrink-0">
          <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
          <AvatarFallback>{post.userId.toString().charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          {/* Content */}
          <h3 className="text-lg font-semibold tracking-wide">{post.title}</h3>
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
    </div>
  );
}

export default ProjectPost;