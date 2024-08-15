import PageContainer from "@/components/common/PageContainer";
import { PostId } from "@/types/Post";
import { fetchPostById } from "@/actions";
import PostComponent from "@/components/post/PostComponent";

async function PostPage({ params }: { params: { postId: PostId } }) {
  const { postId } = params;
  const post = await fetchPostById(postId);
  return (
    <PageContainer className="max-w-screen-md">
      <PostComponent post={post} />
    </PageContainer>
  );
}

export default PostPage;
