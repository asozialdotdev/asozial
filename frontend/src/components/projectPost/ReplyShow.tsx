import { fetchPostByIdAndReplies } from "@/actions";
import ReplyForm from "./ReplyForm";
import { ProjectPostId, Reply, ReplyId } from "@/types/ProjectPost";
import { format } from "date-fns";
import UserAvatar from "../common/UserAvatar";
import ProjectPostButtons from "./ProjectPostButtons";

type ReplyShowProps = {
  replyId: ReplyId;
  projectPostId: ProjectPostId;
};

async function ReplyShow({ replyId, projectPostId }: ReplyShowProps) {
  const { replies } = await fetchPostByIdAndReplies(projectPostId);

  const reply = replies.find((r: Reply) => r._id === replyId);

  if (!reply) {
    return null;
  }

  const childrenArr = replies.filter((r: Reply) => r.parentId === replyId);
  const isLastChild = childrenArr.length === 0;
  const isTopLevel = !reply.parentId;
  const createdAt = format(new Date(reply.createdAt), "dd, MMM yyyy - HH:mm");

  return (
    <div
      key={reply._id.toString()}
      className={`mt-6 flex w-full max-w-[96%] flex-col items-start gap-4 px-1 lg:space-x-4 ${
        !isTopLevel
          ? "border-dashed border-zinc-300 pl-2 dark:border-zinc-600"
          : "border border-dashed border-zinc-300 pl-6 pt-6 dark:border-zinc-600"
      } ${isLastChild ? "px-4 pb-4" : ""} `}
    >
      <section className="flex items-start gap-2">
        {/* Avatar on the left side */}

        <UserAvatar src={reply.userId.avatarUrl} name={reply.userId.name} />

        {/* Content on the right side */}
        <div className="flex-grow">
          <p className="font-medium text-neutral-500 dark:text-neutral-400">
            {reply.userId.name}
          </p>
          <p className="mt-2 text-justify text-sm font-light text-dark dark:text-light">
            {reply.content}
          </p>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            <small>Posted </small>
            {createdAt}
          </p>
        </div>
      </section>
      <ProjectPostButtons />
      <section>
        <ReplyForm
          projectPostId={reply.projectPostId}
          parentId={reply._id}
          startOpen={false}
        />
      </section>
      {childrenArr.map((child: Reply) => (
        <ReplyShow
          key={child._id?.toString()}
          replyId={child._id}
          projectPostId={projectPostId}
        />
      ))}
    </div>
  );
}

export default ReplyShow;
