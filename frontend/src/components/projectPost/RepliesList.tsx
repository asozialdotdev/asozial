//Types
import type { ProjectPostId, Reply, ReplyId } from "@/types/ProjectPost";
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

  return (
    <section className="w-full p-4">
      <h2 className="text-xl font-semibold">{replies.length} comments</h2>

      {topLevelReplies.map((reply: Reply) => (
        <ReplyShow
          key={reply._id?.toString()}
          replyId={reply._id}
          projectPostId={projectPostId}
        />
      ))}
    </section>
  );
}

export default RepliesList;
