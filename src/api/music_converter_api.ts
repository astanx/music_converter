import axios from "axios";
import { Music } from "../state/useMusicStore";

const intense = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const ConverterAPI = {
  registerUser: async (name: string, password: string) => {
    const response = await intense.post("/users", { name, password });
    return response;
  },
  login: async (name: string, password: string) => {
    const response = await intense.post("/login", { name, password });
    return response;
  },
  convertMusic: async (music: Music) => {
    const formData = new FormData();
    formData.append("file", music);
    debugger
    console.log(formData);
    
    const response = await intense.post("/music_converter", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response
  },
};
