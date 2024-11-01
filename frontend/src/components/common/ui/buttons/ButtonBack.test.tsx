import { render, screen, fireEvent } from "@testing-library/react";
import ButtonBack from "./ButtonBack";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ButtonBack Component", () => {
  const mockRouter = useRouter as jest.Mock;

  beforeEach(() => {
    mockRouter.mockReturnValue({ back: jest.fn() });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<ButtonBack />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call router back function on click", () => {
    render(<ButtonBack />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(mockRouter().back).toHaveBeenCalled();
  });
});
