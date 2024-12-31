'use client'
import React from 'react';
import { Bold, Italic, List, ListOrdered, Quote, Undo, Redo, Code } from 'lucide-react';
import { Editor } from '@tiptap/react';

export default function EditorMenuBar({ editor }: { editor: Editor | null }) {
    if (!editor) return null;

    return (
        <div className="flex gap-2 p-2 border-b">
            <button
                onClick={function () { editor.chain().focus().toggleBold().run() }}
                className={`p-2 hover:bg-gray-100 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
            >
                <Bold className="w-4 h-4" />
            </button>
            <button
                onClick={function () { editor.chain().focus().toggleItalic().run() }}
                className={`p-2 hover:bg-gray-100 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
            >
                <Italic className="w-4 h-4" />
            </button>
            <button
                onClick={function () { editor.chain().focus().toggleBulletList().run() }}
                className={`p-2 hover:bg-gray-100 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
            >
                <List className="w-4 h-4" />
            </button>
            <button
                onClick={function () { editor.chain().focus().toggleOrderedList().run() }}
                className={`p-2 hover:bg-gray-100 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
            >
                <ListOrdered className="w-4 h-4" />
            </button>
            <button
                onClick={function () { editor.chain().focus().toggleCodeBlock().run() }}
                className={`p-2 hover:bg-gray-100 rounded ${editor.isActive('codeBlock') ? 'bg-gray-200' : ''}`}
            >
                <Code className="w-4 h-4" />
            </button>
            <button
                onClick={function () { editor.chain().focus().toggleBlockquote().run() }}
                className={`p-2 hover:bg-gray-100 rounded ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
            >
                <Quote className="w-4 h-4" />
            </button>
            <button
                onClick={function () { editor.chain().focus().undo().run() }}
                disabled={!editor.can().undo()}
                className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
            >
                <Undo className="w-4 h-4" />
            </button>
            <button
                onClick={function () { editor.chain().focus().redo().run() }}
                disabled={!editor.can().redo()}
                className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
            >
                <Redo className="w-4 h-4" />
            </button>
        </div>
    );
}