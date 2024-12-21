import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Store {
  userName: string;
  userId: string;
  isLogined: boolean;
  loginUser: (userName: string, userId: string) => void
}

export const useUserStore = create<Store>()(
  persist((set) => ({
    userName: '',
    userId: '',
    isLogined: false,
    loginUser: (userName: string, userId: string) => set(() => ({userName, userId, isLogined: true}))
  }), {
    name: "user-storage",
    storage: createJSONStorage(() => sessionStorage),
  })
);
