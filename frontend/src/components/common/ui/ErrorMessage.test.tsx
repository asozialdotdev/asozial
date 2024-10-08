import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage Component", () => {
  it("renders correctly", () => {
    render(<ErrorMessage>Error!</ErrorMessage>);
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });

  it("renders with provided className", () => {
    render(<ErrorMessage className="custom-class">Error!</ErrorMessage>);
    const element = screen.getByText("Error!");
    expect(element).toHaveClass("custom-class");
  });
});
