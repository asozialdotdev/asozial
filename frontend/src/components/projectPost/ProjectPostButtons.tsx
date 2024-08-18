"use client";
import { createDislikePost, createLikePost } from "@/actions";
import { ProjectPost } from "@/types/ProjectPost";
import { useEffect, useState } from "react";
import { GoCommentDiscussion, GoThumbsdown, GoThumbsup } from "react-icons/go";
import { Button } from "../ui/button";

function ProjectPostLikeButtons({ projectPost }: { projectPost: ProjectPost }) {
  console.log("ProjectPostLikeButtons:||||||||||||||||||", projectPost.title);
  const [likes, setLikes] = useState(projectPost.likes.length ?? 0);
  const [dislikes, setDislikes] = useState(projectPost.dislikes.length ?? 0);



  console.log("deslikes>>>>>>", dislikes);
  console.log("likes>>>>>>", likes);
  const handleLike = async () => {
    const likes = await createLikePost(projectPost._id);
    setLikes(likes);
  };

  const handleDislike = async () => {
    const dislikes = await createDislikePost(projectPost._id);
    setDislikes(dislikes);
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
