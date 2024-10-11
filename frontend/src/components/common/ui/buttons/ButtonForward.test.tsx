import { render, screen, fireEvent } from "@testing-library/react";
import ButtonForward from "./ButtonForward";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ButtonForward Component", () => {
  const mockRouter = useRouter as jest.Mock;

  beforeEach(() => {
    mockRouter.mockReturnValue({ back: jest.fn() });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<ButtonForward />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
