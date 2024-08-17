import { fetchPostByIdAndReplies } from "@/actions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ReplyForm from "./ReplyForm";
import { ProjectPostId, Reply, ReplyId } from "@/types/Post";
import { format } from "date-fns";

type ReplyShowProps = {
  replyId: ReplyId;
  projectPostId: ProjectPostId;
  children?: boolean;
};

async function ReplyShow({ replyId, projectPostId, children }: ReplyShowProps) {
  const { replies } = await fetchPostByIdAndReplies(projectPostId);

  const reply = replies.find((r: Reply) => r._id === replyId);

  if (!reply) {
    return;
  }

  const childrenArr = replies.filter((r: Reply) => r.parentId === replyId);
  const isLastChild = childrenArr.length === 0;
  const isTopLevel = !reply.parentId;
  const createdAt = format(new Date(reply.createdAt), "dd, MMM yyyy - HH:mm");
  return (
    <div
      key={reply._id.toString()}
      className={`mt-6 flex w-full max-w-[95%] flex-col items-start gap-4 pb-4 px-1 ${
        !isTopLevel
          ? "border-l border-neutral-400 pl-4"
          : "border-l-2 border-neutral-500 pl-4"
      } ${isLastChild ? "border-b border-neutral-400 pb-4" : ""} `}
    >
      <section className="flex items-start gap-2">
        {/* Avatar on the left side */}
        <Avatar className="flex-shrink-0">
          <AvatarImage src={reply.userId.avatarUrl} alt="User Avatar" />
          <AvatarFallback>
            {reply.userId.name.toString().charAt(0)}
          </AvatarFallback>
        </Avatar>

        {/* Content on the right side */}
        <div className="flex-grow">
          <p
            className={`font-medium ${isTopLevel ? "text-lg text-neutral-700 dark:text-neutral-300" : "text-neutral-500 dark:text-neutral-400"}`}
          >
            {reply.userId.name}
          </p>
          <p
            className={`mt-2 text-justify font-light ${isTopLevel ? "text-dark dark:text-light" : "text-sm text-dark dark:text-light"}`}
          >
            {reply.content}
          </p>
          <p className="mb-4 mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            <small>Posted </small>
            {createdAt}
          </p>
        </div>
      </section>

      <section>
        <ReplyForm
          projectPostId={reply.projectPostId}
          parentId={reply._id}
          startOpen={false}
        />
      </section>

      {childrenArr.map((child: Reply) => (
        <ReplyShow
          key={child._id.toString()}
          replyId={child._id}
          projectPostId={projectPostId}
          children
        />
      ))}
    </div>
  );
}

export default ReplyShow;
