import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Budget {
  category: string;
  maximum: number;
  paid: number;
  theme: string;
}

interface BudgetsStore {
  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;
}

const useBudgetsStore = create<BudgetsStore>()(
  persist(
    (set) => ({
      budgets: [], // Initial state
      setBudgets: (budgets) => set({ budgets }),
    }),
    {
      name: "budgets-storage", // Unique name for localStorage key
    }
  )
);

export default useBudgetsStore;
