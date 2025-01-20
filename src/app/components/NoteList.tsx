'use client'
import React, { useEffect, useState } from 'react'
import { useNotes } from '../stores/use-notes';
import NoteViewer from './NoteViewer';

export default function () {
    const { fetchNotes, notes, setCurrentNote } = useNotes();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('ID');

        if (userId) {
            fetchNotes(userId).catch((err) =>
                console.error("Error fetching habits:", err)
            ).finally(() => setLoading(false));
        } else {
            console.error("User ID not found in local storage.");
            setLoading(true);
        }
    }, []);

    const handleNoteClick = (note: any) => {
        setCurrentNote(note);
        console.log("handleClick note", note);
    };

    if (loading) {
        return (
            <div className="space-y-4 overflow-auto h-60 scrollbar scrollbar-track-c1-light scrollbar-thumb-c1-lighter">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="p-4 border-t-4 bg-c1-light w-72 rounded-sm hover:bg-c1-lighter">
                        <NoteViewer content={{
                            type: "doc",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [
                                        {
                                            type: "text",
                                            text: "Loading..."
                                        }
                                    ]
                                }
                            ]
                        }} />
                        <div className="text-gray-400 text-xs relative bottom-8 left-48 w-min">Loading...</div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4 overflow-auto h-60 scrollbar scrollbar-track-c1-light scrollbar-thumb-c1-lighter">
            {notes.map((note) => (
                <div
                    key={note.id}
                    className="p-4 border-t-4 bg-c1-light w-72 rounded-sm hover:bg-c1-lighter cursor-pointer"
                    onClick={() => handleNoteClick(note)}
                >
                    <NoteViewer content={note.note} />
                    <div className="text-gray-400 text-xs relative bottom-8 left-48 w-min">
                        {note.createdAt.toLocaleString().split("T")[0].replaceAll("-", "/")}
                    </div>
                </div>
            ))}
        </div>
    )
}
