import { create } from "zustand";
import { ConverterAPI } from "../api/music_converter_api.ts";

export type Music = any;

interface Store {
  music: Music[];
  convertMusic: (music: Music[], userId: number) => Music;
  setMusic: (userId: number) => void;
}

export const useMusicStore = create<Store>()((set) => ({
  music: [],
  convertMusic: async (music: Music[], userId: number) => {
    if (music.length > 0) {
      const response = await ConverterAPI.convertMusic(music, userId);
      set((state) => ({ music: [...state.music, response.music] }));
      return response.music;
    }
  },
  setMusic: async (userId: number) => {
    const music = await ConverterAPI.getHistory(userId) 
    set(() => ({ music }));
  },
}));
