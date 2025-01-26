import { LoginDto } from "@/dto/login.dto";
import axios, { AxiosInstance } from "axios";
import { getToken, logout } from "./auth";
import { CreatePostBody, UpdatePostBody } from "@/dto/post.dto";
import { CreateCommentBody, UpdateCommentBody } from "@/dto/comment.dto";
import { User } from "@/dto/user.dto";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';
type NumberOrString = number | string;
console.log('baseURL',baseURL)
class ClientApi {
  public instant: AxiosInstance;
  constructor() {
    this.instant = this.setupAxiosInstant();
  }

  login = async (payload: LoginDto) => this.instant.post(`/auth`, payload);
  getProfile = async () => this.instant.get<User>(`/users/profile`);

  getAllPosts = async (params?: any) => this.instant.get(`/posts`,{params});
  getOnePost = async (id: NumberOrString) => this.instant.get(`/posts/${id}`);
  createPost = async (payload: CreatePostBody) => this.instant.post(`/posts`, payload);
  updatePost = async (id: NumberOrString, payload: UpdatePostBody) => this.instant.patch(`/posts/${id}`, payload);
  deletePost = async (id: NumberOrString) => this.instant.delete(`/posts/${id}`);

  createComment = async (payload: CreateCommentBody) => this.instant.post(`/posts/comments`, payload);
  updateComment = async (id: NumberOrString, payload: UpdateCommentBody) => this.instant.patch(`/posts/comments/${id}`, payload);
  deleteComment = async (id: NumberOrString) => this.instant.delete(`/posts/comments/${id}`);

  private setupAxiosInstant() {
    const instant = axios.create({
      baseURL
    });
    instant.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // Handle request errors
        return Promise.reject(error);
      }
    );

    instant.interceptors.response.use(
      (response) => {
        // Handle successful responses
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          //redirect to login
          console.log('Unauthorized! Logging out...');
          logout();
          window.location.href = '/login'
          return;
        }
        return Promise.reject(error);
      }
    );
    return instant;
  }
}
const clientApi = new ClientApi();
export default clientApi;

