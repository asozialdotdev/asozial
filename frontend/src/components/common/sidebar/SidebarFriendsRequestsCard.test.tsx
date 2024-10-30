import { render, screen } from "@testing-library/react";
import SidebarFriendsRequestsCard from "./SidebarFriendsRequestsCard";
import { Friendship } from "@/types/Friendship";

const mockFriendship: Friendship = {
	_id: "123",
	senderId: {
		_id: "senderId123",
		username: "friendUser",
		info: {
			image: "https://avatars.dicebear.com/api/avataaars/friendUser.svg",
		},
	},
	receiverId: { _id: "receiverId123", username: "currentUser" },
	status: "pending",
};

describe("SidebarFriendsRequestsCard", () => {
	test("renders correctly", () => {
		render(<SidebarFriendsRequestsCard friendship={mockFriendship} />);
		expect(
			screen.getByText("friendUser wants to be friends"),
		).toBeInTheDocument();
	});

	test("displays the sender's username", () => {
		render(<SidebarFriendsRequestsCard friendship={mockFriendship} />);
		expect(screen.getByText("friendUser")).toBeInTheDocument();
	});

	test("renders AcceptDeclineFriendshipForm component", () => {
		render(<SidebarFriendsRequestsCard friendship={mockFriendship} />);
		expect(screen.getByRole("form")).toBeInTheDocument();
	});

	test("renders UserAvatar with correct props", () => {
		render(<SidebarFriendsRequestsCard friendship={mockFriendship} />);
		const avatar = screen.getByAltText("friendUser's avatar");
		expect(avatar).toHaveAttribute(
			"src",
			mockFriendship.senderId?.info.image,
		);
	});
});
