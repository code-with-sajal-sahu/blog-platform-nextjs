"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./writeBlog.module.css";
import type { Block } from "@blocknote/core";
import BlockNoteEditor from "@/components/blockNoteEditor/DynamicBlockNoteEditor";

const WriteBlogPage = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<Block[]>([]);
  const [saveMessage, setSaveMessage] = useState("");

  const handlePublish = () => {
    // Connect this structured document to the article API when persistence is added.
    setSaveMessage(
      content.length > 0
        ? "Your article content is ready to save."
        : "Add some content before publishing.",
    );
  };

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
      <BlockNoteEditor onChange={setContent} className={styles.blocknote_editor} />
      <button className={styles.publish_btn} onClick={handlePublish}>
        Publish
      </button>
      {saveMessage && <p role="status" className={styles.save_message}>{saveMessage}</p>}
    </div>
  );
};

export default WriteBlogPage;
