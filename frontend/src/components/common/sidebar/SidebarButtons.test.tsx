import { render, screen } from "@testing-library/react";
import SidebarButtons from "./SidebarButtons";
import ProjectCreateIcon from "../../common/ui/icons/ProjectCreateIcon";
import SearchIcon from "../../common/ui/icons/SearchIcon";
import MatchIcon from "../../common/ui/icons/MatchIcon";

describe("SidebarButtons", () => {
	const mockLinks = [
		{
			name: "search",
			href: `/search/projects`,
			Icon: SearchIcon,
			action: "",
		},
		{
			name: "create",
			href: `/testuser/projects/new`,
			Icon: ProjectCreateIcon,
			action: "",
		},
		{
			name: "match",
			href: `/match/projects`,
			Icon: MatchIcon,
			action: "",
		},
	];

	it("renders the correct number of buttons", () => {
		render(<SidebarButtons links={mockLinks} />);
		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(mockLinks.length);
	});

	it("links have correct href attributes", () => {
		render(<SidebarButtons links={mockLinks} />);

		const linkElements = screen.getAllByRole("sidebar-button");

		linkElements.forEach((link, i) => {
			expect(link).toHaveAttribute("href", mockLinks[i].href);
		});
	});
});
