"use client";
import useFetchReposFromGithub from "@/hooks/projects/useFetchReposFromGithub";
import PageTitle from "../common/ui/PageTitle";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../common/ui/LoadingSpinner";
import { Button } from "../ui/button";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { createProjectFromGithub } from "@/actions";
import Link from "next/link";
import { Project } from "@/types/Project";
import LoadingTextButton from "../common/ui/LoadingTextButton";

type GithubRepo = {
  id: number;
  name: string;
  description: string;
  url: string;
};

function ExistingProjectForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRepos, setFilteredRepos] = useState<GithubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);
  const [hasSelected, setHasSelected] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingCreating, setIsLoadingCreating] = useState(false);

  const [project, setProject] = useState<Project | null>(null);

  const { githubRepos, isLoadingRepos, errorRepos, setErrorRepos } =
    useFetchReposFromGithub();
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(() => {
    setFilteredRepos([]);
  }, dropdownRef);

  useEffect(() => {
    if (selectedRepo) {
      setFilteredRepos([]);
      setIsLoadingSearch(false);
      return;
    }

    if (searchTerm.length < 3) {
      setFilteredRepos([]);
      setIsLoadingSearch(false);
      return;
    }

    setIsLoadingSearch(true);
    const debounce = setTimeout(() => {
      const results = githubRepos.filter((repo: GithubRepo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      setFilteredRepos(results);
      setIsLoadingSearch(false);
    }, 800);

    return () => clearTimeout(debounce);
  }, [searchTerm, githubRepos, selectedRepo]);

  const handleSelectRepo = (repo: GithubRepo) => {
    setSearchTerm(repo.name);
    setSelectedRepo(repo);
    setFilteredRepos([]);
    setHasSelected(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedRepo(null);
    setHasSelected(false);
  };

  const handleCreateProject = async () => {
    setIsLoadingCreating(true);
    const result = await createProjectFromGithub(selectedRepo?.url as string);
    if (result?.error) {
      console.error("Error creating project from Github");
      setErrorRepos(result.message);
    } else {
      setProject(result);
    }
    setIsLoadingCreating(false);
  };

  if (isLoadingRepos) {
    return (
      <div className="mt-10 flex flex-col items-center gap-4">
        <LoadingSpinner
          size={40}
          className="text-2xl text-zinc-800 dark:text-zinc-300"
        />
        <div>
          <p className="text-lg">Searching for your Github Repos </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 flex w-full flex-col items-center gap-4 py-4">
      <Input
        type="text"
        placeholder="Start typing the name of your Github repo"
        value={searchTerm}
        onChange={handleInputChange}
        className="h-14 w-[75%] border-zinc-300 bg-white hover:bg-zinc-50 focus:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800"
      />

      <div ref={dropdownRef} className="relative w-[70%]">
        {filteredRepos.length > 0 && (
          <ul className="dark:shadow-netral-700/30 absolute z-10 mt-2 h-auto max-h-60 w-full overflow-y-auto rounded-md border border-dashed border-zinc-300 bg-white p-2 shadow-lg dark:border-zinc-600 dark:bg-zinc-800">
            {filteredRepos.map((repo: GithubRepo) => (
              <li
                key={repo.id}
                className="cursor-pointer rounded-md px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => handleSelectRepo(repo)}
              >
                <p className="text-lg font-semibold">{repo.name}</p>
                <p className="text-base font-light text-neutral-500 dark:text-neutral-400">
                  {repo.description}
                </p>
              </li>
            ))}
          </ul>
        )}
        {filteredRepos.length === 0 &&
          searchTerm.length > 3 &&
          !hasSelected &&
          !isLoadingSearch && (
            <div className="absolute z-10 mt-2 h-auto max-h-60 w-full overflow-y-auto rounded-md border border-dashed border-zinc-300 bg-white p-2 shadow-lg dark:border-zinc-600 dark:bg-zinc-800 dark:shadow-neutral-700/30">
              No Github repos match your search
            </div>
          )}

        {isLoadingSearch && (
          <div className="mt-10 flex flex-col items-center">
            <LoadingSpinner
              size={40}
              className="text-2xl text-zinc-800 dark:text-zinc-300"
            />
          </div>
        )}
      </div>

      <div>
        {errorRepos && (
          <span className="text-base font-light text-red-700 dark:text-red-700">
            {errorRepos}
          </span>
        )}

        {selectedRepo && (
          <div className="flex flex-col items-center gap-8">
            <PageTitle className="font-semibold">Selected Project</PageTitle>
            <div className="w-full overflow-y-auto rounded-md border border-dashed border-zinc-300 p-6 dark:border-zinc-600">
              <h3 className="text-lg font-semibold">{selectedRepo?.name}</h3>
              <p className="text-base font-light text-neutral-500 dark:text-neutral-400">
                {selectedRepo?.description}
              </p>
            </div>
            {!project ? (
              <div>
                <Button onClick={handleCreateProject} className="p-8 text-xl">
                  {isLoadingCreating ? (
                    <LoadingTextButton text="Creating Project" />
                  ) : (
                    <span>Create Project</span>
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <span className="text-lg font-semibold text-green-700 dark:text-green-700">
                  Project created successfully
                </span>
                <Link href={`/projects/${project?._id}`}>
                  <Button className="p-8 text-xl">Go to project</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExistingProjectForm;
