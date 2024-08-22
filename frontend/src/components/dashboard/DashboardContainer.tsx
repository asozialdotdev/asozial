import PageContainer from "../common/containers/PageContainer";
import PageTitle from "../common/ui/PageTitle";
import { auth } from "@/auth";
import dynamic from "next/dynamic";
import FileUploader from "../common/ui/FileUploader";

// const FileUploader = dynamic(() => import("../common/FileUploader"), {
//   ssr: false,
// });

async function DashboardContainer() {
  const session = await auth();

  return (
    <PageContainer>
      <section className="flex w-full flex-col gap-4">
        <PageTitle className="text-center">Dashboard</PageTitle>
        <div>
          <h2 className="text-lg">
            Welcome back,{" "}
            <span className="font-semibold">
              {session?.user?.githubUsername}
            </span>
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Here's a quick overview of your account.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded bg-white p-4 shadow dark:bg-black">
            <h2 className="text-lg font-bold">Projects</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">0</p>
          </div>
          <div className="rounded bg-white p-4 shadow dark:bg-black">
            <h2 className="text-lg font-bold">Posts</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">0</p>
          </div>
          <div className="rounded bg-white p-4 shadow dark:bg-black">
            <h2 className="text-lg font-bold">Users</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">0</p>
          </div>
        </div>


        <FileUploader />
      </section>
    </PageContainer>
  );
}

export default DashboardContainer;
