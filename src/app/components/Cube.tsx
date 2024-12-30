'use client'
import React, { useCallback, useEffect, useMemo } from 'react'
import { cn } from '../utils/utils';
import { useHabit } from '../stores/use-habit';

interface CompletionDate {
    id: string;
    completedDate: Date;
}

export default function Cube({ id, date, today, completions }: { id: string, date: string, today: string, completions: CompletionDate[] }) {
    const curr = useMemo(() => new Date(date).toISOString().slice(0, 10), [date]);
    const { toggleCompletion } = useHabit();

    const todayNoti = useMemo(() => {
        return today.slice(0, 10) === curr
    }, [today, curr])

    const isCompleted = useMemo(() => {
        return completions?.some(completion =>
            new Date(completion.completedDate).toISOString().slice(0, 10) === curr
        ) || false
    }, [completions, curr])

    const handleClick = useCallback(async () => {
        await toggleCompletion(id, date)
    }, [toggleCompletion, id, date])

    return (
        <div
            className={cn("border-white size-4 cursor-pointer rounded-sm border-[1px] border-transparent"
                , {
                    "bg-gray-400": !isCompleted,
                    "bg-green-400": isCompleted,
                    "border-white-700": todayNoti,
                }
            )}
            onClick={handleClick}
        >
        </div>
    )
}
