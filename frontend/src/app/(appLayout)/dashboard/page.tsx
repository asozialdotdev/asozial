import { checkMembersApplied } from "@/actions";
import { auth } from "@/auth";
import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import RequestsTable from "@/components/dashboard/RequestsTable";

async function Page() {
  const session = await auth();
  const username = session?.user?.githubUsername;
  const projects = await checkMembersApplied();
  console.log('Projects>>>>>>>>>>>:', projects, Array.isArray(projects));
  return (
    <PageContainer>
      <section className="flex w-full flex-col gap-4">
        <PageTitle className="text-center">Dashboard</PageTitle>
        <div>
          <h2 className="text-lg">
            Welcome back, <span className="font-semibold">{username}</span>
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Here's a quick overview of your account.
          </p>
        </div>
        <RequestsTable projects={projects} />
      </section>
    </PageContainer>
  );
}

export default Page;
