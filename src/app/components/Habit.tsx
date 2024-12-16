import React from 'react'
import Cube from './Cube'

export default function Habit() {

    const days = [1, 2, 3, 4, 5];

    return (
        <div>
            <h1 className=' text-white font-bold uppercase'>habit</h1>
            <div className="flex flex-row gap-1">
                {days.map((index) => (
                    <div key={index}>
                        <Cube></Cube>
                    </div>
                ))}

            </div>
        </div>

    )
}
