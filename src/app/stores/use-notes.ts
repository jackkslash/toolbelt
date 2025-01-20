import { JSONContent } from "@tiptap/react";
import { create } from "zustand";

type Note = {
    id: string;
    userId: string;
    note: JSONContent;
    createdAt: Date;
    updatedAt: Date;
};

type NoteStore = {
    notes: Note[];
    currentNote?: Note;
    setCurrentNote: (note: Note) => void;
    fetchNotes: (userId: string) => Promise<void>;
    addNote: (note: JSONContent, id: string) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
    updateNote: (id: string, note: JSONContent) => Promise<void>;
}

export const useNotes = create<NoteStore>((set) => ({
    notes: [],
    setCurrentNote: (note: Note) => set({ currentNote: note }),
    fetchNotes: async (userId: string) => {
        try {
            const res = await fetch(`/api/notes?userId=${userId}`, { method: "GET" });
            if (!res.ok) throw new Error(`Failed to fetch notes: ${res.statusText}`);
            const data = await res.json();
            set({ notes: data });
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    },
    addNote: async (note: JSONContent, userId: string) => {
        try {
            const res = await fetch("/api/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ note, userId }),
            });
            if (!res.ok) throw new Error(`Failed to add note: ${res.statusText}`);
            const newNote = await res.json();
            set((state) => ({
                notes: [...state.notes, newNote],
            }));
        } catch (error) {
            console.error("Error adding note:", error);
        }
    },
    deleteNote: async (id: string) => {
        try {
            const res = await fetch(`/api/notes?id=${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error(`Failed to delete note: ${res.statusText}`);
            set((state) => ({
                notes: state.notes.filter((note) => note.id !== id),
            }));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    },
    updateNote: async (id: string, note: JSONContent) => {
        try {
            const res = await fetch("/api/notes", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, note }),
            });
            if (!res.ok) throw new Error(`Failed to update note: ${res.statusText}`);
            set((state) => ({
                notes: state.notes.map((existingNote) =>
                    existingNote.id === id ? { ...existingNote, ...note } : existingNote
                ),
            }));
        } catch (error) {
            console.error("Error updating note:", error);
        }
    },
}));