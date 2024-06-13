import axios, { AxiosInstance } from "axios";

export const endpoints = {
  "register-user": "/account/former/register/",
  login: "o/token/",
  current_user: "user/current-user/",
  get_story: "story/",
  upload_story: "story/create_story/",
  create_post: "/post/create_post/",
  all_post: "/post/",
  deletePost: (postId: number) => `/post/${postId}/`,
  reactPost: (Postid: number) => `/post/${Postid}/reaction/`,
  deleteReaction: (reactionId: number) => `/post/${reactionId}/reaction`,
  "comment-post": (postId: number) => `/post/${postId}/comment/`,
  "get-comment-post": (postId: number) => `/post/${postId}/comment/`,
  "deleted-comment": (commentId: number) => `/post/comment/${commentId}/`,
  "reply-comment": (commentId: number) => `/post/comment/${commentId}/reply/`,
};

export const AuthAPI = (accessToken: string): AxiosInstance => {
  return axios.create({
    baseURL: import.meta.env.VITE_LOCAL_HOST_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const API: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_HOST_URL,
});
