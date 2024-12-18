'use client';
import React, { useState } from 'react';
import { ClientIdInitializer } from './ClientIdInitializer';
import { Id } from './Id';
import { setClientId } from '../utils/utils';

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
                        <form className='flex gap-2' onSubmit={(e) => {
                            const inputElement = e.currentTarget.elements.namedItem('id') as HTMLInputElement;

                            if (!inputElement?.value) {
                                e.preventDefault()
                                return
                            } else {
                                setClientId(inputElement?.value)
                                closeModal()
                            }
                        }}>
                            <input type="text" className='px-4 py-2 text-black font-bold rounded transition-colors' placeholder="Enter your ID" name='id' />
                            <button type='submit' className='px-4 py-2 text-white font-bold lowercase rounded hover:text-gray-400 transition-colors'>Generate</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
