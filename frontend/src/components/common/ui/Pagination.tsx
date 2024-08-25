"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../../ui/button";
import { useWindowWidth } from "@/hooks/useWindowWidth";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
};

function Pagination({ totalPages,currentPage }: PaginationProps) {
  const { width } = useWindowWidth();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getMaxPages = (width: number | undefined) => {
    switch (true) {
      case width && width > 300 && width && width < 480:
        return 2;
      case width && width > 480 && width && width < 640:
        return 3;
      case width && width > 640 && width && width < 1024:
        return 4;
      case width && width > 1024 && width && width < 1280:
        return 6;
      case width && width > 1280 && width && width < 1400:
        return 8;
      case width && width > 1400:
        return 12;
      default:
        return 4;
    }
  };

  const maxPages = getMaxPages(width);


  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    if (totalPages <= maxPages) {
      return [...Array(totalPages).keys()].map((num) => num + 1);
    } else {
      const half = Math.floor(maxPages / 2);
      let start = Math.max(currentPage - half, 1);
      let end = start + maxPages - 1;

      if (end > totalPages) {
        end = totalPages;
        start = end - maxPages + 1;
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mb-4 flex items-center justify-center gap-4 px-4">
      {currentPage > 1 && (
        <Link href={createPageURL(currentPage - 1)}>
          <Button
            variant="link"
            className="rounded-md border px-3 py-1 hover:bg-zinc-600 hover:text-light dark:hover:bg-zinc-300 dark:hover:text-dark"
          >
            Previous
          </Button>
        </Link>
      )}
      {pageNumbers.map((page) => (
        <Link key={page} href={createPageURL(page)}>
          <Button
            size="icon"
            variant="ghost"
            className={`rounded-md border px-3 py-1 ${
              currentPage === page
                ? "bg-zinc-600 text-light dark:bg-zinc-300 dark:text-dark"
                : "hover:bg-zinc-600 hover:text-light dark:hover:bg-zinc-300 dark:hover:text-dark"
            }`}
          >
            {page}
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
