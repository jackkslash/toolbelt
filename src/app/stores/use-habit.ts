import { create } from "zustand";

type Completion = {
    id: string;
    completedDate: Date;
};

type Habit = {
    id: string;
    userId: string;
    name: string;
    createdAt: Date;
    completions: Completion[];
};

type HabitStore = {
    habits: Habit[];
    fetchHabits: (userId: string) => Promise<void>;
    addHabit: (name: string, userId: string) => Promise<void>;
    deleteHabit: (id: string) => Promise<void>;
    updateHabit: (id: string, name: string) => Promise<void>;
    toggleCompletion: (habitId: string, date: string) => Promise<void>;
};

export const useHabit = create<HabitStore>((set) => ({
    habits: [],
    fetchHabits: async (userId: string) => {
        try {
            const res = await fetch(`/api/habits?userId=${userId}`, { method: "GET" });
            if (!res.ok) throw new Error(`Failed to fetch habits: ${res.statusText}`);
            const data = await res.json();
            set({ habits: data });
        } catch (e) {
            console.error("Error fetching habits:", e);
        }
    },
    addHabit: async (name: string, userId: string) => {
        try {
            const res = await fetch("/api/habits", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, userId }),
            });
            if (!res.ok) throw new Error(`Failed to add habit: ${res.statusText}`);
            const newHabit = await res.json();
            set((state) => ({
                habits: [...state.habits, newHabit],
            }));
        } catch (e) {
            console.error("Error adding habit:", e);
        }
    },
    deleteHabit: async (id: string) => {
        try {
            const res = await fetch(`/api/habits?id=${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error(`Failed to delete habit: ${res.statusText}`);
            set((state) => ({
                habits: state.habits.filter((habit) => habit.id !== id),
            }));
        } catch (e) {
            console.error("Error deleting habit:", e);
        }
    },
    updateHabit: async (id: string, name: string) => {
        try {
            const res = await fetch("/api/habits", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, name }),
            });
            if (!res.ok) throw new Error(`Failed to update habit: ${res.statusText}`);
            set((state) => ({
                habits: state.habits.map((habit) =>
                    habit.id === id ? { ...habit, name } : habit
                ),
            }));
        } catch (e) {
            console.error("Error updating habit:", e);
        }
    },
    toggleCompletion: async (habitId: string, date: string) => {
        try {
            const res = await fetch("/api/habits/toggle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ habitId, date }),
            });
            if (!res.ok) throw new Error(`Failed to toggle completion: ${res.statusText}`);
            const { message } = await res.json();
            set((state) => ({
                habits: state.habits.map((habit) =>
                    habit.id === habitId
                        ? {
                            ...habit,
                            completions: message.includes("added")
                                ? [...(habit.completions || []), { id: Math.random().toString().slice(2, 8), completedDate: new Date(date) }]
                                : habit.completions.filter((completion) => new Date(completion.completedDate).toISOString().slice(0, 10) !== date),
                        }
                        : habit
                ),
            }));
        } catch (e) {
            console.error("Error toggling completion:", e);
        }
    }
}));
