import { auth } from "@/auth";

async function DashboardHeader() {
  const session = await auth();
  return (
    <div>
      <h2 className="text-lg">
        Welcome back,{" "}
        <span className="font-semibold">{session?.user.githubUsername}</span>
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        A quick overview of your account.
      </p>
    </div>
  );
}

export default DashboardHeader;
