"use client";

import dynamic from "next/dynamic";
import type { BlockNoteEditorProps } from "./BlockNoteEditor";

const DynamicBlockNoteEditor = dynamic<BlockNoteEditorProps>(
  () => import("./BlockNoteEditor"),
  {
    ssr: false,
    loading: () => <div role="status">Loading editor…</div>,
  },
);

export default DynamicBlockNoteEditor;
