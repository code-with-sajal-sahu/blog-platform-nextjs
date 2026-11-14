import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.img_container}>
        <Image src="/p1.jpeg" alt="Post Image" fill className={styles.image} />
      </div>
      <div className={styles.text_container}>
        <div className={styles.meta}>
          <span className={styles.date}>January 1, 2023 - </span>
          <span className={styles.category}>Coding</span>
        </div>
        <Link href="/">
          <h1 className={styles.post_title}>Lorem Ipsum</h1>
        </Link>
        <p className={styles.post_desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <Link href="/" className={styles.read_more}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
