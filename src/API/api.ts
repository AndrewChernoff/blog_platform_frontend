import { SortType } from './../redux/posts/posts-types';
import axios, { AxiosRequestConfig } from "axios";
import { LoginDataType } from "../redux/auth/auth-types";

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4444'

const instance = axios.create({
  //baseURL: /* process.env.REACT_APP_API_URL */"http://localhost:4444",
  baseURL: baseUrl
});

export const api = {
  register(data: LoginDataType) {
    return instance.post("auth/register", data)
  },
  login(data: LoginDataType) {
    return instance.post("auth/login", data)
  },
  logOut() {
    return instance.post("auth/logout")
  },
  authMe() {
    return instance.get("auth/me")
  },
  getPosts(sort: SortType) {
    return instance.get(`posts?sort=${sort}`)
  },
  getPostItem: (id: string) => {
    return instance
      .get(`posts/${id}`)
      .then((res) => res.data);
  },
  createPost: (data: {title: string, text: string, tags: any, imageUrl?: string}) => {
    return instance
      .post("posts", data)
  },
  updatePost: (id: string, data: {title: string, text: string, tags: any, imageUrl?: string}) => {
    return instance
      .patch(`/posts/${id}`, data)
  },
  deletePost: (id: string) => {
    return instance
      .delete(`/posts/${id}`)
  },
  getTags() {
    return instance.get("/tags").then((res) => res.data);
  },
  uploadImg(file: FormData) {
    return instance.post("/upload", file);
  },
  getComments(id: string) {
    return instance.get(`/comments/${id}`)
  },
  createComment(id: string, text: string) {
    return instance.post(`/comments/${id}`, {text})
  },
  deleteComment(id: string, postId: string) {
    return instance.delete(`/comments/${id}`, { data: { postId } });
  },
};

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers) {
      config.headers.Authorization = String(localStorage.getItem("blog-token"))
    }
  
    return config
  }
)