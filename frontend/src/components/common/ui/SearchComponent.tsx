"use client";
// React
import { useState } from "react";

//Components
import SearchBar from "./SearchBar";

//UI

//Types
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function SearchComponent() {
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
          handleClearSearch={handleClearSearch}
          searchTerm={searchTerm}
        />
      </form>
    </div>
  );
}

export default SearchComponent;
