//Ui
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

//Components
import PageTitle from "../common/PageTitle";

//Lib
import { format } from "date-fns";

//Types
import type { Post, ProjectPostId, Reply, ReplyId } from "@/types/Post";
import ReplyShow from "./ReplyShow";
import { fetchPostByIdAndReplies } from "@/actions";

async function RepliesList({
  projectPostId,
}: {
  projectPostId: ProjectPostId;
}) {
  const { replies } = await fetchPostByIdAndReplies(projectPostId);
  console.log("Replies:>>>>>>>>>> ", replies.length);

  if (!replies) {
    return null;
  }

  const topLevelReplies = replies.filter(
    (reply: Reply) => reply.parentId === null,
  );
  // console.log("Top Level Replies: ", topLevelReplies);

  // const createdAt = format(new Date(post.createdAt), "dd, MMM yyyy - HH:mm");

  return (
    <section className="w-full p-4">
      <h2 className="text-xl font-semibold">{replies.length} replies</h2>

      {topLevelReplies.map((reply: Reply) => (
        <ReplyShow
          key={reply._id.toString()}
          replyId={reply._id}
          projectPostId={projectPostId}
        />
      ))}
    </section>
  );
}

export default RepliesList;
