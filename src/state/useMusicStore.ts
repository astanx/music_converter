import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Music = any 

interface Store {
    music: Music[]
    convertMusic: (music: Music) => Music
}

export const useMusicStore = create<Store>()(
  persist(
    (set) => ({
        music: [],
        convertMusic: (music: Music) => {     
            if (music){
                // логика конвертации
                music = 'Заглушка'
                set((state) => ({music: [...state.music, music]}))
                return music
            }
        }
    }),
    {
      name: "music-storage",
      storage: createJSONStorage(() => sessionStorage), 
    }
  )
);