"use client";
import { createDislikePost, createLikePost } from "@/actions";
import { ProjectPost } from "@/types/ProjectPost";
import { useEffect, useState } from "react";
import { GoCommentDiscussion, GoThumbsdown, GoThumbsup } from "react-icons/go";
import { Button } from "../ui/button";

function ProjectPostLikeButtons({ projectPost }: { projectPost: ProjectPost }) {
  const [likes, setLikes] = useState(projectPost.likes.length ?? 0);
  const [dislikes, setDislikes] = useState(projectPost.dislikes.length ?? 0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);

  const userId = projectPost.userId._id.toString();

  // Check if the user has already liked or disliked the post
  useEffect(() => {
    setUserLiked(projectPost.likes.some((id) => id.toString() === userId));
    setUserDisliked(
      projectPost.dislikes.some((id) => id.toString() === userId),
    );
  }, [projectPost.likes, projectPost.dislikes, userId]);

  const handleLike = async () => {
    try {
      const updatedLikes = await createLikePost(projectPost._id);
      setLikes(updatedLikes);

      if (userDisliked) {
        setDislikes((prev) => prev - 1);
        setUserDisliked(false);
      }

      setUserLiked(!userLiked);
    } catch (error) {
      console.error("Error liking post");
    }
  };

  const handleDislike = async () => {
    try {
      const updatedDislikes = await createDislikePost(projectPost._id);
      setDislikes(updatedDislikes);

      if (userLiked) {
        setLikes((prev) => prev - 1);
        setUserLiked(false);
      }

      setUserDisliked(!userDisliked);
    } catch (error) {
      console.error("Error disliking post");
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-1">
          <button onClick={handleLike}>
            <GoThumbsup size={20} />
          </button>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            {likes}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleDislike}>
            <GoThumbsdown size={20} />
          </button>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            {dislikes}
          </p>
        </div>
      </div>
    </>
  );
}

export default ProjectPostLikeButtons;
