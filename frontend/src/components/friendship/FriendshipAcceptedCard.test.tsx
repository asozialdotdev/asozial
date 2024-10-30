import { render, screen } from "@testing-library/react";
import FriendshipAcceptedCard from "./FriendshipAcceptedCard";
import { auth } from "@/auth";

jest.mock("@/auth", () => ({
	auth: jest.fn(),
}));

describe("FriendshipAcceptedCard", () => {
	it("renders correctly", () => {
		auth.mockResolvedValue({
			user: {
				githubUsername: "testuser",
			},
		});

		render(
			<FriendshipAcceptedCard
				sentAccepted={[
					{
						_id: "123",
						status: "accepted",
					},
				]}
				receivedAccepted={[
					{
						_id: "123",
						status: "accepted",
					},
				]}
				actualUserId="123"
			/>,
		);
		expect(screen.getByText("Test")).toBeInTheDocument();
	});
});
