import { render, screen } from "@testing-library/react";
import DashboardHeader from "./DashboardHeader";
import { auth } from "@/auth";

// Mock the auth module
jest.mock("@/auth");

describe("DashboardHeader", () => {
  it("renders the DashboardHeader component with user information", async () => {
    // Explicitly type the auth mock
    const mockAuth = auth as unknown as jest.MockedFunction<
      () => Promise<AuthReturnType>
    >;

    // Define the type for the mock return value
    type AuthReturnType = {
      user: {
        githubUsername: string;
      };
    };

    // Mock the auth function to return a fake session
    mockAuth.mockResolvedValue({
      user: {
        githubUsername: "testuser",
      },
    });

    // Render the component
    render(<DashboardHeader />);

    // Wait for the async content to be rendered
    const welcomeMessage = await screen.findByText("Welcome,");
    const username = await screen.findByText("testuser");
    const overviewText = screen.getByText("A quick overview of your account.");

    // Assertions
    expect(welcomeMessage).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(overviewText).toBeInTheDocument();
  });
});
