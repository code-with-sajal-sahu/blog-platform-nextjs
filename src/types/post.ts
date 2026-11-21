import { Category } from "./category";
import { User } from "./user";

export interface Post {
    id: string;
    title: string;
    slug: string;
    desc: string;
    img: string;
    views: number;
    categorySlug: string;
    category: Category;
    userEmail: string;
    user: User;
    createdAt: Date;
}
