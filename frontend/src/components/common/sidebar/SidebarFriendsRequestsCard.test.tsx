import { render, screen } from "@testing-library/react";
import SidebarFriendsRequestsCard from "./SidebarFriendsRequestsCard";
import { Friendship } from "@/types/Friendship";
import { ObjectId } from "mongodb";

{
	/* 
	This makes the test crash:
	<AcceptDeclineFriendshipForm
		friendshipId={friendship._id}
		sidebar
	/> 

	The problem is that it uses useFormState(), that seems to be too experimental for Jest
	So we're just mocking it :)
*/
}
jest.mock("@/components/requests/AcceptDeclineFriendshipForm", () => {
	return function MockedAcceptDeclineFriendshipForm() {
		return <div data-testid="mock-accept-decline-form">Mocked Form</div>;
	};
});

const mockFriendship: Friendship = {
	_id: new ObjectId("507f1f77bcf86cd799439012"),
	senderId: {
		_id: new ObjectId("507f1f77bcf86cd799439011"), // mocking a MongoDB _id. Has to be 24 characters.
		username: "friendUser",
		info: {
			image: "https://api.dicebear.com/9.x/pixel-art/svg?seed=John",
		},
	},
	receiverId: {
		_id: new ObjectId("507f1f77bcf86cd799439013"),
		username: "currentUser",
		info: {
			image: "https://api.dicebear.com/9.x/pixel-art/svg?seed=Jane",
		},
	},
	status: "pending",
};

describe("SidebarFriendsRequestsCard", () => {
	test("renders correctly", () => {
		render(<SidebarFriendsRequestsCard friendship={mockFriendship} />);

		expect(screen.getByRole("friends-request-card")).toBeInTheDocument;
	});
});
