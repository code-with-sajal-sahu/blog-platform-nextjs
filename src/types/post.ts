export interface Post {
    id: string;
    title: string;
    slug: string;
    desc: string;
    img: string;
    views: number;
    categorySlug: string;
    userEmail: string;
    createdAt: Date;
}
