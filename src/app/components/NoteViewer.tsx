import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

import React from 'react'
import { XIcon } from "lucide-react";

export default function NoteViewer({ content }: { content: JSONContent }) {
    const editor = useEditor({
        extensions: [Document, Paragraph, Text],
        content: content,
        editable: false, // Make it non-editable if you just want to view
    });

    useEffect(() => {
        return () => {
            if (editor) {
                editor.destroy(); // Clean up the editor on component unmount
            }
        };
    }, [editor]);

    if (!editor) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-row justify-between">
            <EditorContent editor={editor} />
            <XIcon className="cursor-pointer" />
        </div>
    );
}
