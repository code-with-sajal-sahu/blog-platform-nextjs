import CardList from "@/components/cardList/CardList";
import styles from "./blog.module.css";
import Menu from "@/components/menu/Menu";
import { Suspense } from "react";
import PageLoader from "@/components/pageLoader/PageLoader";

interface BlogPageProps {
  searchParams: Promise<{ page?: string, category?: string }>;
}

interface BlogContentProps {
  searchParams: Promise<{ page?: string, category?: string }>;
}

const BlogContent = async ({ searchParams }: BlogContentProps) => {
  const { page, category } = await searchParams;

  const parsedPage = Number(page);

  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <>
      {category && <h1 className={styles.catg_title}>{category} Blog</h1>}
      <div className={styles.content_section}>
        <CardList page={currentPage} category={category || undefined} />
        <Menu />
      </div>
    </>
  );
};

const Blog = ({ searchParams }: BlogPageProps) => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<PageLoader />}>
        <BlogContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default Blog;
