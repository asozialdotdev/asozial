"use client";
import UserAvatar from "../common/UserAvatar";
import ProjectPostLikeButtons from "./ProjectPostButtons";
import ProjectPostContent from "./ProjectPostContent";
import ReplyCount from "./ReplyCount";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Project } from "@/types/Project";
import { ProjectPost, Reply } from "@/types/ProjectPost";
import { useState } from "react";
import Link from "next/link";

type ParentProjectPostContent = {
  post: ProjectPost;
  isProjectPage: boolean;
  replies?: Reply[]
};


function ParentProjectPostContent({ post, isProjectPage, replies }: ParentProjectPostContent) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  console.log ("post replies", post)

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };
  return (
    <>
      <div className="flex items-start gap-4">
        {/* Avatar  */}
        <div className="flex flex-col gap-3 pl-2 lg:contents">
          <UserAvatar
            src={post.userId.image}
            username={post.userId.username}
            userId={post.userId._id}
          />

          <ProjectPostContent
            projectPost={post}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>
      </div>
      <div>
        <div className="flex items-center gap-4">
          <ReplyCount replies={post.replyCount || replies?.length} />
          <ProjectPostLikeButtons
            projectPost={post}
            toggleEditing={toggleEditing}
          />

          {isProjectPage && (
            <Link
              className="mb-3 ml-4 font-semibold"
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
