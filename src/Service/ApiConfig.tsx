import axios, { AxiosInstance } from "axios";

export const endpoints = {
  login: "o/token/",
};

const DEFAULT_LOCAL_HOST = "http://127.0.0.1:8000/";

export const createAuthAPI = (accessToken: string): AxiosInstance => {
  return axios.create({
    baseURL: process.env.LOCAL_HOST_URL,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
console.log(process.env.LOCAL_HOST_URL);

export const API: AxiosInstance = axios.create({
  baseURL: process.env.LOCAL_HOST_URL,
});
