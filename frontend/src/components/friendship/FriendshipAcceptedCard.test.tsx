import { render, screen } from "@testing-library/react";
import FriendshipAcceptedCard from "./FriendshipAcceptedCard";
import { auth } from "@/auth";

describe("FriendshipAcceptedCard", () => {
	it("renders correctly", () => {
		(auth as jest.Mock).mockResolvedValue({
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
						_id: "456",
						status: "accepted",
					},
				]}
				actualUserId="789"
			/>,
		);
		// expect(screen.getByText("Test")).toBeInTheDocument();
	});
});
