import { Category } from "./category";

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
    createdAt: Date;
}
