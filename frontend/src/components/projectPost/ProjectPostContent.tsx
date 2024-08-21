"use client";
//Next
import Link from "next/link";
//React
import { Dispatch, SetStateAction } from "react";

//Utils
import { formattedData } from "@/utils";

//Components
import EditPostForm from "./EditPostForm";

//Types
import { ProjectPost } from "@/types/ProjectPost";

type ProjectPostContentProps = {
  projectPost: ProjectPost;
  isEditing?: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  isProjectPage?: boolean;
};

function ProjectPostContent({
  projectPost,
  isEditing,
  setIsEditing,
  isProjectPage,
}: ProjectPostContentProps) {
  const post = projectPost;

  const { userId, title, content, createdAt, updatedAt } = projectPost;
  const username = userId.username;

  const formattedCreatedAt = formattedData(createdAt);
  const formattedUpdatedAt = formattedData(updatedAt);

  return !isEditing ? (
    <div className="flex-grow">
      {/* Post Content */}
      <p className="font-medium text-neutral-500 dark:text-neutral-400">
        {username}
      </p>
      {isProjectPage ? (
        <Link href={`/projects/${post.projectId}/posts/${post._id}`}>
          <h3 className="text-lg font-semibold tracking-wide hover:opacity-75">
            {title}
          </h3>
        </Link>
      ) : (
        <h3 className="text-lg font-semibold tracking-wide">{title}</h3>
      )}
      <p className="mt-2 text-justify font-light text-dark dark:text-light">
        {content}
      </p>

      <p
        className={`${projectPost.edited ? "mb-0" : "mb-4"} mt-4 text-sm text-neutral-500 dark:text-neutral-400`}
      >
        <small>Posted </small>
        {formattedCreatedAt}
      </p>
      {projectPost.edited && (
        <>
          <p className="mb-4 text-xs text-neutral-500 dark:text-neutral-400">
            <small>Edited </small>
            {formattedUpdatedAt}
          </p>
        </>
      )}
    </div>
  ) : (
    <>
      <EditPostForm projectPost={post} setIsEditing={setIsEditing} />
    </>
  );
}

export default ProjectPostContent;
