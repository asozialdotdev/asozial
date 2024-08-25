"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
};

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-4 pb-4 -mt-8">
      {currentPage > 1 && (
        <Link href={createPageURL(currentPage - 1)}>
          <Button
            variant="link"
            className="rounded-md border px-5 py-1 hover:bg-zinc-600 hover:text-light dark:hover:bg-zinc-300 dark:hover:text-dark"
          >
            Next
          </Button>
        </Link>
      )}
      {[...Array(totalPages).keys()].map((_, index) => (
        <Link key={index} href={createPageURL(index + 1)}>
          <Button
            size="icon"
            variant="ghost"
            className={`rounded-md border px-3 py-1 ${
              currentPage === index + 1
                ? "bg-zinc-600 text-light dark:bg-zinc-300 dark:text-dark"
                : "hover:bg-zinc-600 hover:text-light dark:hover:bg-zinc-300 dark:hover:text-dark"
            }`}
          >
            {index + 1}
          </Button>
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={createPageURL(currentPage + 1)}>
          <Button
            variant="link"
            className="rounded-md border px-5 py-1 hover:bg-zinc-600 hover:text-light dark:hover:bg-zinc-300 dark:hover:text-dark"
          >
            Next
          </Button>
        </Link>
      )}
    </div>
  );
}

export default Pagination;
