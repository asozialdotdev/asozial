import { render, screen } from "@testing-library/react";
import DashboardHeader from "./DashboardHeader";
import { auth } from "@/auth";

describe("DashboardHeader", () => {
	it("renders welcome message with GitHub username", async () => {
		(auth as jest.Mock).mockResolvedValue({
			user: {
				githubUsername: "testuser",
			},
		});

		render(await DashboardHeader());

		expect(await screen.findByText(/Welcome,/i)).toBeInTheDocument();
		expect(await screen.findByText(/testuser/i)).toBeInTheDocument();
		expect(
			screen.getByText(/A quick overview of your account/i),
		).toBeInTheDocument();
	});
});
