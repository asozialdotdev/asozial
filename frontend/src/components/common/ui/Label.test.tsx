import { render, screen } from "@testing-library/react";
import Label from "./Label";

describe("Label Component", () => {
  it("renders correctly", () => {
    render(<Label htmlFor="test">Test</Label>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
