import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ConverterAPI } from "../api/music_converter_api.ts";

interface Store {
  userName: string;
  userId: number;
  isLogined: boolean;
  loginUser: (userName: string, password: string) => void;
  registerUser: (userName: string, password: string) => void;
  logoutUser: () => void;
}

export const useUserStore = create<Store>()(
  persist(
    (set) => ({
      userName: "",
      userId: 0,
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
      logoutUser: () =>
        set(() => ({ userName: "", userId: 0, isLogined: false })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
