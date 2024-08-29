//Types
import type { ProjectPostId } from "@/types/ProjectPost";
import { fetchPostByIdAndReplies } from "@/actions";
import TopLevelReplies from "./TopLevelReplies";

async function RepliesList({
  projectPostId,
}: {
  projectPostId: ProjectPostId;
}) {
  const { replies } = await fetchPostByIdAndReplies(projectPostId);

  if (!replies) {
    return null;
  }

  return <TopLevelReplies replies={replies} projectPostId={projectPostId} />;
}

export default RepliesList;
