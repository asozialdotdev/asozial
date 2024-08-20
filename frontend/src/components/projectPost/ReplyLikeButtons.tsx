"use client";
//Actions
import { createDislikeReply, createLikeReply } from "@/actions";
//React
import { useEffect, useMemo, useState } from "react";

//Ui
import { GoThumbsdown, GoThumbsup } from "react-icons/go";

//Lib
import FlipNumbers from "react-flip-numbers";

//Types
import { Reply } from "@/types/ProjectPost";

function ReplyLikeButtons({ reply }: { reply?: Reply }) {
  const [likes, setLikes] = useState(reply?.likes.length ?? 0);
  const [dislikes, setDislikes] = useState(reply?.dislikes.length ?? 0);
  const [userLiked, setUserLiked] = useState<boolean | undefined>(false);
  const [userDisliked, setUserDisliked] = useState<boolean | undefined>(false);

  //useMemo for performance
  const userId = useMemo(
    () => reply?.userId._id.toString(),
    [reply?.userId._id],
  );

  const hasUserLiked = useMemo(
    () => reply?.likes.some((id) => id.toString() === userId),
    [reply?.likes, userId],
  );

  const hasUserDisliked = useMemo(
    () => reply?.dislikes.some((id) => id.toString() === userId),
    [reply?.dislikes, userId],
  );

  // Check if the user has already liked or disliked the post
  useEffect(() => {
    setUserLiked(hasUserLiked);
    setUserDisliked(hasUserDisliked);
  }, [reply?.likes, reply?.dislikes, userId, hasUserLiked, hasUserDisliked]);

  const handleLike = async () => {
    try {
      const updatedLikes = await createLikeReply(reply?._id);
      setLikes(updatedLikes);

      if (userDisliked && dislikes > 0) {
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
      const updatedDislikes = await createDislikeReply(reply?._id);
      setDislikes(updatedDislikes);

      if (userLiked && likes > 0) {
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
      <div className="mb-4 flex w-full items-center gap-4">
        <div className="ml-8 flex items-center gap-1">
          <button onClick={handleLike}>
            <GoThumbsup size={20} />
          </button>
          <FlipNumbers
            height={16}
            width={16}
            color="green"
            background=""
            play
            perspective={100}
            numbers={likes.toString()}
          />
          {/* <p className="w-[10px] text-lg text-neutral-500 dark:text-neutral-400">
            {likes}
          </p> */}
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

export default ReplyLikeButtons;
