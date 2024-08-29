import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import FriendStatusTab from "@/components/friendship/FriendStatusTab";
import React from "react";

function page() {
  return (
    <PageContainer>
      <PageTitle>Friends</PageTitle>
      <FriendStatusTab />
    </PageContainer>
  );
}

export default page;
