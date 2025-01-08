'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from "next/navigation";
import { SyncModal } from './SyncModal';

export default function Header() {
    const isHome = usePathname() === '/';

    return (
        <div className={`flex flex-col items-center justify-center gap-4 text-white w-full
            ${isHome ? 'h-screen' : 'pt-8'}`}>
            <div className="flex flex-row items-center justify-center gap-4">
                <Link href="/">
                    <h1 className="text-4xl md:text-6xl font-bold text-white pl-4">toolbelt</h1>
                </Link>
                <div className="flex flex-col gap-2 p-8 text-white font-bold">
                    <Link className="hover:text-gray-400" href="/habit">
                        habit </Link>
                    <Link className="hover:text-gray-400" href="/notes">
                        notes </Link>
                    <Link className="hover:text-gray-400" href="/pomodoro">
                        pomodoro </Link>
                </div>
            </div>
            {isHome && <SyncModal />}
        </div>
    )
}
