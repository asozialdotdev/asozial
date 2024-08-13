import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import { PostId } from "@/types/Post";
import { ProjectId } from "@/types/Project";
import { fetchPostById } from "@/actions";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PostComponent from "@/components/post/PostComponent";

async function page({
  params,
}: {
  params: { projectId: ProjectId; postId: PostId };
}) {
  console.log("Params in post page", params);
  const post = await fetchPostById(params.postId);
  console.log("Post in post page", post);
  const createdAt = format(new Date(post.createdAt), "dd, MMM yyyy - HH:mm");
  return (
    <PageContainer className="max-w-screen-md">
      <PostComponent post={post} />
    </PageContainer>
  );
}

export default page;
