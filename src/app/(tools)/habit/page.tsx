import { CreateModal } from '@/app/components/CreateModal'
import HabitList from '@/app/components/HabitList'
import Link from 'next/link'
import React from 'react'


export default async function page() {
    return (
        <div>
            <div className="flex flex-col items-center bg-gray-900 min-h-screen">
                <div className="flex flex-row items-center justify-center gap-4 text-white py-8">
                    <Link href="/">
                        <h1 className="text-6xl font-bold text-white">toolbelt</h1>
                    </Link>
                    <div className="flex flex-col gap-2 p-8 text-white font-bold">
                        <Link className="hover:text-gray-400" href="/notes">
                            notes </Link>
                        <Link className="hover:text-gray-400" href="/pomodoro">
                            pomodoro </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center w-full overflow-y-auto">
                    <HabitList />
                    <CreateModal />
                </div>
            </div>
        </div>
    )
}
