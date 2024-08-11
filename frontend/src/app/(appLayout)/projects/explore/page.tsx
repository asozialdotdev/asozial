//Components
import ProjectCard from "@/components/project/ProjectCard";

//Ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

//Constants
import { baseUrl } from "@/constants";

async function ExploreProjectsPage() {
  const data = await fetch(`${baseUrl}/projects/my-projects`);
  const projects = await data.json();
  console.log(projects[0]._id);
  return (
    <div className="mx-auto my-0 flex flex-col items-center gap-10">
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
        <ProjectCard projects={projects} />
      </article>
    </div>
  );
}

export default ExploreProjectsPage;
