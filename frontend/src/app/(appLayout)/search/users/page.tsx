// all users in db, searchbar and filter options

import { getAllUsers } from "@/actions/users.server/getAllUsers.server";
import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import { auth } from "@/auth";
import SearchComponent from "@/components/common/ui/SearchComponent";
import UsersTable from "@/components/user/UsersTable";
import UserCardLoadingSkeleton from "@/components/user/UserCardLoadingSkeleton";
import { Suspense } from "react";

type UsersPageProps = {
  searchParams: {
    query?: string;
    page?: string;
  };
};

async function UsersPage({ searchParams }: UsersPageProps) {
  const session = await auth();
  const actualUserId = session?.user?.id;
  const query = searchParams.query || "";
  const currentPage = Number(searchParams.page) || 1;
  const limit = 10;
  const { users, totalPages } = await getAllUsers(query, currentPage, limit);
  console.log("users:::::::{{{{{}}}}}}}}))))))<<>>>>>>>>>>", users);

  return (
    <PageContainer>
      <PageTitle>User Search</PageTitle>
      <SearchComponent />
      <Suspense fallback={<UserCardLoadingSkeleton />}>
        <UsersTable
          allUsers={users}
          actualUserId={actualUserId}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </Suspense>
    </PageContainer>
  );
}

export default UsersPage;
