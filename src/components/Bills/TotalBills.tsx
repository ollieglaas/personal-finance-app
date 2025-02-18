import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import BillsIcon from "@/assets/images/icon-recurring-bills.svg";
import Image from "next/image";
import useBillsStore from "@/hooks/useBillsStore";

function TotalBills() {
  const totalBills = useBillsStore((state) =>
    state.bills.reduce((sum, bill) => sum + bill.amount, 0)
  );

  return (
    <Card className="bg-black text-white pt-6 h-full xl:h-auto">
      <CardContent className="grid grid-cols-10 md:grid-cols-1 h-full">
        <div className="col-span-2 h-full flex items-center lg:col-span-1 md:pb-6">
          <Image src={BillsIcon} alt="" />
        </div>
        <div className="col-span-8 flex flex-col gap-2 lg:col-span-1">
          <h3 className="tracking-wide font-semibold">Total bills</h3>
          <h1 className="text-4xl font-bold">${totalBills.toFixed(2)}</h1>
        </div>
      </CardContent>
    </Card>
  );
}

export default TotalBills;
