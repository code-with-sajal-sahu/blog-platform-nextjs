import { Category } from "./category";
import { Comment } from "./comment";
import { Post } from "./post";

export interface CategoriesResponse {
  categories: Category[];
}

export interface PostsResponse {
  posts: Post[];
  currentPage: number;
  totalPages: number;
}

export interface SinglePostResponse {
  post: Post;
}

export interface CommentsResponse {
  comments: Comment[];
}