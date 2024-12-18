import React from 'react'
import Cube from './Cube'
import { getLastNDays } from '../utils/utils';
import { X } from 'lucide-react';

export default function Habit() {
    const year = getLastNDays(365);
    const today = new Date().toISOString();
    return (
        <div>
            <div className='flex flex-col gap-2 overflow-x-auto max-w-screen-md bg-slate-700 p-4 border border-slate-700 rounded-lg'>
                <div className='flex justify-between items-center'>
                    <h1 className=' text-white font-bold uppercase'>habit</h1>
                    <X className='text-white cursor-pointer' />
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
