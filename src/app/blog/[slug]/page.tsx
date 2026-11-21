import Image from "next/image";
import Menu from "@/components/menu/Menu";
import styles from "./blogDetail.module.css";
import Comments from "@/components/comments/Comments";
import { Suspense } from "react";
import PageLoader from "@/components/pageLoader/PageLoader";
import { Post } from "@/types/post";
import { SinglePostResponse } from "@/types/api";
import { formatDate } from "../../../../lib/utils";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

interface BlogDetailContentProps {
  params: Promise<{ slug: string }>;
}

const getData = async (slug: string): Promise<Post> => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`,
  );
  if (!resp.ok) {
    throw new Error("Failed");
  }
  const data: SinglePostResponse = await resp.json();

  return data.post;
};

const BlogDetailContent = async ({ params }: BlogDetailContentProps) => {
  const { slug } = await params;
  const data = await getData(slug);
  return (
    <>
      <div className={styles.info_section}>
        <div className={styles.info_text}>
          <h1 className={styles.blog_title}>{data.title}</h1>
          <div className={styles.blog_meta}>
            <div className={styles.author_img}>
              <Image
                src={data.user.image || "/avatar-placeholder.jpg"}
                alt=""
                fill
                className={styles.avatar}
              />
            </div>
            <div className={styles.meta_text}>
              <span className={styles.author_text}>{data.user.name}</span>
              <span className={styles.date}>{formatDate(data.createdAt)}</span>
            </div>
          </div>
        </div>
        {data.img && (
          <div className={styles.info_img}>
            <Image src={data.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content_section}>
        <div className={styles.blog_desc}>
          <div
            className={styles.blog_desc_text}
            dangerouslySetInnerHTML={{ __html: data.desc }}
          />
          <div className={styles.comment}>
            <Comments />
          </div>
        </div>
        <Suspense fallback={null}>
          <Menu />
        </Suspense>
      </div>
    </>
  );
};
const BlogDetailPage = ({ params }: BlogDetailPageProps) => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<PageLoader />}>
        <BlogDetailContent params={params} />
      </Suspense>
    </div>
  );
};

export default BlogDetailPage;
