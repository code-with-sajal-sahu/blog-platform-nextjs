import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { Post } from "@/types/post";

interface CardProps {
  data: Post;
}
const Card = ({data}: CardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.img_container}>
        <Image src="/p1.jpeg" alt="Post Image" fill className={styles.image} />
      </div>
      <div className={styles.text_container}>
        <Link href={`/blog/${data.slug}`}>
          <h1 className={styles.post_title}>{data.title}</h1>
        </Link>
        <p className={styles.post_desc}>
          {data.desc}
        </p>
        <div className={styles.meta}>
          <span className={styles.date}>{(new Date(data.createdAt)).toLocaleDateString()} - </span>
          <span className={styles.category}>{data.category.title}</span>
        </div>        
        <Link href={`/blog/${data.slug}`} className={styles.read_more}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
