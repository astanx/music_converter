import { create } from "zustand";
import {
  ConverterAPI,
  ConvertType,
  ResponseType,
} from "../api/music_converter_api.ts";

export type Music = string;
export type MusicState = { music: Music; id: number };

interface Store {
  music: MusicState[];
  convertedMusic: Music;
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  changePage: (page: number) => void;
  convertMusic: (
    music: Music[],
    userId: number
  ) => Promise<ResponseType<ConvertType>>;
  setMusic: (userId: number, currentPage: number, pageSize: number) => void;
  clearHistory: () => void;
  deleteMusic: (userId: number, fileId: number, pageSize: number) => void;
}

export const useMusicStore = create<Store>()((set) => ({
  music: [],
  convertedMusic: "",
  isLoading: false,
  totalPages: 0,
  currentPage: 1,
  pageSize: 3,
  changePage: (page: number) => set(() => ({ currentPage: page })),
  convertMusic: async (music: Music[], userId: number) => {
    if (music.length > 0) {
      set(() => ({ isLoading: true }));
      const response = await ConverterAPI.convertMusic(music, userId);
      if (!response.error) {
        set(() => ({
          convertedMusic: response.music,
        }));
      }
      set(() => ({ isLoading: false }));
      return response;
    }
    return {
      error: true,
      message: "No music to convert",
    } as ResponseType<ConvertType>;
  },
  setMusic: async (userId: number, currentPage: number, pageSize: number) => {
    set(() => ({ isLoading: true }));

    const response = await ConverterAPI.getHistory(
      userId,
      currentPage,
      pageSize
    );
    if (currentPage > response.totalPages) {
      set(() => ({ currentPage: 1 }));
    }
    set(() => ({
      music: response.music,
      isLoading: false,
      totalPages: response.totalPages,
    }));
  },
  clearHistory: () => set(() => ({ music: [] })),
  deleteMusic: async (userId: number, fileId: number, pageSize: number) => {
    const response = await ConverterAPI.deleteFile(userId, fileId, pageSize);
    if (!response.error) {
      set((state) => ({
        music: state.music.filter((mus) => mus.id !== fileId),
        currentPage:
          state.currentPage > response.totalPages && state.currentPage > 0
            ? state.currentPage - 1
            : state.currentPage,
      }));
    }
  },
}));
