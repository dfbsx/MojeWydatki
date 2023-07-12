import create from "zustand";

interface User {
  username: string;
  setUsername: (username: string) => void;
  totalAmount: number;
  setTotalAmount: (totalAmount: number) => void;
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
}));

export default useStore;
