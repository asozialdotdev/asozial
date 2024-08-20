"use client";
//Actions
import { createDislikePost, createLikePost } from "@/actions";

//React
import { useEffect, useMemo, useState } from "react";

//Ui
import { GoThumbsdown, GoThumbsup } from "react-icons/go";

//Lib
import FlipNumbers from "react-flip-numbers";
import { useTheme } from "next-themes";

//Types
import { ProjectPost, User } from "@/types/ProjectPost";

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

  const userId = useMemo(
    () => projectPost.userId._id.toString(),
    [projectPost.userId._id],
  );

  // Check if the user has already liked or disliked the post
  useEffect(() => {
    setUserLiked(projectPost.likes.includes(userId));
    setUserDisliked(projectPost.dislikes.includes(userId));
  }, [projectPost.likes, projectPost.dislikes, userId]);

  const handleLike = async () => {
    setUserLiked(true);
    setLikes((prev) => prev + 1);

    if (userDisliked) {
      setUserDisliked(false);
      setDislikes((prev) => prev - 1);
    }

    try {
      const updatedLikes = await createLikePost(projectPost._id);
      setLikes(updatedLikes);
    } catch (error) {
      setUserLiked(false);
      setLikes((prev) => prev - 1);
      if (userDisliked) {
        setUserDisliked(true);
        setDislikes((prev) => prev + 1);
      }
    }
  };

  const handleDislike = async () => {
    setUserDisliked(true);
    setDislikes((prev) => prev + 1);

    if (userLiked) {
      setUserLiked(false);
      setLikes((prev) => prev - 1);
    }

    try {
      const updatedDislikes = await createDislikePost(projectPost._id);
      setDislikes(updatedDislikes);
    } catch (error) {
      setUserDisliked(false);
      setDislikes((prev) => prev - 1);
      if (userLiked) {
        setUserLiked(true);
        setLikes((prev) => prev + 1);
      }
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-1">
          <button onClick={handleLike}>
            <GoThumbsup
              size={20}
              className={`hover:opacity-75 ${userLiked ? "text-green-700 dark:text-green-600" : "text-dark dark:text-light"}`}
            />

            {/* <GoThumbsup size={20} className="hover:opacity-75"  fill={hasUserLiked ? "text-green-500 dark:text-green-400" : "text-dark dark:text-light"} /> */}
          </button>
          {/* <p className="w-[10px] text-lg text-neutral-500 dark:text-neutral-400">
            {likes}
          </p> */}
          <FlipNumbers
            height={16}
            width={16}
            color="rgb(156 163 175)"
            play
            perspective={100}
            numbers={likes.toString()}
          />
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleDislike}>
            <GoThumbsdown
              size={20}
              className={`hover:opacity-75 ${userDisliked ? "text-orange-700 dark:text-orange-600" : "text-dark dark:text-light"}`}
            />
          </button>

          <FlipNumbers
            height={16}
            width={16}
            color="rgb(156 163 175)"
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
