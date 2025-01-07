import axios from "axios";
import { Music } from "../state/useMusicStore";

const intense = axios.create({
  baseURL: "https://musicconverterserver-production.up.railway.app/",
});


export type ResponseType<D> = {
  error: boolean;
  message: string;
} & D;

export type LoginType = {
  name: string;
  id: number;
};
export type ConvertType = {
  url: string;
};
export type HistoryType = {
  url: { url: Music; id: number }[];
  totalCount: number;
  totalPages: number;
};
export const ConverterAPI = {
  registerUser: async (name: string, password: string) => {
    const response = await intense.post<ResponseType<LoginType>>("users", {
      name,
      password,
    });
    return response;
  },
  login: async (name: string, password: string) => {
    const response = await intense.post<ResponseType<LoginType>>("users/login", {
      name,
      password,
    });
    return response;
  },
  convertMusic: async (music: Music[], userId: number) => {
    const formData = new FormData();
    music.forEach((file) => {
      formData.append(`files`, file);
    });

    const response = await intense.post<ResponseType<ConvertType>>(
      `music/music_converter/${userId}`,
      formData
    );
    return response.data;
  },
  getHistory: async (userId: number, currentPage: number, pageSize: number) => {
    const response = await intense.get<ResponseType<HistoryType>>(
      `music/history/${userId}?page=${currentPage}&pageSize=${pageSize}`
    );
    return response.data;
  },
  deleteFile: async (userId: number, fileId: number, pageSize: number = 3) => {
    const response = await intense.delete<ResponseType<HistoryType>>(
      `music/history/${userId}/${fileId}?pageSize=${pageSize}`
    );
    return response.data;
  },
};
