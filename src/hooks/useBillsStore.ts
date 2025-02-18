import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Bill {
  title: string;
  frequency: number;
  amount: number;
  theme: string;
  dueDate: string;
  paid: boolean;
}

interface BillsStore {
  bills: Bill[];
  setBills: (bills: Bill[]) => void;
}

const useBillsStore = create<BillsStore>()(
  persist(
    (set) => ({
      bills: [],
      setBills: (bills) => set({ bills }),
    }),
    {
      name: "bills-storage", // Unique name for localStorage key
    }
  )
);

export default useBillsStore;
