//user can create a new project, ownerId is user's id

import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import NewProject from "@/components/project/NewProject";
import NewProjectLoadingSkeleton from "@/components/project/NewProjectLoadingSkeleton";
import { Suspense } from "react";

function Page() {
  return (
    <PageContainer>
      <PageTitle className="mb-6 text-center">Start a new project</PageTitle>
      <Suspense fallback={<NewProjectLoadingSkeleton />}>
        <NewProject />
      </Suspense>
    </PageContainer>
  );
}

export default Page;
