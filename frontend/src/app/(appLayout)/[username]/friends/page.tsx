import { auth } from "@/auth";
import PageContainer from "@/components/common/containers/PageContainer";
import ButtonBack from "@/components/common/ui/buttons/ButtonBack";
import NotFoundComponent from "@/components/common/ui/NotFoundComponent";
import PageTitle from "@/components/common/ui/PageTitle";
import FriendStatusTab from "@/components/friendship/FriendStatusTab";
import React from "react";

async function page({ params }: { params: { username: string } }) {
  const session = await auth();
  const { username } = params;

  if (session?.user.githubUsername !== username) {
    return (
      <NotFoundComponent page="Friends" message="You should not be here" />
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
