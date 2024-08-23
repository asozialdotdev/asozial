import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import Link from "next/link";
import { Users, FolderGit } from "lucide-react";

async function Page() {
  return (
    <PageContainer>
      <PageTitle>Search</PageTitle>
      <div className="flex h-full w-full flex-row items-center justify-evenly">
        <Link
          href="/search/users"
          className="flex flex-col items-center gap-4 opacity-50 transition-all duration-300 hover:scale-110 hover:opacity-100"
        >
          <Users size={128} />
          <h1 className="text-3xl">Users</h1>
        </Link>
        <Link
          href="/search/projects"
          className="flex flex-col items-center gap-4 opacity-50 transition-all duration-300 hover:scale-110 hover:opacity-100"
        >
          <FolderGit size={128} />
          <h1 className="text-3xl">Projects</h1>
        </Link>
      </div>
    </PageContainer>
  );
}

export default Page;
