import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import { Post } from "@/types/post";
import { PostsResponse } from "@/types/api";
import DataNotFound from "../dataNotFound/DataNotFound";

export interface PostListProps {
  page: number;
  category?: string | undefined;
}

const getData = async (
  page: number,
  category?: string
): Promise<{ posts: Post[]; totalPages: number }> => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?page=${page}&category=${category || ""}`,
  );
  if (!resp.ok) {
    throw new Error("Failed");
  }
  const data: PostsResponse = await resp.json();

  return { posts: data.posts, totalPages: data.totalPages };
};

const CardList = async ({ page, category }: PostListProps) => {
  const data = await getData(page, category);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      {data.posts.length ? (
        <>
          <div className={styles.posts}>
            {data.posts.map((item) => (
              <Card key={item.id} data={item} />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={data.totalPages} />
        </>
      ) : (
        <DataNotFound customLable={`No posts available${category ? " by this category" : ""}`} />
      )}
    </div>
  );
};

export default CardList;
