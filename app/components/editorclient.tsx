"use client";

import { Editor } from "@tinymce/tinymce-react";

const tinymceApiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;

type EditorClientProps = {
  initialValue?: string;
  onChange?: (content: string) => void;
};

export default function EditorClient({
  initialValue,
  onChange,
}: EditorClientProps) {
  return (
      <Editor
apiKey={tinymceApiKey}
initialValue={initialValue}
tinymceScriptSrc={`https://cdn.tiny.cloud/1/${tinymceApiKey}/tinymce/8/tinymce.min.js`}
      init={{
        height: 500,
        menubar: false,
        toolbar_location: "bottom",
        plugins: "lists link image table code help wordcount",
        toolbar: [
          'undo redo | formatselect | bold italic emoticons | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image code'
        ],
        skin: "oxide-dark",
        content_css: "dark",
      }}
      onEditorChange={(content) => {
        onChange?.(content);
      }}
    />
  );
}
