import { create } from "zustand";
import { ConverterAPI } from "../api/music_converter_api.ts";

export type Music = any 

interface Store {
    music: Music[]
    convertMusic: (music: Music[], userId: number) => Music
}

export const useMusicStore = create<Store>()(
  
    (set) => ({
        music: [],
        convertMusic: async(music: Music[], userId: number) => {     
            if (music.length > 0){
                const newMusic = await ConverterAPI.convertMusic(music, userId)
                set((state) => ({music: [...state.music, newMusic]}))
                return newMusic
            }
        }
    })
);