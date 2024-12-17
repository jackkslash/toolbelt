import React from 'react'
import Cube from './Cube'
import { getLastNDays } from '../utils/utils';

export default function Habit() {
    const year = getLastNDays(365);
    const today = new Date().toISOString();
    return (
        <div>
            <h1 className=' text-white font-bold uppercase'>habit</h1>

            <div className='flex flex-row gap-4 overflow-x-auto max-w-screen-md'>
                {year.map((index) => (
                    <div key={index.month} className="flex-shrink-0 w-32"> {/* Fixed width for each month */}
                        <h2 className='text-white font-bold uppercase mb-2'>{index.monthText}</h2>
                        <div className="grid grid-cols-7 gap-1"> {/* Use grid to ensure cubes wrap neatly */}
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

    )
}
