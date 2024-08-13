"use client";

import PageTitle from "@/components/common/PageTitle";
import { Post, PostId } from "@/types/Post";

import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { createReply } from "@/actions";

function PostComponent({ post }: { post: Post }) {
  const [isReplying, setIsReplying] = useState(false);

  const handleReply = () => {
    setIsReplying((prev) => !prev);
  };

  console.log("Post in post page", post);
  const createdAt = format(new Date(post.createdAt), "dd, MMM yyyy - HH:mm");
  return (
    <>
      <section className="w-full border-b">
        <div className="flex items-start gap-4">
          {/* Avatar on the left side */}
          <Avatar className="flex-shrink-0">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="User Avatar"
            />
            <AvatarFallback>{post.userId.charAt(0)}</AvatarFallback>
          </Avatar>

          {/* Content on the right side */}
          <div className="flex-grow">
            <PageTitle>{post.title}</PageTitle>
            <p className="font-medium text-neutral-500 dark:text-neutral-400">
              {post.userId}
            </p>
            <p className="mt-2 text-justify font-light text-dark dark:text-light">
              {post.content}
            </p>
            <p className="mb-4 mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              <small>Posted at </small>
              {createdAt}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full ">
        {post.replies.map((reply) => (
          <div className="flex items-start gap-4 border-b mt-6">
            {/* Avatar on the left side */}
            <Avatar className="flex-shrink-0">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User Avatar"
              />
              <AvatarFallback>{reply.userId.charAt(0)}</AvatarFallback>
            </Avatar>

            {/* Content on the right side */}
            <div className="flex-grow">
              <PageTitle>{reply.title}</PageTitle>
              <p className="font-medium text-neutral-500 dark:text-neutral-400">
                {reply.userId}
              </p>
              <p className="mt-2 text-justify font-light text-dark dark:text-light">
                {reply.content}
              </p>
              <p className="mt-1 mb-6 text-sm text-neutral-500 dark:text-neutral-400">
                <small>Posted at </small>
                {createdAt}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className='w-full py-4'>
        {!isReplying ? (
          <Button
            className="text-base font-semibold"
            onClick={handleReply}
          >
            Reply
          </Button>
        ) : (
          <form action={createReply} className="mt-4 flex flex-col gap-4">
            <Textarea
              name="content"
              className="h-12 w-full border border-neutral-300 p-2"
              placeholder="Reply to this post..."
            />
            <input
              type="hidden"
              name="projectId"
              value={post.projectId.toString()}
            />
            <input
              type="hidden"
              name="parentPostId"
              value={post._id.toString()}
            />

            <div className="flex items-center gap-4">
              <Button type="submit" className="">
                Post
              </Button>
              <Button type="button" variant="outline" onClick={handleReply}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </section>
    </>
  );
}

export default PostComponent;
