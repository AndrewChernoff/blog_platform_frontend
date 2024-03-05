import axios, { AxiosRequestConfig } from "axios";
import { LoginDataType } from "../redux/auth/auth-types";

const instance = axios.create({
  baseURL: "http://localhost:4444",
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
  getTags() {
    return instance.get("/tags").then((res) => res.data);
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