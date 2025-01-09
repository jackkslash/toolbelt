'use client';
import React, { useEffect, useState } from 'react';
import { useHabit } from '../stores/use-habit';

interface AnalyticsProps {
    id: string;
}

export default function Analytics({ id }: AnalyticsProps) {
    const habit = useHabit((state) => state.getHabitById(id));

    const { fetchHabits } = useHabit();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('ID');

        if (userId) {
            fetchHabits(userId)
                .then(() => setLoading(false))
                .catch((err) => {
                    console.error("Error fetching habits:", err);
                    setLoading(false);
                });
        } else {
            console.error("User ID not found in local storage.");
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div className='flex flex-col gap-4 p-4 m-12 border border-slate-700 rounded-lg'></div>
    }

    if (!habit) {
        return <div>Habit not found</div>;
    }

    return (
        <div className='flex flex-col gap-4 p-4 m-12 border border-slate-700 rounded-lg'>
            <h1>Habit Analytics</h1>
            <p><strong>ID:</strong> {habit.id}</p>
            <p><strong>Name:</strong> {habit.name}</p>
            <p>
                <strong>Completions:</strong> {habit.completions.length} times
            </p>
        </div>
    );
}
