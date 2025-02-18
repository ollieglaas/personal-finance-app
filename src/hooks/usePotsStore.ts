import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Pot {
  name: string;
  target: number;
  total: number;
  theme: string;
}

interface PotsStore {
  pots: Pot[];
  setPots: (pots: Pot[]) => void;
}

const usePotsStore = create<PotsStore>()(
  persist(
    (set) => ({
      pots: [], // Initial state
      setPots: (pots) => set({ pots }),
    }),
    {
      name: "pots-storage", // Unique name for localStorage key
    }
  )
);

export default usePotsStore;
