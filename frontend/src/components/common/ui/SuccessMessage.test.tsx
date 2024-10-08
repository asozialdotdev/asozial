import { render, screen } from "@testing-library/react";
import SuccessMessage from "./SuccessMessage";
import { SquareCheck } from "lucide-react"; // Adjust the import based on your file structure

describe("SuccessMessage Component", () => {
  it("renders correctly", () => {
    render(<SuccessMessage>Success!</SuccessMessage>);
    expect(screen.getByText("Success!")).toBeInTheDocument();
  });

  it("renders with provided className", () => {
    render(<SuccessMessage className="custom-class">Success!</SuccessMessage>);
    const element = screen.getByText("Success!");
    expect(element).toHaveClass("custom-class");
  });
});
