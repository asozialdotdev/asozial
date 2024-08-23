//Components
import ProjectCard from "@/components/project/ProjectCard";

//Ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

//Constants
import { baseUrl } from "@/constants";
import PageContainer from "@/components/common/containers/PageContainer";
import { fetchAllProjects } from "@/actions";

async function ExploreProjectsPage() {
  // const projects = await fetchAllProjects()
  return (
    <PageContainer className="gap-10">
      <section className="flex flex-col items-center gap-8">
        <h2 className="text-3xl">Explore Projects</h2>
        <form className="flex items-end gap-2" action="">
          <Input className="w-[25rem]" placeholder="Type here..."></Input>
          <div>
            <Button variant="outline" className="">
              Search
            </Button>
          </div>
        </form>
      </section>
      <article className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* <ProjectCard projects={projects} /> */}
      </article>
    </PageContainer>
  );
}

export default ExploreProjectsPage;
