//user can create a new project, ownerId is user's id

import PageContainer from "@/components/common/containers/PageContainer";
import NewProject from "@/components/project/NewProject";

function Page() {
  return (
    <PageContainer>
      <NewProject />
    </PageContainer>
  );
}

export default Page;
