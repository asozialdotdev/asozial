//Ui
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

//Components
import PageTitle from "../common/PageTitle";

//Lib
import { format } from "date-fns";

//Types
import type { Post } from "@/types/Post";
import ReplyShow from "./ReplyShow";
import { fetchPostByIdAndReplies } from "@/actions";

async function RepliesList({ projectPostId }) {
  const { replies } = await fetchPostByIdAndReplies(projectPostId);

  if (!replies) {
    return null;
  }

  const topLevelReplies = replies.filter((reply) => reply.parentId === null);
  console.log("Top Level Replies: ", topLevelReplies);

  // const createdAt = format(new Date(post.createdAt), "dd, MMM yyyy - HH:mm");

  return (
    <section className="w-full">
      {topLevelReplies.map((reply) => (
        <ReplyShow
          key={reply._id}
          replyId={reply._id}
          projectPostId={projectPostId}
        />
      ))}
    </section>
  );
}

export default RepliesList;
