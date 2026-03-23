"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import { Toolbar } from "./Toolbar";

interface EditorProps {
  onTextChange: (text: string, html: string) => void;
}

export function Editor({ onTextChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({
        placeholder: "Start writing…",
      }),
      Typography,
      Underline,
      Highlight.configure({ multicolor: false }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CharacterCount,
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
    onUpdate: ({ editor }) => {
      onTextChange(editor.getText(), editor.getHTML());
    },
  });

  const wordCount = editor?.storage.characterCount?.words() ?? 0;
  const charCount = editor?.storage.characterCount?.characters() ?? 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar editor={editor} />
      <div style={{ flex: 1, overflowY: "auto", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <EditorContent editor={editor} />
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid #e7e5e4",
          padding: "8px 16px",
          fontSize: "0.75rem",
          color: "#a8a29e",
          display: "flex",
          gap: "16px",
          backgroundColor: "#fafaf9",
        }}
      >
        <span>{wordCount} words</span>
        <span>{charCount} characters</span>
      </div>
    </div>
  );
}
