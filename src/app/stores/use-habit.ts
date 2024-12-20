import { create } from "zustand";

type Habit = {
    id: number
    name: string
}

type HabitStore = {
    habits: Habit[]
    addHabit: (habit: Habit) => void
}

export const useHabit = create<HabitStore>((set) => ({
    habits: [],
    addHabit: async (habit: any) => {
        set((state: { habits: any; }) => ({
            habits: [...state.habits, habit]
        }))
    }
}));

