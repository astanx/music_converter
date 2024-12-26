import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ConverterAPI } from "../api/music_converter_api.ts";

interface Store {
  userName: string;
  userId: string;
  isLogined: boolean;
  loginUser: (userName: string, password: string) => void;
  registerUser: (userName: string, password: string) => void;
  signOut: () => void;
}

export const useUserStore = create<Store>()(
  persist(
    (set) => ({
      userName: "",
      userId: "",
      isLogined: false,
      loginUser: async (userName: string, password: string) => {
        const response = await ConverterAPI.login(userName, password);

        const name = response.data.name;
        const userId = response.data.id;
        set(() => ({ userName: name, userId, isLogined: true }));
      },
      registerUser: async (userName: string, password: string) => {
        const response = await ConverterAPI.registerUser(userName, password);
        
        const name = response.data.name;
        const userId = response.data.id;
        set(() => ({ userName: name, userId, isLogined: true }));
      },
      signOut: () =>
        set(() => ({ userName: "", userId: "", isLogined: false })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
