import { create } from "zustand";
import { persist } from "zustand/middleware";

type DeskState = {
  ids: string[];
  toggle: (id: string) => void;
};

export const useDesk = create<DeskState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const ids = get().ids;
        set({ ids: ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id] });
      },
    }),
    { name: "doxa-desk", skipHydration: true },
  ),
);
