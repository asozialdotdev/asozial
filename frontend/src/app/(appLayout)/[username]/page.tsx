import { getUserFriendStatuses } from "@/actions/friendships.server/getUserFriendStatuses.server";
import { getUserByUsername } from "@/actions/users.server/getUserByUsername.server";
import PageContainer from "@/components/common/containers/PageContainer";
import UserComponent from "@/components/user/UserComponent";
import UserComponentSkeleton from "@/components/user/UserComponentSkeleton";
import { Suspense } from "react";

async function Page({ params }: { params: { username: string } }) {
  const { username } = params;

  const [result, friends] = await Promise.all([
    getUserByUsername(username),
    getUserFriendStatuses(username),
  ]);

  const { accepted } = friends;

  return (
    <PageContainer>
      <Suspense fallback={<UserComponentSkeleton />}>
        <UserComponent result={result} friends={accepted} />
      </Suspense>
    </PageContainer>
  );
}

export default Page;
