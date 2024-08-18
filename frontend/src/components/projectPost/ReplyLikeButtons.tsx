"use client";
import {
  createDislikePost,
  createDislikeReply,
  createLikePost,
  createLikeReply,
} from "@/actions";
import { Reply } from "@/types/ProjectPost";
import { useEffect, useState } from "react";
import { GoCommentDiscussion, GoThumbsdown, GoThumbsup } from "react-icons/go";
import { Button } from "../ui/button";

function ReplyLikeButtons({ reply }: { reply: Reply }) {
  const [likes, setLikes] = useState(reply.likes.length ?? 0);
  const [dislikes, setDislikes] = useState(reply.dislikes.length ?? 0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);

  const userId = reply.userId._id.toString();

  // Check if the user has already liked or disliked the post
  useEffect(() => {
    setUserLiked(reply.likes.some((id) => id.toString() === userId));
    setUserDisliked(reply.dislikes.some((id) => id.toString() === userId));
  }, [reply.likes, reply.dislikes, userId]);

  const handleLike = async () => {
    try {
      const updatedLikes = await createLikeReply(reply._id);
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
      const updatedDislikes = await createDislikeReply(reply._id);
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
      <div className="mb-4 flex w-full items-center gap-4">
        <div className="flex items-center gap-2 ml-8">
          <button onClick={handleLike}>
            <GoThumbsup size={20} />
          </button>
          <p className="w-[10px] text-lg text-neutral-500 dark:text-neutral-400">
            {likes}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleDislike}>
            <GoThumbsdown size={20} />
          </button>
          <p className="w-[10px] text-lg text-neutral-500 dark:text-neutral-400">
            {dislikes}
          </p>
        </div>
      </div>
    </>
  );
}

export default ReplyLikeButtons;
