//React
import { Suspense } from "react";

//Actions
import { searchForProjects } from "@/actions";
//Components
import PageContainer from "@/components/common/containers/PageContainer";
import SearchProjects from "@/components/project/SearchProjects";
import SearchProjectsTable from "@/components/project/SearchProjectsTable";
import PageTitle from "@/components/common/ui/PageTitle";
import ProjectCardLoadingSkeleton from "@/components/project/ProjectCardsLoadingSkeleton";
import Pagination from "@/components/project/Pagination";

type ExploreProjectsPageProps = {
  searchParams: {
    query?: string;
    page?: string;
  };
};

async function ExploreProjectsPage({ searchParams }: ExploreProjectsPageProps) {
  const query = searchParams.query || "";
  const currentPage = Number(searchParams.page) || 1;
  const limit = 12;
  const { projects, totalPages } = await searchForProjects(
    query,
    currentPage,
    limit,
  );
  return (
    <PageContainer className="gap-10 2xl:max-w-screen-xl">
      <section className="flex w-full flex-col items-center gap-8">
        <PageTitle className="text-3xl">Explore Projects</PageTitle>
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

export default ExploreProjectsPage;
