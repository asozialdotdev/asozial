import { render, screen } from "@testing-library/react";
import CustomSwitch from "./CustomSwitch";

describe("CustomSwitch Component", () => {
  it("renders correctly", () => {
    render(
      <CustomSwitch id="test" checked={true} onCheckedChange={() => {}} />,
    );
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders with provided className", () => {
    render(
      <CustomSwitch
        id="test"
        checked={true}
        onCheckedChange={() => {}}
        className="custom-class"
      />,
    );
    const element = screen.getByRole("switch");
    expect(element).toHaveClass("custom-class");
  });
});
