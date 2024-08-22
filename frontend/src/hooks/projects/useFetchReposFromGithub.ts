import { fetchGithubRepos } from "@/actions";
import { Project } from "@/types/Project";
import { useEffect, useState } from "react";

function useFetchReposFromGithub() {
  const [githubRepos, setGithubRepos] = useState([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  const [errorRepos, setErrorRepos] = useState("");

  useEffect(() => {
    const getGithubRepos = async () => {
      setIsLoadingRepos(true);
      setErrorRepos("");
      try {
        const result = await fetchGithubRepos();
        setGithubRepos(result);
      } catch (errorRepos) {
        console.error("Error in searching for projects");
        setErrorRepos("Error getting your projects. Please try again.");
      } finally {
        setIsLoadingRepos(false);
      }
    };
    getGithubRepos();
  }, []);

  return { githubRepos, isLoadingRepos, errorRepos, setErrorRepos };
}

export default useFetchReposFromGithub;
