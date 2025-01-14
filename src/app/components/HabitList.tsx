'use client';

import React, { useEffect, useState } from 'react';
import { useHabit } from '../stores/use-habit';
import Habit from './Habit';
import HabitSkeleton from './HabitSkeleton';

export default function HabitList() {
    const { fetchHabits, habits } = useHabit();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const userId = localStorage.getItem('ID'); // Retrieve the userId from local storage

        if (userId) {
            fetchHabits(userId).catch((err) =>
                console.error("Error fetching habits:", err)
            ).finally(() => setLoading(false));
        } else {
            console.error("User ID not found in local storage.");
            setLoading(true);
        }
    }, []);


    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                    <HabitSkeleton key={index} />
                ))}
            </div>
        );
    }



    if (!habits?.length) {
        return (
            <div className="text-white text-center py-8">
                No habits found. Create your first habit to get started!
            </div>
        );
    }

    return (
        <div className='space-y-4'>
            {habits.map((habit) => (
                <Habit key={habit.id} habit={habit} editable={true} />
            ))}
        </div>
    );
}
