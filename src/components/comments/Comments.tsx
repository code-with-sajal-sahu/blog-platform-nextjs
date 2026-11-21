"use client";
import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { CommentsResponse } from "@/types/api";
import { formatDate } from "../../../lib/utils";

const fetchComments = async (postSlug: string) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postSlug}/comment`,
  );
  if (!resp.ok) {
    throw new Error("Failed");
  }
  const data: CommentsResponse = await resp.json();
  return data.comments;
};
interface CommentsProps {
  slug: string;
}
const Comments = ({ slug }: CommentsProps) => {
  const { status } = useSession();
  const { data, isLoading,  } = useQuery({
    queryKey: ["blogs", slug, "comments"],
    initialData: [],
    queryFn: async () => await fetchComments(slug),
  });
  const isAuthenticated = status === "authenticated";
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {!isAuthenticated ? (
        <div className={styles.login_btn_wrapper}>
          <Link href="/login" className={styles.login_btn}>
            Login to write a comment
          </Link>
        </div>
      ) : (
        <div className={styles.input_section}>
          <textarea placeholder="Write a comment..." className={styles.input} />
          <button className={styles.comment_btn}>Send</button>
        </div>
      )}
      <div className={styles.comments}>
        {isLoading ? "Loading comments..." : data.map((item, index) => (
          <div key={`comment-${index}`} className={styles.comment}>
            <div className={styles.user}>
              <Image
                src={item.user?.image || "/avatar-placeholder.jpg"}
                alt=""
                width={50}
                height={50}
                className={styles.image}
              />
              <div className={styles.user_info}>
                <span className={styles.user_name}>{item.user.name}</span>
                <span className={styles.date}>
                  {formatDate(item.createdAt)}
                </span>
              </div>
            </div>
            <p className={styles.comment_desc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
