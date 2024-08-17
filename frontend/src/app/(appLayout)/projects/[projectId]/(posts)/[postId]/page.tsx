//Action
import { fetchPostByIdAndReplies } from "@/actions";

//Components
import PageContainer from "@/components/common/PageContainer";
import PostComponent from "@/components/post/PostComponent";
import RepliesList from "@/components/post/RepliesList";
import ReplyForm from "@/components/post/ReplyForm";

//Types
import type { PostId } from "@/types/Post";
import { Reply } from "lucide-react";

async function PostPage({ params }: { params: { postId: PostId } }) {
  const { projectId, postId } = params;
  console.log("params:>>>>>>>>>", params);
  // const data = await fetchPostByIdAndReplies(postId);
  // const post = data.post;
  // const replies = data.replies;
  // console.log("post:///////////////***&&&&&&&*****", post);
  // console.log("replies:////////////////", replies);

  return (
    <PageContainer className="w-full max-w-screen-md">
      <PostComponent projectPostId={postId} />

      {/* Reply Form */}
      <ReplyForm projectPostId={postId} startOpen />
      {/* Replies */}
      <RepliesList projectPostId={postId} />
    </PageContainer>
  );
}

export default PostPage;
