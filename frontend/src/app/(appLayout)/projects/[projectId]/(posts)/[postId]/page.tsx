import { PostId } from "@/types/Post";
import { ProjectId } from "@/types/Project";

function page({
  params,
}: {
  params: { projectId: ProjectId; postId: PostId };
}) {
  console.log("Params in post page", params);
  return <div>This is project's posts page</div>;
}

export default page;
