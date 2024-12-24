'use client';

import React from 'react';
import { useHabit } from '../stores/use-habit';
import Habit from './Habit';

export default function HabitList() {
    const { habits } = useHabit();

    return (
        <div>
            {habits.map((habit) => (
                <Habit key={habit.id} habit={habit} />
            ))}
        </div>
    );
}
