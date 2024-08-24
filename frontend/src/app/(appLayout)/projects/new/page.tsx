//user can create a new project, ownerId is user's id

import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import NewProject from "@/components/project/NewProject";

function Page() {
  return (
    <PageContainer>
      <PageTitle className="text-center mb-6">Start a new project</PageTitle>
      <NewProject />
    </PageContainer>
  );
}

export default Page;
