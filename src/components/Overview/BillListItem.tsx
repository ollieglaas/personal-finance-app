"use client";
import useBillsStore from "@/hooks/useBillsStore";
import React from "react";

function BillListItem() {
  const { bills } = useBillsStore((state) => state);
  const topBills = bills.slice(0, 3);

  return topBills.map((bill) => (
    <div
      key={bill.title}
      className={`w-full bg-background border-l-4 flex flex-row justify-between p-4 rounded-lg`}
      style={{ borderLeftColor: bill.theme }}
    >
      <span className="text-gray-400 text-lg">{bill.title}</span>
      <span className="font-bold">${bill.amount}</span>
    </div>
  ));
}

export default BillListItem;
