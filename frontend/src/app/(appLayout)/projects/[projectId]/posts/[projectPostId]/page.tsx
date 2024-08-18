//Components
import PageContainer from "@/components/common/PageContainer";
import ParentPost from "@/components/projectPost/ParentPost";
import ParentPostLoading from "@/components/projectPost/ParentPostLoading";
import RepliesList from "@/components/projectPost/RepliesList";
import ReplyForm from "@/components/projectPost/ReplyForm";

//Types
import type { ProjectPostId } from "@/types/ProjectPost";
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
      <ParentPost projectPostId={projectPostId} />
      {/* Reply Form */}
      <ReplyForm projectPostId={projectPostId} startOpen />
      {/* Replies */}
      <RepliesList projectPostId={projectPostId} />
    </PageContainer>
  );
}

export default PostPage;
