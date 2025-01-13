'use client'
import React, { useEffect } from 'react'
import { useNotes } from '../stores/use-notes';
import NoteViewer from './NoteViewer';
export default function () {
    const { fetchNotes, notes } = useNotes();
    useEffect(() => {
        const userId = localStorage.getItem('ID');
        if (userId) {
            fetchNotes(userId).catch((err: Error) =>
                console.error("Error fetching habits:", err)
            );
        } else {
            console.error("User ID not found in local storage.");
        }
    }, []);
    return (
        <div className="space-y-4 pb-4 overflow-auto h-60 scrollbar scrollbar-track-c1-light scrollbar-thumb-c1-lighter">
            {notes.map((note) => (
                <div key={note.id} className="mr-2 p-4 border w-72">
                    <NoteViewer content={note.note} />
                </div>
            ))}
        </div>
    )
}