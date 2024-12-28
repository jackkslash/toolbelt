'use client';
import React, { useState } from 'react';
import { useHabit } from '../stores/use-habit';
import { Edit } from 'lucide-react';

export function EditModal({ id, name }: { id: string, name: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const { updateHabit } = useHabit();

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);


    return (
        <div>
            <button
                onClick={openModal}
                className=" text-white font-bold lowercase rounded hover:text-gray-400 transition-colors"
            >
                <Edit className='text-white cursor-pointer' />
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
                            <input type="text" className='px-4 py-2 text-black font-bold rounded transition-colors' placeholder={name} name='name' />
                            <button type='submit' className='px-4 py-2 text-white bg-gray-500 font-bold lowercase rounded hover:text-gray-400 transition-colors' onClick={(e) => {
                                const inputElement = (e.currentTarget.parentElement?.querySelector('input[name="name"]') as HTMLInputElement);
                                closeModal()
                                updateHabit(
                                    id,
                                    inputElement?.value
                                )
                            }}>Update</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
