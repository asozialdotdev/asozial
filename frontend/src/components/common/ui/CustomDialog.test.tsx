import { render, screen, fireEvent } from "@testing-library/react";
import CustomDialog from "./CustomDialog";

const mockHandler = jest.fn();

describe("CustomDialog Component", () => {
  it("should display the title", () => {
    render(
      <CustomDialog
        trigger={<button>Open Dialog</button>}
        title="titleTest"
        description="descriptionTest"
        handler={mockHandler}
      />,
    );
    fireEvent.click(screen.getByText("Open Dialog"));
    expect(screen.getByText("titleTest")).toBeInTheDocument();
  });

  it("should display the description", () => {
    render(
      <CustomDialog
        trigger={<button>Open Dialog</button>}
        title="titleTest"
        description="descriptionTest"
        handler={mockHandler}
      />,
    );
    fireEvent.click(screen.getByText("Open Dialog"));
    expect(screen.getByText("descriptionTest")).toBeInTheDocument();
  });

  it("should call the handler when confirm button is clicked", () => {
    render(
      <CustomDialog
        trigger={<button>Open Dialog</button>}
        title="titleTest"
        description="descriptionTest"
        handler={mockHandler}
      />,
    );
    fireEvent.click(screen.getByText("Open Dialog"));
    fireEvent.click(screen.getByText("Confirm"));
    expect(mockHandler).toHaveBeenCalled();
  });

  it("should render the cancel button", () => {
    render(
      <CustomDialog
        trigger={<button>Open Dialog</button>}
        title="titleTest"
        description="descriptionTest"
        handler={mockHandler}
      />,
    );
    fireEvent.click(screen.getByText("Open Dialog"));
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });
});
