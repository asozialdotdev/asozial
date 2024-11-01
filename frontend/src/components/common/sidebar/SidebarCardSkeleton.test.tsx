import React from "react";
import { render, screen } from "@testing-library/react";
import SidebarCardSkeleton from "./SidebarCardSkeleton";

describe("SidebarCardSkeleton", () => {
	it("renders base skeleton without user or project", () => {
		render(<SidebarCardSkeleton />);

		expect(screen.getAllByRole("skeleton").length).toBe(2);
	});

	it("renders user-specific skeleton when user prop is true", () => {
		render(<SidebarCardSkeleton user />);

		expect(screen.getAllByRole("skeleton-user").length).toBe(2);
	});

	it("renders project-specific skeleton when project prop is true", () => {
		render(<SidebarCardSkeleton project />);

		expect(screen.getAllByRole("skeleton-avatar")).toBeInTheDocument;
		expect(screen.getAllByRole("skeleton-project").length).toBe(2);
	});

	it("renders both user and project skeletons when both props are true", () => {
		render(<SidebarCardSkeleton user project />);

		expect(screen.getAllByRole("skeleton-avatar")).toBeInTheDocument;
		expect(screen.getAllByRole("skeleton-project")).toBeInTheDocument;
	});
});
