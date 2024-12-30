'use client'
import React, { useEffect } from 'react'
import { cn } from '../utils/utils';

interface CompletionDate {
    id: string;
    completedDate: Date;
}

export default function Cube({ date, today, completions }: { date: string, today: string, completions: CompletionDate[] }) {
    const [gotLogged, setGotLogged] = React.useState(false);
    const [isCompleted, setIsCompleted] = React.useState(false);
    const curr = new Date(date).toISOString().slice(0, 10)


    useEffect(() => {
        const foundCompletion = completions.find((completion) =>
            new Date(completion.completedDate).toISOString().slice(0, 10) === curr
        );
        setIsCompleted(!!foundCompletion); // Update state only once when `completions` or `date` changes
    }, [completions, curr]);

    return (
        <div
            className={cn("border-white size-4 cursor-pointer rounded-sm border-[1px] border-transparent"
                , {
                    "bg-gray-400": !gotLogged,
                    "bg-green-400": gotLogged || isCompleted,
                }
            )}
            onClick={() => {
                setGotLogged(!gotLogged)
                console.log("clicked", gotLogged)
            }}
        >
        </div>
    )
}
