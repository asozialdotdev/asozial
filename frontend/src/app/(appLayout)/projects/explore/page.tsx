//Components
import ProjectCard from "@/components/project/ProjectCard";

//Ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

//Constants
import { baseUrl } from "@/constants";
import PageContainer from "@/components/common/containers/PageContainer";
import { searchForProjects } from "@/actions";
import SearchProjects from "@/components/project/SearchProjects";
import { Suspense } from "react";
import CustomCard from "@/components/common/ui/CustomCard";
import SearchProjectsTable from "@/components/project/SearchProjectsTable";

type ExploreProjectsPageProps = {
  searchParams: {
    query?: string;
    page?: string;
  };
};

async function ExploreProjectsPage({ searchParams }: ExploreProjectsPageProps) {
  const query = searchParams.query || "";
  const currentPage = Number(searchParams.page) || 1;
  return (
    <PageContainer className="gap-10 2xl:max-w-screen-xl">
      <section className="flex w-full flex-col items-center gap-8">
        <h2 className="text-3xl">Explore Projects</h2>
        <SearchProjects />
      </section>

      <article className="grid grid-cols-1 gap-4 pb-6 lg:grid-cols-2 2xl:grid-cols-3 2xl:gap-8">
        <Suspense key={query + currentPage} fallback={<p>Loading...</p>}>
          <SearchProjectsTable query={query} currentPage={currentPage} />
        </Suspense>
      </article>
    </PageContainer>
  );
}

export default ExploreProjectsPage;
