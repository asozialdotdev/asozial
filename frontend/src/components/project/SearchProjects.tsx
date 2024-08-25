"use client";
// React
import { useState } from "react";

//Components
import SearchBar from "../common/ui/SearchBar";

//UI
import { Button } from "../ui/button";

//Types
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function SearchProjects() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");
    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
      params.delete("page");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <form onSubmit={handleSearch}>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <div className='flex justify-center'>
        {searchTerm && (
          <Button
            type="button"
            onClick={handleClearSearch}
            variant={"outline"}
            className=" lg:left-0 lg:right-0 w-[300%]  lg:text-lg text-base"
          >
            Clear Search
          </Button>
        )}
      </div>
    </div>
  );
}

export default SearchProjects;
