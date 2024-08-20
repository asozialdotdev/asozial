"use client";
//Actions
import { fetchPostByIdAndReplies } from "@/actions";

//Components
import ReplyForm from "./ReplyForm";
import UserAvatar from "../common/UserAvatar";

//Lib
import { formatDistance } from "date-fns";

//Types
import type { ProjectPostId, Reply, ReplyId } from "@/types/ProjectPost";
import { useState } from "react";

type ReplyShowProps = {
  replyId: ReplyId;
  projectPostId: ProjectPostId;
  replies: Reply[];
};

function ReplyShow({ replyId, projectPostId, replies }: ReplyShowProps) {
  // const { replies } = await fetchPostByIdAndReplies(projectPostId);

  const [isEditingReply, setIsEditingReply] = useState<boolean>(false);

  console.log("REPLIE>>>>>", replies);

  const reply = replies.find((r: Reply) => r._id === replyId);

  if (!reply) {
    return null;
  }

  const childrenArr = replies.filter((r: Reply) => r.parentId === replyId);
  const isLastChild = childrenArr.length === 0;
  const isTopLevel = !reply.parentId;
  const formattedCreatedAt = formatDistance(
    new Date(reply.createdAt),
    new Date(),
    {
      addSuffix: true,
    },
  )
    .replace("about", "")
    .replace("minutes", "min");
  return (
    <div
      key={reply._id?.toString()}
      className={`mt-6 flex w-full flex-col items-start gap-4 pr-1 lg:max-w-[96%] lg:space-x-4 ${
        !isTopLevel
          ? "border-dashed border-zinc-300 pl-2 dark:border-zinc-600"
          : "border border-dashed border-zinc-300 pl-2 pt-6 dark:border-zinc-600 lg:pl-6"
      } ${isLastChild ? "px-4 pb-4" : ""} `}
    >
      <section className="flex items-start gap-2">
        <div className="flex flex-col gap-3 lg:contents">
          {/* Avatar on the left side */}
          <UserAvatar
            src={reply.userId.image}
            username={reply.userId.username}
            userId={reply.userId._id}
          />

          {/* Content on the right side */}
          <div className="flex-grow">
            <p className="font-medium text-neutral-500 dark:text-neutral-400">
              {reply.userId.username}
            </p>
            <p className="mt-2 text-justify text-sm font-light text-dark dark:text-light">
              {reply.content}
            </p>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              <small>Posted </small>
              {formattedCreatedAt}
            </p>
          </div>
        </div>
      </section>
      <section className="flex items-center gap-4">
        <ReplyForm
          projectPostId={reply.projectPostId}
          parentId={reply._id}
          reply={reply}
          startOpen={false}
        />
      </section>
      {childrenArr.map((child: Reply) => (
        <ReplyShow
          key={child._id?.toString()}
          replyId={child._id}
          projectPostId={projectPostId}
          replies={replies}
        />
      ))}
    </div>
  );
}

export default ReplyShow;
