import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ConverterAPI } from "../api/music_converter_api.ts";

export type Music = any 

interface Store {
    music: Music[]
    convertMusic: (music: Music) => Music
}

export const useMusicStore = create<Store>()(
  persist(
    (set) => ({
        music: [],
        convertMusic: async(music: Music) => {     
            if (music){
                const response = await ConverterAPI.convertMusic(music)
                music = response.data
                console.log(music);
                
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