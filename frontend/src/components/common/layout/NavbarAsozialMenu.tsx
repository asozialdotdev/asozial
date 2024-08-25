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
import { Button } from "@/components/ui/button";

function NavbarAsozialMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-2xl">
        <Button
          variant="ghost"
          className="flex flex-row flex-nowrap items-center gap-2 text-xl"
        >
          asozial
        </Button>
      </DropdownMenuTrigger>
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
