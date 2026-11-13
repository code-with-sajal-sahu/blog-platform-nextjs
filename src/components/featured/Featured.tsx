import Image from "next/image";
import styles from "./featured.module.css";
const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.featured_title}>
        <b>Hey, This is Sajal Sahu</b> Discover my stories and creative ideas.
      </h1>
      <div className={styles.featured_post}>
        <div className={styles.img_container}>
          <Image src="/p1.jpeg" alt="" fill className={styles.featured_img} />
        </div>
        <div className={styles.text_container}>
          <h1 className={styles.post_title}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1>
          <p className={styles.post_desc}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse porro
            ea numquam fugit. Repellendus tempora eligendi soluta. Magnam
            eligendi deserunt fugit modi, voluptatum rerum cum impedit unde,
            quam architecto labore.
            Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Esse porro ea numquam fugit. Repellendus tempora
            eligendi soluta. Magnam eligendi deserunt fugit modi, voluptatum
            rerum cum impedit unde, quam architecto labore.
          </p>
          <button className={styles.post_btn}>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
