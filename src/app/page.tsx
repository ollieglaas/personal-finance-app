import PotsOverview from "@/components/Overview/PotsOverview";
import OverviewCards from "@/components/Overview/OverviewCards";
import TransactionsOverview from "@/components/Overview/TransactionsOverview";
import BudgetsOverview from "@/components/Overview/BudgetsOverview";
import BillsOverview from "@/components/Overview/BillsOverview";

export default function Home() {
  return (
    <>
      <OverviewCards />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="col-span-1">
          <div className="mb-4">
            <PotsOverview />
          </div>
          <div>
            <TransactionsOverview />
          </div>
        </div>
        <div className="col-span-1">
          <div className="mb-4">
            <BudgetsOverview />
          </div>
          <div>
            <BillsOverview />
          </div>
        </div>
      </div>
    </>
  );
}
