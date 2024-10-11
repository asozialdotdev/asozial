import { render, screen } from "@testing-library/react";
import PageTitle from "./PageTitle";

it("has h1 tag", () => {
  render(<PageTitle>Test</PageTitle>);
  expect(screen.getByText("Test").tagName).toBe("H1");
});

it("renders children", () => {
  render(<PageTitle>Test</PageTitle>);
  expect(screen.getByText("Test")).toBeInTheDocument();
});

it("renders with className", () => {
  render(<PageTitle className="test">Test</PageTitle>);
  expect(screen.getByText("Test")).toHaveClass("test");
});
