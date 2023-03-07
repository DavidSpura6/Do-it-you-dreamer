import { createStore, persist } from "store";

type ProgressionStore = {
  level: number;
  currentExp: number;
  addExp(exp: number): void;
};

export const progressionStore = createStore<ProgressionStore>(
  persist(
    (set, get) => ({
      level: 0,
      currentExp: 0,
      addExp(exp) {
        const currentExp = get().currentExp + exp;
        const level = Math.floor(currentExp / 110);
        set({ currentExp, level });
      },
    }),
    {
      name: "progression-store",
    }
  )
);
