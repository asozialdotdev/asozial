import { render, screen, fireEvent } from "@testing-library/react";
import SearchComponent from "./SearchComponent"; // Adjust the import based on your file structure
import { useRouter, usePathname, useSearchParams } from "next/navigation"; // Adjust based on your actual imports

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("SearchComponent", () => {
  const mockReplace = jest.fn();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseSearchParams = useSearchParams as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ replace: mockReplace });
    mockUsePathname.mockReturnValue("/test-path");
    mockUseSearchParams.mockReturnValue(new URLSearchParams("query=test"));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the SearchComponent", () => {
    render(<SearchComponent />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("should handle search submission", () => {
    render(<SearchComponent />);
    const form = screen.getByRole("form");

    fireEvent.submit(form);
    expect(mockReplace).toHaveBeenCalledWith("/test-path?query=test&page=1");
  });
});
