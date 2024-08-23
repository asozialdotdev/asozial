// all users in db, searchbar and filter options

import getAllUsers from "@/actions/getAllUsers.server";
import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import type { User } from "@/types/User";

async function Page() {
  const allUsers = await getAllUsers();
  return (
    <PageContainer>
      <PageTitle>User Search</PageTitle>
      <ul>
        {allUsers &&
          allUsers.map((user: User) => (
            <li key={user._id.toString()}>
              <a href={`/users/${user.username}`}>{user.name}</a>
            </li>
          ))}
      </ul>
    </PageContainer>
  );
}

export default Page;
