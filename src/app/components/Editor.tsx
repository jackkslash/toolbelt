'use client'
import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import EditorMenuBar from './EditorMenuBar';
import { useNotes } from '../stores/use-notes';

export default function Editor() {
    const [userId, setUserId] = useState<string | null>(null);
    const editor = useEditor({
        extensions: [StarterKit],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose max-w-none p-4 focus:outline-none min-h-[200px]',
            },
        },
    });

    const { addNote } = useNotes();
    useEffect(() => {
        const userId = localStorage.getItem('ID'); // Retrieve the userId from local storage

        if (userId) {
            setUserId(userId);
        } else {
            console.error("User ID not found in local storage.");
        }
    }, []);


    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!editor || !userId) return;
        await addNote(editor.getJSON(), userId);
        editor.commands.clearContent();
    };

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <div className="border rounded">
                    <EditorMenuBar editor={editor} />
                    <EditorContent editor={editor} />
                </div>

                <button
                    onClick={() => handleOnSubmit}
                    type="submit"
                    className="mt-2 gap-2 px-12 py-8 bg-slate-500 max-w-screen-md rounded-md"
                >Add Note</button>
            </form>
        </div>
    );
}

