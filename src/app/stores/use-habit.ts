import { create } from "zustand";

type Status = 'idle' | 'loading' | 'success' | 'error';

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

interface StoreState {
    status: Status;
    error: string | null;
    habits: Habit[];
}

interface StoreActions {
    fetchHabits: (userId: string) => Promise<void>;
    addHabit: (name: string, userId: string) => Promise<void>;
    deleteHabit: (id: string) => Promise<void>;
    updateHabit: (id: string, name: string) => Promise<void>;
    toggleCompletion: (habitId: string, date: string) => Promise<void>;
}

type HabitStore = StoreState & StoreActions;

const apiService = {
    async fetchHabits(userId: string) {
        const res = await fetch(`/api/habits?userId=${userId}`, { method: "GET" });
        if (!res.ok) throw new Error(`Failed to fetch habits: ${res.statusText}`);
        return await res.json();
    },
    async addHabit(name: string, userId: string) {
        const res = await fetch("/api/habits", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, userId }),
        });
        if (!res.ok) throw new Error(`Failed to add habit: ${res.statusText}`);
        return await res.json();
    },
    async deleteHabit(id: string) {
        const res = await fetch(`/api/habits?id=${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error(`Failed to delete habit: ${res.statusText}`);
    },
    async updateHabit(id: string, name: string) {
        const res = await fetch("/api/habits", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name }),
        });
        if (!res.ok) throw new Error(`Failed to update habit: ${res.statusText}`);
        return res.json();
    },
    async toggleCompletion(habitId: string, date: string) {
        const res = await fetch("/api/habits/toggle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ habitId, date }),
        });
        if (!res.ok) throw new Error(`Failed to toggle completion: ${res.statusText}`);
        return res.json();
    }
}

export const useHabit = create<HabitStore>((set) => ({
    status: 'idle',
    error: null,
    habits: [],
    fetchHabits: async (userId: string) => {
        set({ status: 'loading' });
        try {
            const data = await apiService.fetchHabits(userId);
            set({ habits: data, status: 'success' });
        } catch (e) {
            set({
                status: 'error',
                error: e instanceof Error ? e.message : 'Unknown error'
            });
            console.error("Error fetching habits:", e);
        }
    },
    addHabit: async (name: string, userId: string) => {
        const oHabit: Habit = {
            id: `TEMP_${Date.now()}`,
            name,
            userId,
            createdAt: new Date(),
            completions: []
        };

        set((state) => ({
            status: 'success',
            habits: [...state.habits, oHabit],
        }));

        try {
            const newHabit = await apiService.addHabit(name, userId);
            set((state) => ({
                status: 'success',
                habits: state.habits.map((habit) =>
                    habit.id === oHabit.id ? newHabit : habit
                ),
            }));
        } catch (e) {
            set((state) => ({
                status: 'error',
                error: e instanceof Error ? e.message : 'Unknown error',
                habits: state.habits.filter((habit) => habit.id !== oHabit.id),
            }));
            console.error("Error adding habit:", e);
        }
    },
    deleteHabit: async (id: string) => {
        const prevHabits = [...useHabit.getState().habits];
        set(state => ({
            habits: state.habits.filter(habit => habit.id !== id)
        }));
        try {
            await apiService.deleteHabit(id);
            set({ status: 'success' });
        } catch (e) {
            set({
                status: 'error',
                error: e instanceof Error ? e.message : 'Unknown error',
                habits: prevHabits
            });
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
            await apiService.updateHabit(id, name);
            set({ status: 'success' });
        } catch (e) {
            set({
                status: 'error',
                error: e instanceof Error ? e.message : 'Unknown error',
                habits: prevHabits
            });
            console.error("Error updating habit:", e);
        }
    },
    toggleCompletion: async (habitId: string, date: string) => {
        // Store previous state for rollback
        const prevHabits = [...useHabit.getState().habits];

        // Optimistically update the state
        set((state) => ({
            status: 'loading',
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
            await apiService.toggleCompletion(habitId, date);
            set({ status: 'success' });
        } catch (e) {
            // Rollback to previous state if there's an error
            console.error("Error toggling completion:", e);
            set({
                status: 'error',
                error: e instanceof Error ? e.message : 'Unknown error',
                habits: prevHabits
            });
        }
    }
}));
