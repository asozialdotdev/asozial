import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import AsozialLogo from "../ui/AsozialLogo";
import ContributorsImages from "./ContributorsImages";

function NavbarAsozialMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-2xl">asozial</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-row items-center gap-2 text-xs italic">
          anti-social media since 2024
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-lg">
          <Link href="/about" className="flex flex-row items-center gap-2">
            <AsozialLogo /> about
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-lg">
          <Link
            href="/contributors"
            className="flex flex-row items-center gap-2"
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
