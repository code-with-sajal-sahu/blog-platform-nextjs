"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./writeBlog.module.css";
const WriteBlogPage = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className={styles.container}>
      <input type="text" placeholder="Title" className={styles.input}/>
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <button className={styles.add_button}>
              <Image src="/image.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.add_button}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.add_button}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.textarea}
        placeholder="Tell your story..."
      />
      <button className={styles.publish_btn}>Publish</button>
    </div>
  );
};

export default WriteBlogPage;
