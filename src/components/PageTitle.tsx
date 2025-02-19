"use client";
import { usePathname } from "next/navigation";
import React from "react";
import BudgetModal from "./DialogModals/Budget/BudgetModal";
import PotModal from "./DialogModals/Pot/PotModal";
import BillModal from "./DialogModals/Bill/BillModal";
import MobileNavMenu from "./MobileNavMenu";

function PageTitle() {
  const pathname = usePathname();

  const formattedTitle =
    pathname
      ?.replace("/", "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()) || "Overview";

  const pageTitle =
    formattedTitle === "Bills" ? "Recurring bills" : formattedTitle;

  const includeButton = ["Pots", "Budgets", "Recurring bills"].includes(
    pageTitle
  );

  const AddNewButton = () => {
    switch (formattedTitle) {
      case "Pots":
        return <PotModal />;
      case "Budgets":
        return <BudgetModal />;
      case "Bills":
        return <BillModal />;
      default:
        return null;
    }
  };

  return (
    <div className="sticky top-0 bg-background z-10 px-4 py-2">
      <div className="flex flex-row justify-between items-center my-3">
        <h1 className={`text-3xl font-bold flex flex-row gap-4 items-center`}>
          {pageTitle}
          <div className="flex md:hidden">
            <MobileNavMenu />
          </div>
        </h1>
        {includeButton && <AddNewButton />}
      </div>
    </div>
  );
}

export default PageTitle;
