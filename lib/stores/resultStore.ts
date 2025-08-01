import { create } from "zustand";

export interface Result {
  id: string;
  number: string;
  color: "RED" | "BLACK" | "GREEN";
  createdAt: Date;
}

interface ResultState {
  result: Result[];
  isSubscribed: boolean;
  setResult: (result: Result[]) => void;
}

export const useResultStore = create<ResultState>()((set) => ({
  result: [],
  isSubscribed: true,
  setResult: (result) => set({ result }),
}));

export const useResult = () => useResultStore((state) => state.result);
