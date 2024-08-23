// all users in db, searchbar and filter options

import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import type { Project } from "@/types/Project";
import { baseUrl } from "@/constants";

//api/friends POST  => add friend

async function Page() {
  return (
    <PageContainer>
      <PageTitle>Project Search</PageTitle>
    </PageContainer>
  );
}

export default Page;
