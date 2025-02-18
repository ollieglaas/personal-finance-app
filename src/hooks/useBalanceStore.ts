import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BalanceStore {
  balance: Balance;
  setBalance: (balance: Balance) => void;
}

export interface Balance {
  current: number;
  income: number;
  expenses: number;
}

const useBalanceStore = create<BalanceStore>()(
  persist(
    (set) => ({
      balance: {
        current: 0,
        income: 0,
        expenses: 0,
      },
      setBalance: (balance: Balance) => set({ balance }),
    }),
    {
      name: "balance-storage",
    }
  )
);

export default useBalanceStore;
