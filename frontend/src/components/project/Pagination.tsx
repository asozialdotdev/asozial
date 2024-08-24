"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

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
    <div className="flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link href={createPageURL(currentPage - 1)}>
          <span className="px-3 py-1 border rounded-md">Previous</span>
        </Link>
      )}
      {[...Array(totalPages).keys()].map((_, index) => (
        <Link key={index} href={createPageURL(index + 1)}>
          <span
            className={`px-3 py-1 border rounded-md ${
              currentPage === index + 1 ? "bg-gray-300" : ""
            }`}
          >
            {index + 1}
          </span>
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={createPageURL(currentPage + 1)}>
          <span className="px-3 py-1 border rounded-md">Next</span>
        </Link>
      )}
    </div>
  );
}

export default Pagination;
