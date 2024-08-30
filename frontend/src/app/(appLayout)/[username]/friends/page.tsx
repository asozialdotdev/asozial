import { auth } from "@/auth";
import PageContainer from "@/components/common/containers/PageContainer";
import ButtonBack from "@/components/common/ui/buttons/ButtonBack";
import PageTitle from "@/components/common/ui/PageTitle";
import FriendStatusTab from "@/components/friendship/FriendStatusTab";
import React from "react";

async function page({ params }: { params: { username: string } }) {
  const session = await auth();
  const { username } = params;

  if (session?.user.githubUsername === username) {
    return (
      <PageContainer>
        <PageTitle>Friends</PageTitle>
        <p className="text-center text-xl">
          You are not authorized to view this page.
        </p>
        <div className="flex items-center gap-2">
          <ButtonBack />
          Go Back
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>Friends</PageTitle>
      <FriendStatusTab />
    </PageContainer>
  );
}

export default page;
