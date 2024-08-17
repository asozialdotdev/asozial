import { fetchPostByIdAndReplies } from "@/actions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ReplyForm from "./ReplyForm";

async function ReplyShow({
  replyId,
  projectPostId,
}: {
  replyId: string;
  projectPostId: string;
}) {
  const { replies } = await fetchPostByIdAndReplies(projectPostId);
  const reply = replies.find((r) => r._id === replyId);

  if (!reply) {
    return null;
  }

  const children = replies.filter((r) => r.parentId === replyId);
  return (
    <div
      key={reply._id.toString()}
      className="mt-6 flex items-start gap-4 border-b border-b-neutral-300 pl-14"
    >
      {/* Avatar on the left side */}
      <Avatar className="flex-shrink-0">
        <AvatarImage src={reply.userId.avatarUrl} alt="User Avatar" />
        <AvatarFallback>
          {reply.userId.name.toString().charAt(0)}
        </AvatarFallback>
      </Avatar>

      {/* Content on the right side */}
      <div className="flex-grow">
        <p className="font-medium text-neutral-500 dark:text-neutral-400">
          {reply.userId.name}
        </p>
        <p className="mt-2 text-justify font-light text-dark dark:text-light">
          {reply.content}
        </p>
        <p className="mb-6 mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          <small>Posted </small>
          14,aug 2021
        </p>
      </div>
      {children.map((child) => (
        <ReplyShow
          key={child._id}
          replyId={child._id}
          projectPostId={projectPostId}
        />
      ))}
      <ReplyForm projectPostId={reply.projectPostId} parentId={reply._id} />
    </div>
  );
}

export default ReplyShow;
