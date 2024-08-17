
//Components
import PageContainer from "@/components/common/PageContainer";
import ParentPost from "@/components/post/ParentPost";
import ParentPostLoading from "@/components/post/ParentPostLoading";
import RepliesList from "@/components/post/RepliesList";
import ReplyForm from "@/components/post/ReplyForm";

//Types
import type { ProjectPostId } from "@/types/Post";
import { Suspense } from "react";

async function PostPage({
  params,
}: {
  params: { projectPostId: ProjectPostId };
}) {
  const { projectPostId } = params;

  return (
    <PageContainer className="w-full max-w-screen-md">
      {/* PostShow */}
      <Suspense fallback={<ParentPostLoading />}>
        <ParentPost projectPostId={projectPostId} />
      </Suspense>

      {/* Reply Form */}
      <ReplyForm projectPostId={projectPostId} startOpen />
      {/* Replies */}
      <RepliesList projectPostId={projectPostId} />
    </PageContainer>
  );
}

export default PostPage;
