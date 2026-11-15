import Image from "next/image";
import Menu from "@/components/menu/Menu";
import styles from "./blogDetail.module.css";
import Comments from "@/components/comments/Comments";

const BlogDetail = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info_section}>
        <div className={styles.info_text}>
          <h1 className={styles.blog_title}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <div className={styles.blog_meta}>
            <div className={styles.author_img}>
              <Image src="/p1.jpeg" alt="" fill className={styles.avatar} />
            </div>
            <div className={styles.meta_text}>
              <span className={styles.author_text}>Henry Lockwood</span>
              <span className={styles.date}>January 04, 2025</span>
            </div>
          </div>
        </div>
        <div className={styles.info_img}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>
      </div>
      <div className={styles.content_section}>
        <div className={styles.blog_desc}>
          <div className={styles.blog_desc_text}>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla
              dolore quae, ad eum in rem eius sapiente porro eligendi omnis
              debitis saepe rerum voluptas voluptatibus quibusdam tenetur totam
              odit ut!
            </p>
            <p>
              Saepe non incidunt, tenetur aut magnam praesentium aliquam
              necessitatibus voluptatem nam quia itaque laborum, placeat ipsum!
              Id natus molestiae, earum, nam deleniti voluptas reiciendis optio
              temporibus dignissimos asperiores voluptatibus iusto?
            </p>
            <p>
              Perspiciatis saepe molestiae ex ab quo voluptas quidem laudantium
              aspernatur recusandae, maxime, laborum sapiente quibusdam nemo
              quam assumenda! Soluta alias quibusdam deserunt quisquam rem
              deleniti quasi odio quaerat autem distinctio?
            </p>
            <p>
              Aut magni mollitia commodi, eos odio id eius amet possimus facere
              quasi repellendus, cum voluptate perspiciatis, nulla modi omnis
              voluptas molestias. Facere inventore veritatis excepturi
              voluptatum a consectetur ex consequuntur. Aut magni mollitia
              commodi, eos odio id eius amet possimus facere quasi repellendus,
              cum voluptate perspiciatis, nulla modi omnis voluptas molestias.
              Facere inventore veritatis excepturi voluptatum a consectetur ex
              consequuntur.
            </p>
          </div>
          <div className={styles.comment}>
            <Comments />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default BlogDetail;
