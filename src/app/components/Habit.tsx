'use client'
import React, { useEffect } from 'react'
import Cube from './Cube'
import { getLastNDays } from '../utils/utils';
import { DeleteModal } from './DeleteModal';
import { EditModal } from './EditModal';
import Link from 'next/link';


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
    },
    editable: boolean
}

export default function Habit({ habit, editable }: HabitProps) {
    const year = getLastNDays(366);
    const today = new Date().toISOString();
    const hasScrolledRef = React.useRef(false);

    return (
        <div>
            <div className='flex flex-col gap-2 w-full max-w-[18rem] sm:max-w-[24rem] md:max-w-screen-md  p-4 border border-c1-lighter rounded-lg'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-4'>
                        <h1 className=' text-white font-bold uppercase mb-1'>{habit.name}</h1>
                        {editable && <div className='flex flex-row gap-4'>
                            <Link href={`/habit/${habit.id}`} className='text-white font-bold uppercase mb-1 font'>Analytics</Link>
                            <EditModal id={habit.id} name={habit.name} />
                        </div>

                        }

                    </div>
                    {editable && <DeleteModal id={habit.id} />}
                </div>

                <div
                    className='flex flex-row gap-2 overflow-x-auto max-w-screen-md scrollbar  scrollbar-track-c1-light scrollbar-thumb-c1-lighter '
                    ref={(el) => {
                        if (!hasScrolledRef.current && el) {
                            el.scrollLeft = el.scrollWidth;
                            hasScrolledRef.current = true;
                        }
                    }}

                >
                    {year.map((index) => (
                        <div key={index.month} className="flex-shrink-0 w-16 pb-2">
                            <h2 className='text-white text-xs font-bold uppercase mb-2'>{index.monthText}</h2>
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
