import { User } from "./user.dto";

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: string;
  author: User;
  comments?: Comment[];
  community?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostBody {
  title?: string;
  content?: string;
  authorId?: number;
  community?: string;
}

export interface UpdatePostBody {
  title?: string;
  content?: string;
  community?: string;
}