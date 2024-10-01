import { render, screen } from "@testing-library/react";
import NotFoundComponent from "./NotFoundComponent";
import bearNotFound from "@/../public/bearNotFound.webp";
import ButtonBack from "./buttons/ButtonBack";
import { useRouter } from "next/router";
import mockRouter from "next-router-mock";

// Mock the Next.js router
jest.mock("next/router", () => require("next-router-mock"));

describe("NotFoundComponent", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
  });

  it("renders correctly", () => {
    render(<NotFoundComponent message="Page not found" />);
    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });

  it("renders with provided page title", () => {
    render(<NotFoundComponent page="404" message="Page not found" />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders the Image component with correct attributes", () => {
    render(<NotFoundComponent message="Page not found" />);
    const image = screen.getByAltText("Bear not found");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", bearNotFound);
    expect(image).toHaveAttribute("width", "300");
    expect(image).toHaveAttribute("height", "300");
  });

  it("renders the ButtonBack component", () => {
    render(<NotFoundComponent message="Page not found" />);
    expect(<ButtonBack />).toBeInTheDocument();
  });
});
