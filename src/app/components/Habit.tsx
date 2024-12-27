import React from 'react'
import Cube from './Cube'
import { getLastNDays } from '../utils/utils';
import { DeleteModal } from './DeleteModal';
import { EditModal } from './EditModal';

export default function Habit({ habit }: { habit: { id: string, name: string } }) {
    const year = getLastNDays(365);
    const today = new Date().toISOString();
    console.log(habit.name)
    return (
        <div>
            <div className='flex flex-col gap-2 overflow-x-auto max-w-screen-sm bg-slate-700 p-4 border border-slate-700 rounded-lg '>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <h1 className=' text-white font-bold uppercase'>{habit.name}</h1>
                        <EditModal id={habit.id} name={habit.name} />
                    </div>
                    <DeleteModal id={habit.id} />
                </div>

                <div
                    className='flex flex-row gap-2 overflow-x-auto max-w-screen-md scrollbar  scrollbar-track-slate-700 scrollbar-thumb-slate-500 '
                    ref={(el) => {
                        if (el) {
                            const currentMonth = new Date().getMonth();
                            // Each month section is roughly 64px (w-16) plus gap
                            const scrollPosition = (currentMonth * 68);
                            el.scrollLeft = scrollPosition;
                        }
                    }}
                >
                    {year.map((index) => (
                        <div key={index.month} className="flex-shrink-0 w-16 pb-2">
                            <h2 className='text-white font-bold uppercase mb-2'>{index.monthText}</h2>
                            <div className="grid grid-cols-4 gap-1 ">
                                {index.dates.map((date) => (
                                    <div key={date}>
                                        <Cube date={date} today={today}></Cube>
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
