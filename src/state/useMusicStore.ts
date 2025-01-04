import { create } from "zustand";
import { ConverterAPI, ConvertType, ResponseType } from "../api/music_converter_api.ts";

export type Music = string;
export type MusicState = { music: Music, id: number }

interface Store {
  music: MusicState[];
  convertedMusic: Music;
  isLoading: boolean;
  convertMusic: (music: Music[], userId: number) => Promise<ResponseType<ConvertType>>;
  setMusic: (userId: number) => void;
  clearHistory: () => void;
  deleteMusic: (id: number) => void
}

export const useMusicStore = create<Store>()(
    (set) => ({
      music: [],
      convertedMusic: '',
      isLoading: false,
      convertMusic: async (music: Music[], userId: number) => {
        if (music.length > 0) {
          set(() => ({ isLoading: true }))
          const response = await ConverterAPI.convertMusic(music, userId);
          if (!response.error) {
            set((state) => ({ music: [...state.music, { music: response.music, id: 1 }], convertedMusic: response.music }));
          }
          set(() => ({ isLoading: false }))
          return response;
        }
        return { error: true, message: "No music to convert" } as ResponseType<ConvertType>
      },
      setMusic: async (userId: number) => {
        set(() => ({ isLoading: true }))
        const response = await ConverterAPI.getHistory(userId);
        set(() => ({ music: response.music, isLoading: false  }));
      },
      clearHistory: () => set(() => ({ music: [] })),
      deleteMusic: async(id: number) => {
        const response = await ConverterAPI.deleteFile(id)
        if (!response.error){
          set((state) => ({music: state.music.filter(mus => mus.id !== id)}))
        }
      }
    }
  )
);