import create from "zustand";

interface User {
  username: string;
  totalAmount: number;
}

interface UserActions {
  setUsername: (username: string) => void;
  setTotalAmount: (totalAmount: number) => void;
  increase: (by: number) => void;
  subtract: (by: number) => void;
}

const useStore = create<User & { actions: UserActions }>((set) => ({
  username: "",
  totalAmount: 0,
  actions: {
    setUsername: (username) =>
      set((state) => ({
        username,
        totalAmount: state.totalAmount,
      })),
    setTotalAmount: (totalAmount) =>
      set((state) => ({
        username: state.username,
        totalAmount,
      })),
    increase: (by) =>
      set((state) => ({
        username: state.username,
        totalAmount: state.totalAmount + Number(by),
      })),
    subtract: (by) =>
      set((state) => ({
        username: state.username,
        totalAmount: state.totalAmount - by,
      })),
  },
}));

export default useStore;
export const useStoreActions = () => useStore((state) => state.actions);
