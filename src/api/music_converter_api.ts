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

export const ConverterAPI = {
  registerUser: async (name: string, password: string) => {
    const response = await intenseJSON.post("/users", { name, password });
    return response;
  },
  login: async (name: string, password: string) => {
    const response = await intenseJSON.post("/login", { name, password });
    return response;
  },
  convertMusic: async (music: Music[], userId: number) => {
    const formData = new FormData();
    music.forEach((file) => {
      formData.append(`files`, file);
    });

    const response = await intenseFORM.post(
      `/music_converter/${userId}`,
      formData
    );
    return response.data;
  },
  getHistory: async (userId: number) => {
    const response = await intenseJSON.get(`/history/${userId}`);
    return response.data;
  }
};
