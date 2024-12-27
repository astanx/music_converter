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
  convertMusic: async (music: Music) => {
    console.log(music);
    
    const formData = new FormData();
    formData.append("file", music);
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    
    const response = await intenseFORM.post("/music_converter", formData);
    return response
  },
};
