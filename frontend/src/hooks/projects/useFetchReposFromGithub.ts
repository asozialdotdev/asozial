import { fetchGithubRepos } from "@/actions";
import { Project } from "@/types/Project";
import { useEffect, useState } from "react";

function useFetchReposFromGithub() {
  const [githubRepos, setGithubRepos] = useState([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  const [errorRepos, setErrorRepos] = useState("");
  console.log("githubERRORRepos", errorRepos);
  useEffect(() => {
    const getGithubRepos = async () => {
      setIsLoadingRepos(true);
      setErrorRepos("");
      try {
        const result = await fetchGithubRepos();
        if (result.error) {
          setErrorRepos(result.message);
        } else {
          setGithubRepos(result);
        }
      } catch (error) {
        console.error("Error in searching for projects");
      } finally {
        setIsLoadingRepos(false);
      }
    };
    getGithubRepos();
  }, []);

  return { githubRepos, isLoadingRepos, errorRepos, setErrorRepos };
}

export default useFetchReposFromGithub;
