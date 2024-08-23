"use client";
// React
import { useState } from "react";
//Hooks

//Components
import ProjectCard from "./ProjectCard";

//UI
import { Input } from "../ui/input";

//Types
import type { Project } from "@/types/Project";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import SearchBar from "../common/ui/SearchBar";
import { Button } from "../ui/button";

function SearchUserProjects() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

  // const { projectsState, isLoading, error } = useSearchForMyProjects(
  //   searchTerm,
  //   projects,
  // );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSearch}>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {searchTerm && (
        <Button type="button" onClick={handleClearSearch} variant={"outline"}>
          Clear Search
        </Button>
      )}
    </div>
  );
}

export default SearchUserProjects;
