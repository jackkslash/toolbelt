'use client'
import React from 'react'
import { cn } from '../utils/utils';

export default function Cube({ date, today }: { date: string, today: string }) {
    const [gotLogged, setGotLogged] = React.useState(false);

    return (
        <div
            className={cn("border-white size-4 cursor-pointer rounded-sm border-[1px] border-transparent"
                , {
                    "bg-gray-400": !gotLogged,
                    "bg-green-400": gotLogged,
                }
            )}
            onClick={() => {
                setGotLogged(!gotLogged);
            }}
        >
        </div>
    )
}
