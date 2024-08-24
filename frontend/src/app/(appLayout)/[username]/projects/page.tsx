//Next
import { notFound } from "next/navigation";

//Actions
import { fetchAllProjectsFromAUser } from "@/actions";
import { searchForUserProjects } from "@/actions";
//Components
import PageContainer from "@/components/common/containers/PageContainer";
import { Suspense } from "react";
import SearchUserProjects from "@/components/project/SearchForUserProjects";
import PageTitle from "@/components/common/ui/PageTitle";
import UserProjectsTable from "@/components/project/UserProjectsTable";
import ProjectCardLoadingSkeleton from "@/components/project/ProjectCardsLoadingSkeleton";

type UserProjectsPageProps = {
  searchParams: {
    query?: string;
    page?: string;
  };
};
async function UserProjectsPage({ searchParams }: UserProjectsPageProps) {
  const query = searchParams.query || "";
  const currentPage = Number(searchParams.page) || 1;
  const projects = await fetchAllProjectsFromAUser();

  if (!projects) {
    notFound();
  }

  return (
    <PageContainer className="gap-10 2xl:max-w-screen-xl">
      <section className="flex w-full flex-col items-center gap-8">
        <PageTitle className="text-3xl">My Projects</PageTitle>
        <SearchUserProjects />
      </section>
      <Suspense
        key={query + currentPage}
        fallback={<ProjectCardLoadingSkeleton />}
      >
        <UserProjectsTable query={query} currentPage={currentPage} />
      </Suspense>
    </PageContainer>
  );
}

export default UserProjectsPage;