import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import { Post } from "@/types/post";
import { PostsResponse } from "@/types/api";


export interface PostListProps {
    page: number;
}

const getData = async (page: number): Promise<Post[]> => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?page=${page}`
  );
  if (!resp.ok) {
    throw new Error("Failed");
  }
  const data: PostsResponse = await resp.json();

  return data.posts;
};

const CardList = async ({ page }: PostListProps) => {
  const data = await getData(page);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {data.map((item) => (
          <Card key={item.id} data={item}/>
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default CardList;
