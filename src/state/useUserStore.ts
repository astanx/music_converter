import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Store {
  userName: string;
  userId: string;
  isLogined: boolean;
  loginUser: (userName: string, password: string) => void
  registerUser: (userName: string, password: string) => void
  signOut: () => void
}

export const useUserStore = create<Store>()(
  persist((set) => ({
    userName: '',
    userId: '',
    isLogined: false,
    loginUser: (userName: string, password: string) => {
      //запрос на бек


      const userId = 'asddsaads'
      set(() => ({userName, userId, isLogined: true}))
    },
    registerUser: (userName: string, password: string) => {
      // запрос на бек
      
      set(() => ({userName, isLogined: true}))
    },
    signOut: () => set(() => ({userName: '', userId: '', isLogined: false})),
   
  }), {
    name: "user-storage",
    storage: createJSONStorage(() => sessionStorage),
  })
);
