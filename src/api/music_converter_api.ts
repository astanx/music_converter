import axios from "axios";
import { Music } from "../state/useMusicStore";

const intenseJSON = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});
const intenseFORM = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export type ResponseType<D> = {
  error: boolean;
  message: string;
} & D

export type LoginType = {
  name: string;
  id: number;
}
export type ConvertType = {
  music: string;
}
export type HistoryType = {
  music: {music: Music, id: number}[]
}
export const ConverterAPI = {
  registerUser: async (name: string, password: string) => {
    const response = await intenseJSON.post<ResponseType<LoginType>>("/users", { name, password });
    return response;
  },
  login: async (name: string, password: string) => {
    const response = await intenseJSON.post<ResponseType<LoginType>>("/login", { name, password });
    return response;
  },
  convertMusic: async (music: Music[], userId: number) => {
    const formData = new FormData();
    music.forEach((file) => {
      formData.append(`files`, file);
    });

    const response = await intenseFORM.post<ResponseType<ConvertType>>(
      `/music_converter/${userId}`,
      formData
    );
    return response.data;
  },
  getHistory: async (userId: number) => {
    const response = await intenseJSON.get<ResponseType<HistoryType>>(`/history/${userId}`);
    return response.data;
  },
  deleteFile: async (fileId: number) => {
    const response = await intenseJSON.delete<ResponseType<HistoryType>>(`/history/${fileId}`);
    return response.data;
  }
};
