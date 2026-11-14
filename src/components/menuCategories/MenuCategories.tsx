import Link from "next/link";
import styles from "./menuCategories.module.css"

const MenuCategories = () => {
  const categories = [
    { id: 1, name: "style", image: "/style.png" },
    { id: 2, name: "fashion", image: "/fashion.png" },
    { id: 3, name: "food", image: "/food.png" },
    { id: 4, name: "travel", image: "/travel.png" },
    { id: 5, name: "culture", image: "/culture.png" },
    { id: 6, name: "coding", image: "/coding.png" },
  ];
  return (
    <div className={styles.catg_list}>
      {categories.map((category, index) => (
        <Link
          key={category.id}
          href={`/blog?category=${category.id}`}
          className={`${styles.category} ${styles["category-" + (index + 1)]}`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;
