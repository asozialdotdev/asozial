"use client";
import { ProjectPostId, Reply } from "@/types/ProjectPost";
import ReplyShow from "./ReplyShow";
import { useState } from "react";

type TopLevelRepliesProps = {
  replies: Reply[];
  projectPostId: ProjectPostId;
};

function TopLevelReplies({ replies, projectPostId }: TopLevelRepliesProps) {

  const topLevelReplies = replies.filter(
    (reply: Reply) => reply.parentId === null,
  );
  return (
    <section className="w-full p-4">
      <h2 className="text-xl font-semibold">
        {replies && replies.length > 0
          ? `${replies.length} comment${replies.length > 1 ? "s" : ""}`
          : "No comments yet"}
      </h2>

      {topLevelReplies.map((reply: Reply) => (
        <ReplyShow
          key={reply._id?.toString()}
          replyId={reply._id}
          projectPostId={projectPostId}
          replies={replies}
          children={false}
        />
      ))}
    </section>
  );
}

export default TopLevelReplies;
