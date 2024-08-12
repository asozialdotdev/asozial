import { searchForMyProjects } from "@/actions";
import { Project } from "@/types/Project";
import { useEffect, useState } from "react";

function useSearchForMyProjects(searchTerm: string, projects: Project[]) {
  const [projectsState, setProjectsState] = useState<Project[]>(projects);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError("");
      try {
        const result = await searchForMyProjects(searchTerm);
        setProjectsState(result);
      } catch (error) {
        console.error("Error in searching for projects:", error);
        setError("Error in searching for projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [searchTerm]);

  return { projectsState, isLoading, error };
}

export default useSearchForMyProjects;
