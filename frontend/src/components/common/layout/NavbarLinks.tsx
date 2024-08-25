import NavBarLinkItem from "./NavBarLinkItem";

const navbarLinks = [
  { name: "Dashboard", href: "/dashboard" },
  {
    name: "Account",
    href: "/account",
    sublinks: [
      { name: "Settings", href: "/account/settings" },
      { name: "Profile", href: "/account/profile" },
    ],
  },
  {
    name: "Search",
    href: "/search",
    sublinks: [
      { name: "Users", href: "/search/users" },
      { name: "Projects", href: "/search/projects" },
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
