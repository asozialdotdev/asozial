import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import React from "react";
import { getUserFriendStatuses } from "@/actions/friendships.server/getUserFriendStatuses";

async function page() {
  const { accepted } = await getUserFriendStatuses();
  return (
    <PageContainer>
      <PageTitle>Friends</PageTitle>
      {JSON.stringify(accepted)}
    </PageContainer>
  );
}

export default page;
