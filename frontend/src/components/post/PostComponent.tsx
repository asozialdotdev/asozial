"use client";

//React
import { useState } from "react";

//Components
import ReplyForm from "./ReplyForm";
import ParentPost from "./ParentPost";
import Replies from "./Replies";

//Types
import type { Post } from "@/types/Post";

function PostComponent({ post }: { post: Post }) {
  const [isReplying, setIsReplying] = useState(false);
  const handleReply = () => {
    setIsReplying((prev) => !prev);
  };

  return (
    <>
      {/* Parent Post */}
      <ParentPost post={post} />

      {/* Replies */}
      <Replies post={post} />

      {/* Reply Form */}
      <ReplyForm
        isReplying={isReplying}
        handleReply={handleReply}
        post={post}
      />
    </>
  );
}

export default PostComponent;
