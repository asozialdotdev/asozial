import PageContainer from "@/components/common/containers/PageContainer";
import ContributorsDetails from "@/components/common/layout/ContributorsDetails";
import PageTitle from "@/components/common/ui/PageTitle";
import React from "react";

function page() {
  return (
    <PageContainer>
      <PageTitle>Contributors</PageTitle>
      <ContributorsDetails />
    </PageContainer>
  );
}

export default page;
