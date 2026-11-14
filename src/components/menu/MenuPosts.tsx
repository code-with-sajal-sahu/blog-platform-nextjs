import Image from "next/image";
import Link from "next/link";
import styles from "./menu.module.css";

interface MenuPostsProps {
  showImage?: boolean;
}
const MenuPosts = ({ showImage = true }: MenuPostsProps) => {
  const popularBlogs = [
    {
      id: 1,
      title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
      author: "Carol Denver",
      created_at: "January 1, 2024",
      category: "style",
      image: "/style.png",
    },
    {
      id: 2,
      title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
      author: "Carol Denver",
      created_at: "January 1, 2024",
      category: "fashion",
      image: "/fashion.png",
    },
    {
      id: 3,
      title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
      author: "Carol Denver",
      created_at: "January 1, 2024",
      category: "food",
      image: "/food.png",
    },
    {
      id: 4,
      title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
      author: "Carol Denver",
      created_at: "January 1, 2024",
      category: "travel",
      image: "/travel.png",
    },
    // { id: 5, category: "culture", image: "/culture.png" },
    // { id: 6, category: "coding", image: "/coding.png" },
  ];
  return (
    <div className={styles.items}>
      {popularBlogs.map((blog, index) => (
        <Link href="/" key={`blog-${blog.id}`} className={styles.item}>
          {showImage && (
            <div className={styles.img_container}>
              <Image src={blog.image} alt={blog.category} fill />
            </div>
          )}
          <div className={styles.text_container}>
            <span
              className={`${styles.category} ${styles["category-" + (index + 1)]}`}
            >
              {blog.category}
            </span>
            <h3 className={styles.post_title}>{blog.title}</h3>
            <div className={styles.meta}>
              <span className={styles.user_name}>{blog.author} </span>
              <span className={styles.date}>{blog.created_at}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPosts;
