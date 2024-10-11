import { render, screen } from "@testing-library/react";
import CustomCard from "./CustomCard";

describe("CustomCard Component", () => {
  it("renders href correctly", () => {
    render(
      <CustomCard
        href="https://www.google.com"
        title="titleTest"
        description="descriptionTest"
        content1={<div>content1Test</div>}
      />,
    );
    const linkElement = screen.getByRole("link", { name: /titletest/i });
    expect(linkElement).toHaveAttribute("href", "https://www.google.com");
  });

  it("renders title and description correctly", () => {
    render(
      <CustomCard
        title="titleTest"
        description="descriptionTest"
        content1={<div>content1Test</div>}
      />,
    );
    expect(screen.getByText("titleTest")).toBeInTheDocument();
    expect(screen.getByText("descriptionTest")).toBeInTheDocument();
  });

  it("renders content1 correctly", () => {
    render(
      <CustomCard
        title="titleTest"
        description="descriptionTest"
        content1={<div>content1Test</div>}
      />,
    );
    expect(screen.getByText("content1Test")).toBeInTheDocument();
  });

  it("renders content2 and titleContent2 correctly", () => {
    render(
      <CustomCard
        title="titleTest"
        description="descriptionTest"
        content1={<div>content1Test</div>}
        titleContent2="titleContent2Test"
        content2="content2Test"
      />,
    );
    expect(screen.getByText("titleContent2Test")).toBeInTheDocument();
    expect(screen.getByText("content2Test")).toBeInTheDocument();
  });

  it("renders content3 correctly", () => {
    render(
      <CustomCard
        title="titleTest"
        description="descriptionTest"
        content1={<div>content1Test</div>}
        content3={<div>content3Test</div>}
      />,
    );
    expect(screen.getByText("content3Test")).toBeInTheDocument();
  });

  it("renders content4 and titleContent4 correctly", () => {
    render(
      <CustomCard
        title="titleTest"
        description="descriptionTest"
        content1={<div>content1Test</div>}
        titleContent4="titleContent4Test"
        content4={<div>content4Test</div>}
      />,
    );
    expect(screen.getByText("titleContent4Test")).toBeInTheDocument();
    expect(screen.getByText("content4Test")).toBeInTheDocument();
  });

  it("renders footer correctly", () => {
    render(
      <CustomCard
        title="titleTest"
        description="descriptionTest"
        content1={<div>content1Test</div>}
        footer="footerTest"
      />,
    );
    expect(screen.getByText("footerTest")).toBeInTheDocument();
  });
});
