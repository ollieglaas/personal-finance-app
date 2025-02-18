"use client";
import { usePathname } from "next/navigation";
import React from "react";
import BudgetModal from "./DialogModals/Budget/BudgetModal";
import PotModal from "./DialogModals/Pot/PotModal";
import BillModal from "./DialogModals/Bill/BillModal";

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
      <div className="flex flex-row justify-between my-3">
        <h1 className="text-4xl font-bold">{pageTitle}</h1>
        {includeButton && <AddNewButton />}
      </div>
    </div>
  );
}

export default PageTitle;
