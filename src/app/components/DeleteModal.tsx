'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';

export function DeleteModal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div >
            <button
                onClick={openModal}
                className=" text-white font-bold lowercase rounded hover:text-gray-400 transition-colors"
            >
                <X className='text-white cursor-pointer' />
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
                            Are you sure you want to delete this habit?
                        </h2>
                        <div className='flex gap-2 justify-center items-center'>

                            <button type='submit' className='px-4 py-2 text-white bg-red-600 font-bold lowercase rounded hover:text-gray-400 transition-colors' onClick={closeModal}>Confirm</button>
                            <button type='submit' className='px-4 py-2 text-white bg-gray-500 font-bold lowercase rounded hover:text-gray-400 transition-colors' onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
