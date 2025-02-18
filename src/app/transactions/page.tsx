import TransactionsTable from "@/components/Transactions/TransactionsTable";
import React, { Suspense } from "react";

function TransactionsPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <TransactionsTable />
      </Suspense>
    </div>
  );
}

export default TransactionsPage;
