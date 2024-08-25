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
import Pagination from "@/components/common/ui/Pagination";
import { SearchX } from "lucide-react";

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
      <div className="w-full flex-grow">
        <Suspense
          key={query + currentPage}
          fallback={<ProjectCardLoadingSkeleton />}
        >
          {projects.length > 0 ? (
            <SearchProjectsTable projects={projects} />
          ) : (
            <div className="flex w-full justify-center">
              <p className="flex items-center gap-2 text-lg font-light text-zinc-500 dark:text-zinc-400 lg:text-xl 2xl:text-2xl">
                <span className="">
                  <SearchX />
                </span>{" "}
                No projects found for your search
              </p>
            </div>
          )}
        </Suspense>
      </div>
      <div className="mt-auto w-full">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </PageContainer>
  );
}

export default ExploreProjectsPage;
