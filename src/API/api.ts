import axios, { AxiosRequestConfig } from "axios";
import { LoginDataType } from "../redux/auth/auth-types";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL/* "http://localhost:4444" */,
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
  getPosts() {
    return instance.get("posts")
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
};


//localStorage.getItem("blog-token")

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers) {
      config.headers.Authorization = String(localStorage.getItem("blog-token"))
    }
  
    return config
  }
)