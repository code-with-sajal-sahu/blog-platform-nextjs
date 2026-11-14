import Link from "next/link";
import styles from "./categoryList.module.css";
import Image from "next/image";
const CategoryList = () => {
  const categories = [
    { id: 1, name: "style", image: "/style.png" },
    { id: 2, name: "fashion", image: "/fashion.png" },
    { id: 3, name: "food", image: "/food.png" },
    { id: 4, name: "travel", image: "/travel.png" },
    { id: 5, name: "culture", image: "/culture.png" },
    { id: 6, name: "coding", image: "/coding.png" },
  ];
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={`/blog?category=${category.id}`}
            className={`${styles.category} ${styles["category-" + (index + 1)]}`}
          >
            <Image
              src={category.image}
              alt={category.name}
              width={32}
              height={32}
              className={styles.image}
            />
            <span>{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
