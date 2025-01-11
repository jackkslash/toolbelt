'use client';
import React, { useEffect, useState } from 'react';
import { useHabit } from '../stores/use-habit';
import Habit from './Habit';

interface AnalyticsProps {
    id: string;
}

export default function Analytics({ id }: AnalyticsProps) {
    const habit = useHabit((state) => state.getHabitById(id));

    const { fetchHabits } = useHabit();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = React.useState({
        currentStreak: 0,
        longestStreak: 0,
        monthConsistency: 0,
        weeklyAverage: 0
    });
    useEffect(() => {
        const userId = localStorage.getItem('ID');
        if (!userId) {
            console.error("User ID not found in local storage.");
            setLoading(false);
            return;
        }

        if (!habit) {
            fetchHabits(userId)
                .then(() => setLoading(false))
                .catch((err) => {
                    console.error("Error fetching habits:", err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [fetchHabits, habit]);

    useEffect(() => {
        if (!habit?.completions) return;

        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        let currentStreak = 0;
        const sortedCompletions = [...habit.completions].sort((a, b) =>
            new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
        );

        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < sortedCompletions.length; i++) {
            const completionDate = new Date(sortedCompletions[i].completedDate);
            completionDate.setHours(0, 0, 0, 0);

            const daysDiff = Math.floor((today.getTime() - completionDate.getTime()) / (1000 * 60 * 60 * 24));

            if (daysDiff === currentStreak) {
                currentStreak++;
            } else {
                break;
            }
        }

        const monthCompletions = habit.completions.filter(completion => {
            const completionDate = new Date(completion.completedDate);
            return completionDate.getMonth() === currentMonth &&
                completionDate.getFullYear() === currentYear;
        });

        const daysCompleted = monthCompletions.length;
        const weeksInMonth = Math.ceil(new Date(currentYear, currentMonth + 1, 0).getDate() / 7);
        const weeklyAvg = daysCompleted / weeksInMonth;
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const consistency = (daysCompleted / daysInMonth) * 100;

        setStats({
            currentStreak: currentStreak,
            longestStreak: currentStreak,
            monthConsistency: Math.round(consistency),
            weeklyAverage: Math.round(weeklyAvg * 10) / 10
        });
    }, [habit?.completions]);

    if (loading) {
        return <div className='flex flex-col gap-4 p-4 m-12 border border-slate-700 rounded-lg'></div>
    }

    if (!habit) {
        return <div>Habit not found</div>;
    }

    return (
        <div className='flex flex-col gap-4 p-4 m-12 border border-slate-700 rounded-lg items-center justify-center'>
            <p className='text-center text-xl font-bold'>{habit.name}</p>
            <div className='flex flex-col gap-4 m-12'>
                <Habit habit={habit} editable={false} />

            </div>
            <div className='flex flex-col items-center md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
                <div className='border border-slate-700 rounded-lg m-4 p-12'>
                    <strong>Completions:</strong> {habit.completions.length} times
                </div>
                <div className='border border-slate-700 rounded-lg p-12 m-4'>
                    <strong>Longest Streak:</strong> {stats.longestStreak} days
                </div>
                <div className='border border-slate-700 rounded-lg p-12 m-4'>
                    <strong>Month Consistency:</strong> {stats.monthConsistency}%
                </div>
                <div className='border border-slate-700 rounded-lg p-12 m-4'>
                    <strong>Weekly Average:</strong> {stats.weeklyAverage} times
                </div>
                <div className='border border-slate-700 rounded-lg p-12 m-4'>
                    <strong>Current Streak:</strong> {stats.currentStreak} days
                </div>
            </div>
        </div>
    );
}
