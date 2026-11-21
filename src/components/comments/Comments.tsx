"use client"
import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
const Comments = () => {
  const {status} = useSession();
  const isAuthenticated = status === "authenticated";
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {!isAuthenticated ? (
        <div className={styles.login_btn_wrapper}>
          <Link href="/login" className={styles.login_btn}>Login to write a comment</Link>
        </div>
      ) : (
        <div className={styles.input_section}>
          <textarea placeholder="Write a comment..." className={styles.input} />
          <button className={styles.comment_btn}>Send</button>
        </div>
      )}
      <div className={styles.comments}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={`comment-${index}`} className={styles.comment}>
            <div className={styles.user}>
              <Image
                src="/p1.jpeg"
                alt=""
                width={50}
                height={50}
                className={styles.image}
              />
              <div className={styles.user_info}>
                <span className={styles.user_name}>Tom Holland</span>
                <span className={styles.date}>April 20, 2026</span>
              </div>
            </div>
            <p className={styles.comment_desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos aut,
              qui neque assumenda officia cupiditate soluta eum magni velit
              fugit sequi totam incidunt, autem doloribus aperiam voluptatem
              exercitationem fugiat quo?
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
