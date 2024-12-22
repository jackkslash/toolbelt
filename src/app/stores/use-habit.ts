import { create } from "zustand";

type Habit = {
    id: string
    name: string
}

type HabitStore = {
    habits: Habit[]
    addHabit: (name: string) => void
    deleteHabit: (id: string) => void
    updateHabit: (id: string, name: string) => void
}

export const useHabit = create<HabitStore>((set) => ({
    habits: [],
    addHabit: async (name: string) => {


        const habit: Habit = {
            id: Math.random().toString().slice(2, 8),
            name
        }
        set((state: { habits: any; }) => ({
            habits: [...state.habits, habit]
        }))
    },
    deleteHabit: async (id: string) => {
        set((state: { habits: any; }) => ({
            habits: state.habits.filter((habit: { id: string; }) => habit.id !== id)
        }))
    },
    updateHabit: async (id: string, name: string) => {
        set((state: { habits: any; }) => ({
            habits: state.habits.map((habit: { id: string; }) => habit.id === id ? { ...habit, name } : habit)
        }))
    }
}));

