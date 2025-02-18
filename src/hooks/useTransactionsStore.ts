import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Transaction {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

interface TransactionsStore {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
}

const useTransactionsStore = create<TransactionsStore>()(
  persist(
    (set) => ({
      transactions: [],
      setTransactions: (transactions) => set({ transactions }),
    }),
    {
      name: "transactions-storage",
    }
  )
);

export default useTransactionsStore;
