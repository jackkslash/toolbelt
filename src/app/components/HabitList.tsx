'use client';

import React, { useEffect } from 'react';
import { useHabit } from '../stores/use-habit';
import Habit from './Habit';

export default function HabitList() {
    const { fetchHabits, habits } = useHabit();

    useEffect(() => {
        const userId = localStorage.getItem('ID'); // Retrieve the userId from local storage

        if (userId) {
            fetchHabits(userId).catch((err) =>
                console.error("Error fetching habits:", err)
            );
        } else {
            console.error("User ID not found in local storage.");
        }
    }, []);
    console.log("after ", habits)
    return (
        <div>
            {habits.map((habit) => (
                <Habit key={habit.id} habit={habit} />
            ))}
        </div>
    );
}
