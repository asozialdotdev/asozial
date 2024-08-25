import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

function NavbarAsozialMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-2xl">asozial</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>anti-social media</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/about">about</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/contributors">contact</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavbarAsozialMenu;
