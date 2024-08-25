import NavBarLinkItem from "./NavBarLinkItem";

const navbarLinks = [
  { name: "Dashboard", href: "/dashboard" },
  {
    name: "Search",
    href: "/search",
    sublinks: [
      { name: "Users", href: "/search/users" },
      { name: "Projects", href: "/search/projects" },
    ],
  },
  {
    name: "Account",
    href: "/account",
    sublinks: [
      { name: "Settings", href: "/account/settings" },
      { name: "Profile", href: "/account/profile" },
    ],
  },
  {
    name: "Explore",
    href: "/explore",
    sublinks: [
      { name: "Projects", href: "/explore/projects" },
      { name: "Users", href: "/explore/users" },
    ],
  },
];

function NavbarLinks() {
  return (
    <section className="flex items-center gap-2">
      {navbarLinks.map((link) => (
        <NavBarLinkItem key={link.name} {...link} />
      ))}
    </section>
  );
}

export default NavbarLinks;
