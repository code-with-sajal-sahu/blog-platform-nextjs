import { Category } from "./category";
import { Post } from "./post";

export interface CategoriesResponse {
  categories: Category[];
}

export interface PostsResponse {
  posts: Post[];
}