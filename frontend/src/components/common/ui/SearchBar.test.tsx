import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  it("renders correctly with default props", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("Type your search here..."),
    ).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("renders with provided props", () => {
    render(<SearchBar placeholder="Search..." buttonText="Go" />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByText("Go")).toBeInTheDocument();
  });

  it("calls onChange handler when input value changes", () => {
    const handleChange = jest.fn();
    render(<SearchBar onChange={handleChange} />);
    const input = screen.getByPlaceholderText("Type your search here...");
    fireEvent.change(input, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders 'Clear Search' button when searchTerm is provided", () => {
    const handleClearSearch = jest.fn();
    render(
      <SearchBar searchTerm="test" handleClearSearch={handleClearSearch} />,
    );
    const clearButton = screen.getByText("Clear Search");
    expect(clearButton).toBeInTheDocument();
    fireEvent.click(clearButton);
    expect(handleClearSearch).toHaveBeenCalledTimes(1);
  });

  it("renders default button when searchTerm is not provided", () => {
    render(<SearchBar />);
    const searchButton = screen.getByText("Search");
    expect(searchButton).toBeInTheDocument();
  });
});
