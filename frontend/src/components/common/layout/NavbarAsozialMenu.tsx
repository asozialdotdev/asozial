import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import AsozialLogo from "../ui/image/AsozialLogo";
import ContributorsImages from "./ContributorsImages";

function NavbarAsozialMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-2xl hover:scale-110">
        asozial
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-row items-center gap-2 text-xs italic">
          anti-social media since 2024
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="text-lg">
          <Link
            href="/about"
            className="flex w-full flex-row items-center justify-between gap-2 px-2"
          >
            <AsozialLogo /> about
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="text-lg">
          <Link
            href="/contributors"
            className="flex w-full flex-row items-center justify-between gap-2 px-2"
          >
            <ContributorsImages />
            contributors
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavbarAsozialMenu;
