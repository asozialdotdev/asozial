import { render, screen, within } from "@testing-library/react";
import Pagination from "./Pagination";
import { usePathname, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("Pagination Component", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/test-path");
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it("renders correctly", () => {
    render(<Pagination totalPages={5} currentPage={1} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("renders the correct number of page buttons", () => {
    render(<Pagination totalPages={5} currentPage={1} />);
    const pageButtons = screen.getAllByRole("button");
    const expectedLength = 5; // 5 page buttons + 1 "Next" button
    expect(pageButtons).toHaveLength(expectedLength);
  });

  it("renders 'Previous' button when currentPage > 1", () => {
    render(<Pagination totalPages={5} currentPage={2} />);
    expect(screen.getByText("Previous")).toBeInTheDocument();
  });

  it("generates correct page URL", () => {
    render(<Pagination totalPages={5} currentPage={1} />);
    const page2Button = screen.getByRole("link", { name: "2" });
    expect(page2Button).toHaveAttribute("href", "/test-path?page=2");
  });

  it("renders 'Next' button when currentPage < totalPages", () => {
    render(<Pagination totalPages={5} currentPage={4} />);
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
});
