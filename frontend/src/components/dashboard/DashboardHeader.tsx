import { auth } from "@/auth";
import PageTitle from "../common/ui/PageTitle";

async function DashboardHeader() {
  const session = await auth();
  return (
    <div className="mr-10 flex flex-col items-center justify-center gap-2">
      <PageTitle className="font-normal">
        Welcome,{" "}
        <span className="font-semibold">{session?.user.githubUsername}</span>
      </PageTitle>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        A quick overview of your account.
      </p>
    </div>
  );
}

export default DashboardHeader;
