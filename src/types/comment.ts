export interface Comment{
    desc: string;
    user: {
        name: string;
        image: string;
    };
    createdAt: string;
}