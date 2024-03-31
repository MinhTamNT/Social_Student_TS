import axios, { AxiosInstance } from "axios";

export const endpoints = {
  login: "o/token/",
  current_user: "user/current-user/",
  get_story: "story/",
};

export const AuthAPI = (accessToken: string): AxiosInstance => {
  return axios.create({
    baseURL: import.meta.env.VITE_LOCAL_HOST_URL,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
console.log(import.meta.env.VITE_LOCAL_HOST_URL);

export const API: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_HOST_URL,
});
