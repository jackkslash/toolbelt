import { create } from "zustand";

type Note = {
    id: string;
    userId: string;
    note: string;
    createdAt: Date;
    updatedAt: Date;
};

type NoteStore = {
    notes: Note[];
    getNotes: (userId: string) => void;
    addNote: (note: Note) => void;
    deleteNote: (id: string) => void;
    updateNote: (id: string, note: Note) => void;
}

export const useNote = create<NoteStore>((set) => ({
    notes: [],
    getNotes: async (userId: string) => {
        try {
            const res = await fetch(`/api/notes?userId=${userId}`, { method: "GET" });
            if (!res.ok) throw new Error(`Failed to fetch notes: ${res.statusText}`);
            const data = await res.json();
            set({ notes: data });
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    },
    addNote: async (note: Note) => {
        try {
            const res = await fetch("/api/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(note),
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
    updateNote: async (id: string, note: Note) => {
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