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
      pots: [],
      setPots: (pots) => set({ pots }),
    }),
    {
      name: "pots-storage",
    }
  )
);

export default usePotsStore;
