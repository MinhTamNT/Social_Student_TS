import axios, { AxiosInstance } from "axios";

export const endpoints = {
  login: "/o/token",
};

export const createAuthAPI = (accessToken: string): AxiosInstance => {
  return axios.create({
    baseURL: process.env.LOCAL_HOST ?? "",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const API: AxiosInstance = axios.create({
  baseURL: process.env.LOCAL_HOST ?? "",
});
