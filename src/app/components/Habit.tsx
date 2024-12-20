import React from 'react'
import Cube from './Cube'
import { getLastNDays } from '../utils/utils';
import { DeleteModal } from './DeleteModal';

export default function Habit({ habit }: any) {
    const year = getLastNDays(365);
    const today = new Date().toISOString();
    console.log(habit.name)
    return (
        <div>
            <div className='flex flex-col gap-2 overflow-x-auto max-w-screen-md bg-slate-700 p-4 border border-slate-700 rounded-lg'>
                <div className='flex justify-between items-center'>
                    <h1 className=' text-white font-bold uppercase'>{habit.name}</h1>
                    <DeleteModal />

                </div>

                <div className='flex flex-row gap-2 overflow-x-auto max-w-screen-md'>
                    {year.map((index) => (
                        <div key={index.month} className="flex-shrink-0 w-16"> {/* Fixed width for each month */}
                            <h2 className='text-white font-bold uppercase mb-2'>{index.monthText}</h2>
                            <div className="grid grid-cols-4 gap-1 "> {/* Use grid to ensure cubes wrap neatly */}
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
