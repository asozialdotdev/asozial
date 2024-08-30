import { getUserByUsername } from "@/actions/users.server/getUserByUsername.server";
import PageContainer from "@/components/common/containers/PageContainer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import UserComponent from "@/components/user/UserComponent";
import { auth } from "@/auth";
import { Suspense } from "react";
import UserComponentSkeleton from "@/components/user/UserComponentSkeleton";
import { getUserFriendStatuses } from "@/actions/friendships.server/getUserFriendStatuses.server";

async function DashboardPage() {
  const session = await auth();
  const username = session?.user?.githubUsername;

  const [result, friends] = await Promise.all([
    getUserByUsername(username),
    getUserFriendStatuses(),
  ]);

  const { accepted } = friends;
  return (
    <PageContainer>
      <DashboardHeader />
      <section className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-8 pb-8">
          <Suspense fallback={<UserComponentSkeleton />}>
            <UserComponent dashboard result={result} friends={accepted} />
          </Suspense>
        </div>
      </section>
    </PageContainer>
  );
}

export default DashboardPage;
