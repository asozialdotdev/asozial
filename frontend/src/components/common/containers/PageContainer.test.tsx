import { render, screen } from "@testing-library/react";
import PageContainer from "./PageContainer";

describe("PageContainer Component", () => {
  it("renders correctly with children", () => {
    render(<PageContainer>Test</PageContainer>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("renders with provided className", () => {
    render(<PageContainer className="custom-class">Test</PageContainer>);
    const element = screen.getByText("Test");
    expect(element).toHaveClass("custom-class");
  });
});
