'use client'
import React, { useEffect } from 'react'
import Cube from './Cube'
import { getLastNDays } from '../utils/utils';
import { DeleteModal } from './DeleteModal';
import { EditModal } from './EditModal';


interface Completion {
    id: string;
    completedDate: Date;
}

interface HabitProps {
    habit: {
        id: string;
        name: string;
        userId: string;
        createdAt: Date;
        completions: Completion[];
    }
}

export default function Habit({ habit }: HabitProps) {
    const year = getLastNDays(366);
    const today = new Date().toISOString();
    const hasScrolledRef = React.useRef(false);

    const [longestStreak, setLongestStreak] = React.useState(0);

    useEffect(() => {
        let currentStreak = 0;
        const sortedCompletions = [...habit?.completions || []].sort((a, b) =>
            new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
        );

        const today = new Date();
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

        setLongestStreak(currentStreak);
    }, [habit.completions]);


    return (
        <div>
            <div className='flex flex-col gap-2 overflow-x-auto max-w-72 md:max-w-screen-md bg-slate-700 p-4 border border-slate-700 rounded-lg '>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <h1 className=' text-white font-bold uppercase mb-1'>{habit.name}</h1>
                        <EditModal id={habit.id} name={habit.name} />
                    </div>
                    {/* <p className='text-white font-bold uppercase mb-1 font'>Longest Streak: {longestStreak} days</p> */}
                    <DeleteModal id={habit.id} />

                </div>

                <div
                    className='flex flex-row gap-2 overflow-x-auto max-w-screen-md scrollbar  scrollbar-track-slate-700 scrollbar-thumb-slate-500 '
                    ref={(el) => {
                        if (!hasScrolledRef.current && el) {
                            el.scrollLeft = el.scrollWidth;
                            hasScrolledRef.current = true;
                        }
                    }}

                >
                    {year.map((index) => (
                        <div key={index.month} className="flex-shrink-0 w-16 pb-2">
                            <h2 className='text-white font-bold uppercase mb-2'>{index.monthText}</h2>
                            <div className="grid grid-cols-4 gap-1 ">
                                {index.dates.map((date) => (
                                    <div key={date}>
                                        <Cube date={date} today={today} completions={habit.completions} id={habit.id}></Cube>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}
