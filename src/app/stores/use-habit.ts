import { date } from "drizzle-orm/mysql-core";
import { get } from "http";
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

//Optimistic Updates
//Error Handling
//Loading States


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
        const oHabit = {
            id: `TEMP_${Date.now()}`,
            name,
            userId,
            createdAt: new Date(),
            completions: []
        };

        set((state) => ({
            habits: [...state.habits, oHabit],
        }));

        try {
            const res = await fetch("/api/habits", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, userId }),
            });
            if (!res.ok) throw new Error(`Failed to add habit: ${res.statusText}`);
            const newHabit = await res.json();
            set((state) => ({
                habits: state.habits.map((habit) =>
                    habit.id === oHabit.id ? newHabit : habit
                ),
            }));
        } catch (e) {
            set((state) => ({
                habits: state.habits.filter((habit) => habit.id !== oHabit.id),
            }));
            console.error("Error adding habit:", e);
            throw e;
        }
    },
    deleteHabit: async (id: string) => {
        const prevHabits = [...useHabit.getState().habits];
        set(state => ({
            habits: state.habits.filter(habit => habit.id !== id)
        }));
        try {
            const res = await fetch(`/api/habits?id=${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error(`Failed to delete habit: ${res.statusText}`);
        } catch (e) {
            set({ habits: prevHabits });
            console.error("Error deleting habit:", e);
        }
    },
    updateHabit: async (id: string, name: string) => {
        const prevHabits = [...useHabit.getState().habits];
        set((state) => ({
            habits: state.habits.map((habit) =>
                habit.id === id ? { ...habit, name } : habit
            ),
        }));
        try {
            const res = await fetch("/api/habits", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, name }),
            });
            if (!res.ok) throw new Error(`Failed to update habit: ${res.statusText}`);
        } catch (e) {
            set({ habits: prevHabits });
            console.error("Error updating habit:", e);
        }
    },
    toggleCompletion: async (habitId: string, date: string) => {
        // Store previous state for rollback
        const prevHabits = [...useHabit.getState().habits];

        // Optimistically update the state
        set((state) => ({
            habits: state.habits.map((habit) => {
                if (habit.id !== habitId) return habit;

                const existingCompletion = habit.completions?.find(
                    (completion) => new Date(completion.completedDate).toISOString().slice(0, 10) === date
                );

                return {
                    ...habit,
                    completions: existingCompletion
                        ? (habit.completions || []).filter((completion) =>
                            new Date(completion.completedDate).toISOString().slice(0, 10) !== date
                        )
                        : [...(habit.completions || []), {
                            id: Math.random().toString().slice(2, 8),
                            completedDate: new Date(date)
                        }]
                };
            })
        }));

        try {
            const res = await fetch("/api/habits/toggle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ habitId, date }),
            });

            if (!res.ok) {
                throw new Error(`Failed to toggle completion: ${res.statusText}`);
            }

        } catch (e) {
            // Rollback to previous state if there's an error
            console.error("Error toggling completion:", e);
            set({ habits: prevHabits });
        }
    }
}));
