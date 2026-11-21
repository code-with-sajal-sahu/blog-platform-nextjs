import Link from "next/link";
import styles from "./categoryList.module.css";
import Image from "next/image";
import { Category } from "@/types/category";
import { CategoriesResponse } from "@/types/api";

const getData = async (): Promise<Category[]> => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    { cache: "no-store" },
  );
  if (!resp.ok) {
    throw new Error("Failed");
  }
  const data: CategoriesResponse = await resp.json();

  return data.categories;
};

const CategoryList = async () => {
  // const categories = [
  //   { id: 1, title: "style", img: "/style.png" },
  //   { id: 2, title: "fashion", img: "/fashion.png" },
  //   { id: 3, title: "food", img: "/food.png" },
  //   { id: 4, title: "travel", img: "/travel.png" },
  //   { id: 5, title: "culture", img: "/culture.png" },
  //   { id: 6, title: "coding", img: "/coding.png" },
  // ];
  const categories = await getData();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={`/blog?category=${category.slug}`}
            className={`${styles.category} ${styles["category-" + (index + 1)]}`}
          >
            {category.img && (
              <Image
                src={category.img}
                alt={category.title}
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            <span>{category.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
