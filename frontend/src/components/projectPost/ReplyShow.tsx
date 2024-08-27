"use client";
//React
import { useState } from "react";

//Actions
import { deleteReply } from "@/actions";

//Components
import ReplyForm from "./ReplyForm";
import UserAvatar from "../common/ui/image/UserAvatar";
import EditReplyForm from "./EditReplyForm";
import CustomDialog from "../common/ui/CustomDialog";
import DeleteIcon from "../common/ui/icons/DeleteIcon";
import EditIcon from "../common/ui/icons/EditIcon";

//Ui
import { MessageSquareOff } from "lucide-react";

//Lib
import { useSession } from "next-auth/react";

//Utils
import { formattedData } from "@/utils";

//Types
import type { ProjectPostId, Reply, ReplyId } from "@/types/ProjectPost";
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
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const reply = replies.find((r: Reply) => r._id === replyId);

  const isAuthor = userId === reply?.userId._id.toString();

  if (!reply) {
    return null;
  }

  const toggleEdit = () => {
    setEdit((prev) => !prev);
    setError("");
  };

  console.log(isDeleting, "reply is deleting");

  const handleDelete = async () => {
    setIsDeleting(true);
    console.log("delete called");
    const result = await deleteReply(replyId);
    if (result.error) {
      console.error("Error deleting reply", result.error);
      setError(result.message);
      setIsDeleting(false);
    } else {
      console.log("Reply deleted successfully");
      setIsDeleting(false);
    }
  };

  const childrenArr = replies.filter((r: Reply) => r.parentId === replyId);
  const isLastChild = childrenArr.length === 0;
  const isTopLevel = !reply.parentId;

  const formattedCreatedAt = formattedData(reply.createdAt);
  const formattedUpdatedAt = formattedData(reply.updatedAt);

  return (
    <>
      <div
        key={reply._id?.toString()}
        className={`mt-6 flex w-full flex-col items-start gap-4 pr-1 lg:max-w-[96%] lg:space-x-4 ${!isTopLevel ? "border-l border-dashed border-zinc-300 pl-4 dark:border-zinc-600" : "border-b border-dashed border-zinc-300 dark:border-zinc-600"} ${isLastChild ? "mb-6" : ""} `}
        style={{ marginLeft: child ? "1rem" : "0" }}
      >
        {reply.deleted ? (
          <div className="flex items-center gap-2">
            <p>Comment deleted by the user </p>
            <span>
              <MessageSquareOff />
            </span>
          </div>
        ) : (
          <>
            <section className="flex items-start gap-2">
              <div className="flex flex-col gap-3 lg:contents">
                {/* Avatar on the left side */}

                <UserAvatar
                  src={reply.userId.info.image}
                  username={reply.userId.info.username}
                  userId={reply.userId._id}
                />

                {/* Content on the right side */}

                <div className="flex-grow">
                  <p className="font-medium text-neutral-500 dark:text-neutral-400">
                    {reply.userId.info.username}
                  </p>
                  <p className="mt-2 text-justify text-sm font-light text-dark dark:text-light">
                    {reply.content}
                  </p>

                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    <small>Posted </small>
                    {formattedCreatedAt}
                  </p>
                  {reply.edited && (
                    <>
                      <p className="mb-2 text-[0.65rem] text-neutral-500 dark:text-neutral-400">
                        <small>Edited </small>
                        {formattedUpdatedAt}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </section>

            <section className="flex items-center gap-6 pr-6">
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
                      <div className="mb-1 flex items-baseline gap-5">
                        <EditIcon toggleEditing={toggleEdit} key="edit-reply" />
                        <CustomDialog
                          title="Are you sure?"
                          description="There's no turning back once you delete this reply"
                          handler={handleDelete}
                          trigger={<DeleteIcon key="delete-reply" />}
                          asChild={false}
                        />
                      </div>
                    )
                  )}
                </>
              ) : null}
            </section>
          </>
        )}

        {error && (
          <span className="flex flex-nowrap text-sm font-light text-red-500">
            {error}
          </span>
        )}
        {/* Children Replies */}
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
