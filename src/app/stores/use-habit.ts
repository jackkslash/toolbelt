import { create } from "zustand";

type Habit = {
    id: number
    name: string
}

type HabitStore = {
    habits: Habit[]
    addHabit: (name: string) => void
    deleteHabit: (id: number) => void
    updateHabit: (id: number, name: string) => void
}

export const useHabit = create<HabitStore>((set) => ({
    habits: [],
    addHabit: async (name: string) => {
        const habit: Habit = {
            id: Math.random(),
            name
        }
        set((state: { habits: any; }) => ({
            habits: [...state.habits, habit]
        }))
    },
    deleteHabit: async (id: number) => {
        set((state: { habits: any; }) => ({
            habits: state.habits.filter((habit: { id: number; }) => habit.id !== id)
        }))
    },
    updateHabit: async (id: number, name: string) => {
        set((state: { habits: any; }) => ({
            habits: state.habits.map((habit: { id: number; }) => habit.id === id ? { ...habit, name } : habit)
        }))
    }
}));

