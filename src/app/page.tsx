import styles from "./homepage.module.css";
import CardList from "@/components/cardList/CardList";
import CategoryList from "@/components/categoryList/CategoryList";
import Featured from "@/components/featured/Featured";
import Menu from "@/components/menu/Menu";
import PageLoader from "@/components/pageLoader/PageLoader";
import { Suspense } from "react";

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

interface HomeContentProps {
  searchParams: Promise<{ page?: string }>;
}

const HomeContent = async ({ searchParams }: HomeContentProps) => {
  const { page } = await searchParams;

  const parsedPage = Number(page);

  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0
      ? parsedPage
      : 1;

  return (
    <>
      <Featured />
      <CategoryList />
      <div className={styles.content_section}>
        <CardList page={currentPage} />
        <Menu />
      </div>
    </>
  );
};

export default function Home({ searchParams }: HomePageProps) {
  return (
    <div className={styles.container}>
      <Suspense fallback={<PageLoader />}>
        <HomeContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
