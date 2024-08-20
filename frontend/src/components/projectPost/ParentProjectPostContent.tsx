"use client";
//Next
import Link from "next/link";

//React
import { useState } from "react";

//Components
import UserAvatar from "../common/UserAvatar";
import PostLikeButtons from "./PostLikeButtons";
import ProjectPostContent from "./ProjectPostContent";
import ReplyCount from "./ReplyCount";

//Ui
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { VscEdit } from "react-icons/vsc";
import { Button } from "../ui/button";

//Types
import { ProjectPost, Reply } from "@/types/ProjectPost";
import { useSession } from "next-auth/react";

type ParentProjectPostContent = {
  post: ProjectPost;
  isProjectPage: boolean;
  replies?: Reply[];
};

function ParentProjectPostContent({
  post,
  isProjectPage,
  replies,
}: ParentProjectPostContent) {
  const session = useSession();
  const userId = session.data?.user?.id;
  const isAuthor = userId === post.userId._id.toString();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };
  return (
    <>
      <div className="flex w-full items-start gap-4">
        {/* Avatar  */}
        <div className="flex w-full flex-col gap-3 pl-2 lg:contents">
          <UserAvatar
            src={post.userId.image}
            username={post.userId.username}
            userId={post.userId._id}
          />
          {/* Post Title and Content */}
          <ProjectPostContent
            projectPost={post}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isProjectPage={isProjectPage}
          />
        </div>
      </div>
      <div>
        {/* Post Buttons */}
        <div className="flex items-center gap-4">
          <ReplyCount replies={post.replyCount || replies?.length} />
          <PostLikeButtons projectPost={post} />
          {isAuthor && (
            <div>
              <span
                className="-ml-1 mb-4 flex cursor-pointer items-center gap-2 text-base hover:opacity-75"
                onClick={toggleEditing}
              >
                <VscEdit size={20} />
                {isEditing ? (
                  <Button
                    variant="outline"
                    className="min-w-[85px] text-sm hover:dark:bg-zinc-300 dark:focus:bg-zinc-300"
                  >
                    Cancel
                  </Button>
                ) : (
                  <span className="-ml-[0.35rem] cursor-pointer text-sm hover:dark:bg-zinc-300 dark:focus:bg-zinc-300">
                    Edit
                  </span>
                )}
              </span>
            </div>
          )}
          {/* Arrow Button */}
          {isProjectPage && (
            <Link
              className="mb-3 ml-4 font-semibold hover:opacity-75"
              key={post._id.toString()}
              href={`/projects/${post.projectId}/posts/${post._id}`}
            >
              <span>
                <FaRegArrowAltCircleRight size={30} />
              </span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default ParentProjectPostContent;
