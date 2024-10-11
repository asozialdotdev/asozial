import { render, screen, fireEvent } from "@testing-library/react";
import ImageUploader, { ImageT } from "./ImageUploader";
import { uploadFile } from "../../../actions";

jest.mock("../../../actions");

describe("ImageUploader Component", () => {
  const mockUploadFile = uploadFile as jest.MockedFunction<typeof uploadFile>;

  beforeEach(() => {
    mockUploadFile.mockReset();
  });

  it("renders the upload button", () => {
    render(<ImageUploader />);
    expect(screen.getByText("Upload an image")).toBeInTheDocument();
  });

  it("calls uploadFile when a file is selected", async () => {
    render(<ImageUploader />);
    const mockFile = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const mockResult: ImageT = {
      url: "http://example.com/image.png",
      placeholder: "placeholder",
      message: "Image uploaded successfully",
    };

    mockUploadFile.mockResolvedValue(mockResult);

    const uploadButton = screen.getByText("Upload an image");
    const fileInput = screen.getByLabelText("image") as HTMLInputElement;

    fireEvent.click(uploadButton);
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    await screen.findByText("Image uploaded successfully");
    expect(mockUploadFile).toHaveBeenCalledTimes(1);
    expect(mockUploadFile).toHaveBeenCalledWith(expect.any(FormData));
  });

  it("displays loading state while uploading", async () => {
    render(<ImageUploader />);
    const mockFile = new File(["dummy content"], "example.png", {
      type: "image/png",
    });

    mockUploadFile.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () => resolve({ url: "", placeholder: "", message: "" }),
            1000,
          ),
        ),
    );

    const uploadButton = screen.getByText("Upload an image");
    const fileInput = screen.getByLabelText("image") as HTMLInputElement;

    fireEvent.click(uploadButton);
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    expect(screen.getByText("Please wait")).toBeInTheDocument();
  });

  it("displays success message after successful upload", async () => {
    render(<ImageUploader />);
    const mockFile = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const mockResult: ImageT = {
      url: "http://example.com/image.png",
      placeholder: "placeholder",
      message: "Image uploaded successfully",
    };

    mockUploadFile.mockResolvedValue(mockResult);

    const uploadButton = screen.getByText("Upload an image");
    const fileInput = screen.getByLabelText("image") as HTMLInputElement;

    fireEvent.click(uploadButton);
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    const successMessage = await screen.findByText(
      "Image uploaded successfully",
    );
    expect(successMessage).toBeInTheDocument();
  });

  it("displays error message if upload fails", async () => {
    render(<ImageUploader />);
    const mockFile = new File(["dummy content"], "example.png", {
      type: "image/png",
    });

    mockUploadFile.mockRejectedValue(new Error("Upload failed"));

    const uploadButton = screen.getByText("Upload an image");
    const fileInput = screen.getByLabelText("image") as HTMLInputElement;

    fireEvent.click(uploadButton);
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    const errorMessage = await screen.findByText("Upload failed");
    expect(errorMessage).toBeInTheDocument();
  });
});
