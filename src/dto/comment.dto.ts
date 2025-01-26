import { User } from "./user.dto";

export interface CommentDto {
  id: number;
  postId: number;
  content: string;
  authorId: string;
  commentor: User;
}

export interface CreateCommentBody {
  content?: string;
  postId?: number;
  authorId?: number;
}

export interface UpdateCommentBody {
  content?: string;
}