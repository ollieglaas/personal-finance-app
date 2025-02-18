"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar";
import // HomeIcon,
// ArrowUpDown,
// ChartColumn,
// PiggyBank,
// ReceiptText,
"lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LargeLogo from "../../../public/logo-large.svg";
import SmallLogo from "../../../public/logo-small.svg";
import OverviewIcon from "../../../public/assets/images/icon-nav-overview.svg";
import TransactionIcon from "../../../public/assets/images/icon-nav-transactions.svg";
import BudgetsIcon from "../../../public/assets/images/icon-nav-budgets.svg";
import PotsIcon from "../../../public/assets/images/icon-nav-pots.svg";
import BillsIcon from "../../../public/assets/images/icon-recurring-bills.svg";

const sidebarLinks = [
  { name: "Overview", href: "/", icon: OverviewIcon },
  { name: "Transactions", href: "/transactions", icon: TransactionIcon },
  { name: "Budgets", href: "/budgets", icon: BudgetsIcon },
  { name: "Pots", href: "/pots", icon: PotsIcon },
  { name: "Recurring Bills", href: "/bills", icon: BillsIcon },
];

function AppSidebar() {
  const { toggleSidebar, open } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="rounded-r-2xl">
      <SidebarHeader
        className={`flex transition-all duration-300 ${open ? "p-8" : "p-4"}`}
      >
        {/* Display appropriate logo depending on sidebar state */}
        <Image src={open ? LargeLogo : SmallLogo} alt="logo" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <SidebarMenuItem key={link.name} className="h-14 -ml-2 w-80">
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="pl-8"
                      variant={"default"}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center space-x-3 p-2 h-full rounded-l-none rounded-r-lg transition-transform ${
                          isActive
                            ? "bg-gray-200 border-l-[6px] border-[#277C78]"
                            : "hover:translate-x-1 "
                        }`}
                      >
                        <Image src={link.icon} alt="" height={22} />
                        <span className="font-bold tracking-wide text-[16px]">
                          {link.name}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter
        className="flex flex-row justify-end items-right hover:cursor-pointer"
        onClick={toggleSidebar}
      >
        <SidebarTrigger />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
