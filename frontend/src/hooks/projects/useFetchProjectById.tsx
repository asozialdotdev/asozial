import { fetchProjectById } from "@/actions";
import { Project, ProjectId } from "@/types/Project";
import { useEffect, useState } from "react";

function useFetchProjectById(projectId: ProjectId) {
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProjectById = async () => {
      setIsLoading(true);
      setError("");
      try {
        const result = await fetchProjectById(projectId);
        setProject(result);
      } catch (error) {
        console.error("Error in fetching project:", error);
        setError("Error in fetching project");
      } finally {
        setIsLoading(false);
      }
    };
    getProjectById();
  }, [projectId]);

  return { project, isLoading, error };
}

export default useFetchProjectById;
