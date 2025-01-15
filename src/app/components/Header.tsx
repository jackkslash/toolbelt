'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from "next/navigation";
import { SyncModal } from './SyncModal';

export default function Header() {
    const isHome = usePathname() === '/';
    const navItems = [
        { name: 'Habit', href: '/habit' },
        { name: 'Notes', href: '/notes' },
        { name: 'Pomodoro', href: '/pomodoro' },
    ]
    return (
        <div className={`flex flex-col items-center justify-center gap-4 text-white w-full
            ${isHome ? 'h-screen' : 'pt-8'}`}>
            <div className="flex flex-row items-center justify-center gap-4">
                <Link href="/">
                    <h1 className="text-4xl md:text-6xl font-bold text-white pl-4">toolbelt</h1>
                </Link>
                <div className="flex flex-col gap-2 p-8 text-white font-bold">

                    {
                        navItems.map((item) => (
                            <Link className="hover:text-gray-400 lowercase" key={item.name} href={item.href}>
                                {item.name} </Link>
                        ))
                    }
                </div>
            </div>
            {isHome && <SyncModal />}
        </div>
    )
}
