import create from "zustand";

interface User {
  username: string;
  setUsername: (username: string) => void;
  totalAmount: string;
  setTotalAmount: (totalAmount: string) => void;
}

const useStore = create<User>((set) => ({
  username: "",
  setUsername: (username) =>
    set((state) => ({
      ...state,
      username,
    })),

  totalAmount: "",
  setTotalAmount: (totalAmount) =>
    set((state) => ({
      ...state,
      totalAmount,
    })),
}));

export default useStore;
