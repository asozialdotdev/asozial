import { render, screen, fireEvent } from "@testing-library/react";
import CustomDialog from "./CustomDialog";

const mockHandler = jest.fn();

describe("CustomDialog Component", () => {
	it("should display the dialog box's title", () => {
		render(
			<CustomDialog
				trigger={<button>Open Dialog</button>}
				title="This is the dialog's title"
				description="What a great description"
				handler={mockHandler}
				asChild
			/>,
		);
		fireEvent.click(screen.getByText("Open Dialog"));
		expect(
			screen.getByText("This is the dialog's title"),
		).toBeInTheDocument();
	});

	it("should display a description", () => {
		render(
			<CustomDialog
				trigger={<button>Delete</button>}
				title="This is the dialog's title"
				description="What a great description"
				handler={mockHandler}
				asChild
			/>,
		);
		fireEvent.click(screen.getByText("Delete"));
		expect(screen.getByText("What a great description")).toBeInTheDocument();
	});

	it("should call the handler when confirm button is clicked", () => {
		render(
			<CustomDialog
				trigger={<button>Open Dialog</button>}
				title="This is the dialog's title"
				description="What a great description"
				handler={mockHandler}
				asChild
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
				title="This is the dialog's title"
				description="What a great description"
				handler={mockHandler}
				asChild
			/>,
		);
		fireEvent.click(screen.getByText("Open Dialog"));
		expect(screen.getByText("Cancel")).toBeInTheDocument();
	});
});
