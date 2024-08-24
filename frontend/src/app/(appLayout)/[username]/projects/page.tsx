//React
import { Suspense } from "react";

//Actions
import { searchForProjects, searchForUserProjects } from "@/actions";
//Components
import PageContainer from "@/components/common/containers/PageContainer";
import SearchProjects from "@/components/project/SearchProjects";
import SearchProjectsTable from "@/components/project/SearchProjectsTable";
import PageTitle from "@/components/common/ui/PageTitle";
import ProjectCardLoadingSkeleton from "@/components/project/ProjectCardsLoadingSkeleton";
import Pagination from "@/components/project/Pagination";

type UserProjectsPageProps = {
  searchParams: {
    query?: string;
    page?: string;
  };
};
async function UserProjectsPage({ searchParams }: UserProjectsPageProps) {
  const query = searchParams.query || "";
  const currentPage = Number(searchParams.page) || 1;
  const limit = 12;

  const { projects, totalPages } = await searchForUserProjects(
    query,
    currentPage,
    limit,
  );

  return (
    <PageContainer className="gap-10 2xl:max-w-screen-xl">
      <section className="flex w-full flex-col items-center gap-8">
        <PageTitle className="text-3xl">My Projects</PageTitle>
        <SearchProjects />
      </section>
      <Suspense
        key={query + currentPage}
        fallback={<ProjectCardLoadingSkeleton />}
      >
        <SearchProjectsTable projects={projects} />
      </Suspense>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </PageContainer>
  );
}

export default UserProjectsPage;
