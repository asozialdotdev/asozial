//user can create a new project, ownerId is user's id

import PageContainer from "@/components/common/PageContainer";
import NewProject from "@/components/project/NewProject";

function Page() {
  return (
    <PageContainer className="">
      <NewProject />
    </PageContainer>
  );
}

export default Page;
