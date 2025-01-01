'use client'
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import EditorMenuBar from './EditorMenuBar';

export default function Editor() {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose max-w-none p-4 focus:outline-none min-h-[200px]',
            },
        },
    });

    return (
        <div className="border rounded">
            <EditorMenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}

