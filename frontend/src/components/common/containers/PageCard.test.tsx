import { render, screen } from "@testing-library/react";
import PageCard from "./PageCard";

describe("PageCard Component", () => {
  it("renders correctly with children", () => {
    render(<PageCard>Test</PageCard>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("renders with provided className", () => {
    render(<PageCard className="custom-class">Test</PageCard>);
    const element = screen.getByText("Test");
    expect(element).toHaveClass("custom-class");
  });
});
