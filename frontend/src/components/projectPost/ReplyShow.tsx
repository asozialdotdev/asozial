"use client";
//React
import { useState } from "react";

//Components
import ReplyForm from "./ReplyForm";
import UserAvatar from "../common/UserAvatar";
import EditReplyForm from "./EditReplyForm";

//Ui
import { VscEdit } from "react-icons/vsc";

//Utils
import { formattedData } from "@/utils";

//Types
import type { ProjectPostId, Reply, ReplyId } from "@/types/ProjectPost";
import { useSession } from "next-auth/react";

type ReplyShowProps = {
  replyId: ReplyId;
  projectPostId: ProjectPostId;
  replies: Reply[];
  child?: boolean;
};

function ReplyShow({ replyId, projectPostId, replies, child }: ReplyShowProps) {
  const session = useSession();
  const userId = session.data?.user?.id;
  const startOpen = false;

  const [open, setOpen] = useState<boolean>(startOpen);

  const [edit, setEdit] = useState(false);

  const reply = replies.find((r: Reply) => r._id === replyId);

  const isAuthor = userId === reply?.userId._id.toString();
  console.log("isAuthor reply", isAuthor);

  if (!reply) {
    return null;
  }

  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };

  const childrenArr = replies.filter((r: Reply) => r.parentId === replyId);
  const isLastChild = childrenArr.length === 0;
  const isTopLevel = !reply.parentId;

  const formattedCreatedAt = formattedData(reply.createdAt);
  const formattedUpdatedAt = formattedData(reply.updatedAt);

  return (
    <>
      {/* <div
        key={reply._id?.toString()}
        className={`mt-6 flex w-full flex-col items-start gap-4 pl-6 pr-1 lg:max-w-[96%] lg:space-x-4 lg:pl-2 ${
          !isTopLevel
            ? "border-dashed border-zinc-300 pl-2 dark:border-zinc-600"
            : "border border-dashed border-zinc-300 pl-2 pt-6 dark:border-zinc-600 lg:pl-6"
        } ${isLastChild ? "px-4 pb-4" : ""} `} */}
      {/* > */}
      <div
        key={reply._id?.toString()}
        className={`mt-6 flex w-full flex-col items-start gap-4 pr-1 lg:max-w-[96%] lg:space-x-4 ${!isTopLevel ? "border-l border-dashed border-zinc-300 pl-4 dark:border-zinc-600" : "border-b border-dashed border-zinc-300 dark:border-zinc-600"} ${isLastChild ? "mb-6" : ""} `}
        style={{ marginLeft: child ? "1rem" : "0" }}
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
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                <small>Posted </small>
                {formattedCreatedAt}
              </p>
              {reply.edited && (
                <p className="mb-2 text-xs text-neutral-500 dark:text-neutral-400">
                  <small>Edited </small>
                  {formattedUpdatedAt}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="flex items-center gap-4 pr-6">
          {/* Buttons and Forms /> */}
          {!edit && (
            <ReplyForm
              projectPostId={reply.projectPostId}
              parentId={reply._id}
              reply={reply}
              startOpen={startOpen}
              open={open}
              setOpen={setOpen}
            />
          )}

          {isAuthor ? (
            <>
              {edit ? (
                <EditReplyForm
                  reply={reply}
                  projectPostId={projectPostId}
                  startOpen={false}
                  edit={edit}
                  toggleEdit={toggleEdit}
                />
              ) : (
                !open && (
                  <button
                    className="-ml-2 mb-4 flex items-end gap-[0.4rem] text-sm hover:opacity-75"
                    onClick={toggleEdit}
                  >
                    <VscEdit size={20} />
                    <span>Edit</span>
                  </button>
                )
              )}
            </>
          ) : null}
        </section>

        {childrenArr.map((child: Reply) => (
          <ReplyShow
            key={child._id?.toString()}
            replyId={child._id}
            projectPostId={projectPostId}
            replies={replies}
            child={true}
          />
        ))}
      </div>
    </>
  );
}

export default ReplyShow;
