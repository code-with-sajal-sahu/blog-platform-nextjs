"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Block, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import styles from "./blockNoteEditor.module.css";
import { uploadImage } from "./uploadImage";

export type BlockNoteEditorProps = {
  initialContent?: PartialBlock[];
  onChange?: (content: Block[]) => void;
  className?: string;
};

export default function BlockNoteEditor({
  initialContent,
  onChange,
  className,
}: BlockNoteEditorProps) {
  const [uploadError, setUploadError] = useState("");
  const initialContentRef = useRef(initialContent);
  const { resolvedTheme } = useTheme();

  const handleUpload = useCallback(async (file: File) => {
    setUploadError("");
    try {
      return await uploadImage(file);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Image upload failed.";
      setUploadError(`${message} Configure the /api/uploads endpoint to enable uploads.`);
      throw error;
    }
  }, []);

  const editor = useCreateBlockNote({
    initialContent,
    uploadFile: handleUpload,
  });

  // Supports content loaded asynchronously when an existing article is opened.
  useEffect(() => {
    if (initialContent && initialContent !== initialContentRef.current) {
      editor.replaceBlocks(editor.document, initialContent);
      initialContentRef.current = initialContent;
    }
  }, [editor, initialContent]);

  const reportChange = useCallback(() => {
    onChange?.(editor.document);
  }, [editor, onChange]);

  useEffect(() => {
    reportChange();
  }, [reportChange]);

  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <BlockNoteView
        editor={editor}
        onChange={reportChange}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        className={`${styles.view} editor-wrapper`}
      />
      {uploadError && (
        <p className={styles.upload_error} role="alert">
          {uploadError}
        </p>
      )}
    </div>
  );
}
