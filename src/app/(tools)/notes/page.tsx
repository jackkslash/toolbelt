import Editor from '@/app/components/Editor'
import NoteList from '@/app/components/NoteList'
import React from 'react'

export default function page() {
    return (
        <>
            <div className="flex flex-col items-center h-screen">
                <div className='flex flex-col gap-4 md:flex md:flex-row' >
                    <NoteList />
                    <Editor />
                </div>
            </div>

        </>
    )
}
