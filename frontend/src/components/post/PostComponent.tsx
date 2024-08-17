//React
import { useState } from "react";

//Components
import ReplyForm from "./ReplyForm";
import ParentPost from "./ParentPost";
import Replies from "./RepliesList";

//Types
import type { Post } from "@/types/Post";
import RepliesList from "./RepliesList";
import { fetchPostByIdAndReplies } from "@/actions";

async function PostComponent({ projectPostId }) {
  const { post } = await fetchPostByIdAndReplies(projectPostId);

  return (
    <>
      {/* Parent Post */}
       <ParentPost post={post} />

      {/* Replies */}
      {/* <RepliesList post={post} /> */}

      {/* Reply Form */}
      {/* <ReplyForm post={post} /> */}
    </>
  );
}

export default PostComponent;
