'use client';
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export function CreateModal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div className='p-4'>
            <button
                onClick={openModal}
                className=" text-white font-bold lowercase rounded hover:text-gray-400 transition-colors"
            >
                <div className='flex items-center gap-2 px-48 py-8 bg-slate-500 max-w-screen-md rounded-md'>
                    <p className='text-2xl'>Create Habit</p>
                </div>
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 flex justify-center items-center"
                    onClick={closeModal}
                >
                    <div
                        className=" bg-gray-800 rounded-lg shadow-xl w-96 max-w-full p-6 relative space-y-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="flex justify-center text-md font-bold mb-4 text-white">
                            Name of habit?
                        </h2>
                        <div className='flex gap-2 justify-center items-center'>
                            <input type="text" className='px-4 py-2 text-black font-bold rounded transition-colors' placeholder="Habit name" name='id' />
                            <button type='submit' className='px-4 py-2 text-white bg-gray-500 font-bold lowercase rounded hover:text-gray-400 transition-colors' onClick={closeModal}>Add</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
