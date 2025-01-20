'use client'
import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import EditorMenuBar from './EditorMenuBar';
import { useNotes } from '../stores/use-notes';
import { PlusCircleIcon } from 'lucide-react';

export default function Editor() {
    const { addNote, currentNote } = useNotes();
    const [userId, setUserId] = useState<string | null>(null);
    const editor = useEditor({
        extensions: [StarterKit],
        content: currentNote?.note || '',
        editorProps: {
            attributes: {
                class: 'prose max-w-none p-4 focus:outline-none min-h-[200px]',
            },
        },
    });

    useEffect(() => {
        const userId = localStorage.getItem('ID');
        if (userId) {
            setUserId(userId);
        } else {
            console.error("User ID not found in local storage.");
        }
    }, []);

    useEffect(() => {
        if (editor && currentNote) {
            editor.commands.setContent(currentNote.note);
        }
    }, [currentNote, editor]);

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!editor || !userId) return;

        // Get the button that was clicked
        const button = (event.nativeEvent as SubmitEvent).submitter;
        const buttonText = button?.textContent?.trim();

        switch (buttonText) {
            case 'Update Note':
                if (currentNote) {
                    // Update existing note logic
                    console.log('Update existing note logic');
                }
                break;
            case 'Delete Note':
                if (currentNote) {
                    console.log('Delete existing note logic');
                }
                break;
            case 'Add Note':
                await addNote(editor.getJSON(), userId);
                editor.commands.clearContent();
                break;
            default:
                console.log('Unknown button clicked:', buttonText);
                break;
        }
    };

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <div className="border rounded">
                    <EditorMenuBar editor={editor} />
                    <EditorContent editor={editor} />
                </div>

                {currentNote && (
                    <div className='flex flex-row gap-1'>
                        <button
                            type="submit"
                            className="mt-2 gap-2 px-6 py-4 bg-c1-lighter max-w-screen-md rounded-md float-end"
                        >Update Note</button>
                        <button
                            type="submit"
                            className="mt-2 gap-2 px-6 py-4 bg-c1-lighter max-w-screen-md rounded-md float-end"
                        >Delete Note</button>
                        <button
                            type="submit"
                            className="mt-2 gap-2 px-6 py-4 bg-c1-lighter max-w-screen-md rounded-md float-end"
                        >
                            <PlusCircleIcon className='w-6 h-6' />
                        </button>
                    </div>
                )}
                {!currentNote && (
                    <button
                        onClick={() => handleOnSubmit}
                        type="submit"
                        className="mt-2 gap-2 px-6 py-4 bg-c1-lighter max-w-screen-md rounded-md float-end"
                    >Add Note</button>
                )}
            </form>
        </div>
    );
}
