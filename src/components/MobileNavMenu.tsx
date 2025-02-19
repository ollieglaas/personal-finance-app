import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";

function MobileNavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu size={30} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href="/">
          <DropdownMenuItem className="py-4">Overview</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="/transactions">
          <DropdownMenuItem className="py-4">Transactions</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="/budgets">
          <DropdownMenuItem className="py-4">Budgets</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="/pots">
          <DropdownMenuItem className="py-4">Pots</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="/bills">
          <DropdownMenuItem className="py-4">Recurring bills</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MobileNavMenu;
