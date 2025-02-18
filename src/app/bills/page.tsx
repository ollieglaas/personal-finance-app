"use client";
import BillsTable from "@/components/Bills/BillsTable";
import Summary from "@/components/Bills/Summary";
import TotalBills from "@/components/Bills/TotalBills";
import { useSidebar } from "@/components/ui/sidebar";
import React from "react";

function BillsPage() {
  const { open } = useSidebar();
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      {/* 2 boxes wrapper start */}
      <div
        className={`col-span-1 grid grid-cols-1 ${
          open ? "md:grid-cols-1" : "md:grid-cols-2"
        } xl:grid-cols-1 gap-4 xl:max-h-0`}
      >
        <div className="col-span-1">
          <TotalBills />
        </div>
        <div className="col-span-1">
          <Summary />
        </div>
      </div>
      {/* 2 boxes wrapper end */}
      <div className="col-span-1 xl:col-span-2">
        <BillsTable />
      </div>
    </div>
  );
}

export default BillsPage;
