import create from "zustand";

interface User {
  username: string;
  setUsername: (username: string) => void;
  totalAmount: number;
  setTotalAmount: (totalAmount: number) => void;
  increase: (by: number) => void;
  subtract: (by: number) => void;
}

const useStore = create<User>((set) => ({
  username: "",
  setUsername: (username) =>
    set((state) => ({
      ...state,
      username,
    })),

  totalAmount: 0,
  setTotalAmount: (totalAmount) =>
    set((state) => ({
      ...state,
      totalAmount,
    })),

  increase: (by) => set((state) => ({ ...state, totalAmount: state.totalAmount + Number(by) })),
  subtract: (by) => set((state) => ({ ...state, totalAmount: state.totalAmount - by })),
}));

export default useStore;
