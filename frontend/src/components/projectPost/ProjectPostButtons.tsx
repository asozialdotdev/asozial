"use client";
//Actions
import { createDislikePost, createLikePost } from "@/actions";

//React
import { useEffect, useMemo, useState } from "react";

//Ui
import { GoThumbsdown, GoThumbsup } from "react-icons/go";
import { FiEdit } from "react-icons/fi";

//Lib
import FlipNumbers from "react-flip-numbers";
import { useTheme } from "next-themes";

//Types
import { ProjectPost } from "@/types/ProjectPost";

type ProjectPostLikeButtonsProps = {
  projectPost: ProjectPost;
  editing?: boolean;
};

function ProjectPostLikeButtons({ projectPost }: ProjectPostLikeButtonsProps) {
  const [likes, setLikes] = useState(projectPost.likes.length ?? 0);
  const [dislikes, setDislikes] = useState(projectPost.dislikes.length ?? 0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);

  const { theme } = useTheme();
  console.log("theme", theme);

  //useMemo for performance
  const userId = useMemo(
    () => projectPost.userId._id.toString(),
    [projectPost.userId._id],
  );

  const hasUserLiked = useMemo(
    () => projectPost.likes.some((id) => id.toString() === userId),
    [projectPost.likes, userId],
  );

  const hasUserDisliked = useMemo(
    () => projectPost.dislikes.some((id) => id.toString() === userId),
    [projectPost.dislikes, userId],
  );

  // Check if the user has already liked or disliked the post
  useEffect(() => {
    setUserLiked(hasUserLiked);
    setUserDisliked(hasUserDisliked);
  }, [projectPost.likes, projectPost.dislikes, userId]);

  const handleLike = async () => {
    try {
      const updatedLikes = await createLikePost(projectPost._id);
      setLikes(updatedLikes);

      if (userDisliked) {
        setDislikes((prev) => prev - 1);
        setUserDisliked(false);
      }

      setUserLiked(true);
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

      setUserDisliked(true);
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
          {/* <p className="w-[10px] text-lg text-neutral-500 dark:text-neutral-400">
            {likes}
          </p> */}
          <FlipNumbers
            height={16}
            width={16}
            color="green"
            background=""
            play
            perspective={100}
            numbers={likes.toString()}
          />
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleDislike}>
            <GoThumbsdown size={20} />
          </button>
          {/* <p className="w-[10px] text-lg text-neutral-500 dark:text-neutral-400">
            {dislikes}
          </p> */}
          <FlipNumbers
            height={16}
            width={16}
            color="red"
            background=""
            play
            perspective={100}
            numbers={dislikes.toString()}
          />
        </div>
      </div>
    </>
  );
}

export default ProjectPostLikeButtons;
