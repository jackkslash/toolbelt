import { CreateModal } from '@/app/components/CreateModal'
import HabitList from '@/app/components/HabitList'
import React from 'react'


export default async function page() {
    return (
        <div>
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center overflow-y-auto">
                    <HabitList />
                    <CreateModal />
                </div>
            </div>
        </div>
    )
}
