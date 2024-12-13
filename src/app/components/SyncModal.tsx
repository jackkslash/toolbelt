'use client';
import React, { useState } from 'react';
import { ClientIdInitializer } from './ClientIdInitializer';
import { Id } from './Id';

export function SyncModal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div className="p-4">
            <button
                onClick={openModal}
                className="px-4 py-2 text-white font-bold lowercase rounded hover:text-gray-400 transition-colors"
            >
                Sync
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
                        <h2 className="flex justify-center text-xl font-bold mb-4 text-white">
                            Sync
                        </h2>
                        <ClientIdInitializer />
                        <Id />
                        <br />
                        <div className='flex  gap-2'>
                            <input type="text" className='px-4 py-2 text-white font-bold rounded hover:text-gray-400 transition-colors' placeholder="Enter your ID" />
                            <button className='px-4 py-2 text-white font-bold lowercase rounded hover:text-gray-400 transition-colors'>Generate</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
