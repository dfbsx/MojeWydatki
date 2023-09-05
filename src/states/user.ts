import create from "zustand";

interface User {
  username: string;
  totalAmount: number;
  setUsername: (username: string) => void;
  setTotalAmount: (totalAmount: number) => void;
  increase: (by: number) => void;
  subtract: (by: number) => void;
}

const useStore = create<User>((set) => ({
  username: "",
  totalAmount: 0,
  setUsername: (username) =>
    set((state) => ({
      username,
    })),
  setTotalAmount: (totalAmount) =>
    set((state) => ({
      totalAmount,
    })),
  increase: (by) =>
    set((state) => ({ totalAmount: state.totalAmount + Number(by) })),
  subtract: (by) =>
    set((state) => ({ totalAmount: state.totalAmount - by })),
}));

export default useStore;
