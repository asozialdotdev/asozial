"use client";
import { ProjectPost } from "@/types/ProjectPost";
import { format, formatDistance } from "date-fns";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import EditPostForm from "./EditPostForm";

type ProjectPostContentProps = {
  projectPost: ProjectPost;
  isEditing?: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>
};

function ProjectPostContent({
  projectPost,
  isEditing,
  setIsEditing,
}: ProjectPostContentProps) {
  const post = projectPost;

  const { userId, title, content, createdAt } = projectPost;
  const username = userId.username;
  const formattedCreatedAt = formatDistance(new Date(createdAt), new Date(), {
    addSuffix: true,
  })
    .replace("about", "")
    .replace("minutes", "min");

  return !isEditing ? (
    <div className="flex-grow">
      {/* Post Content */}
      <p className="font-medium text-neutral-500 dark:text-neutral-400">
        {username}
      </p>
      <Link href={`/projects/${post.projectId}/posts/${post._id}`}>
        <h3 className="text-lg font-semibold tracking-wide">{title}</h3>
      </Link>
      <p className="mt-2 text-justify font-light text-dark dark:text-light">
        {content}
      </p>
      <p className="mb-4 mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        <small>Posted </small>
        {formattedCreatedAt}
      </p>
    </div>
  ) : (
    <>
      <EditPostForm projectPost={post} setIsEditing={setIsEditing} />
    </>
  );
}

export default ProjectPostContent;
