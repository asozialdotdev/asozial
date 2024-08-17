//Action
import { fetchPostById } from "@/actions";

//Components
import PageContainer from "@/components/common/PageContainer";
import PostComponent from "@/components/post/PostComponent";

//Types
import type { PostId } from "@/types/Post";

async function PostPage({ params }: { params: { postId: PostId } }) {
  const { postId } = params;
  const post = await fetchPostById(postId);
  return (
    <PageContainer className="w-full max-w-screen-md">
      <PostComponent post={post} />
    </PageContainer>
  );
}

export default PostPage;
