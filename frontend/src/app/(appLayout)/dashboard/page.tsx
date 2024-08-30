import { getUserFriendStatuses } from "@/actions";
import { getUserByUsername } from "@/actions/users.server/getUserByUsername.server";
import PageContainer from "@/components/common/containers/PageContainer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import UserComponent from "@/components/user/UserComponent";
import { auth } from "@/auth";

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
          <UserComponent dashboard result={result} friends={accepted} />
        </div>
      </section>
    </PageContainer>
  );
}

export default DashboardPage;
