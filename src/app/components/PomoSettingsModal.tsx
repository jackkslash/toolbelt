'use client';
import { SettingsIcon } from 'lucide-react';
import React, { useState } from 'react';

export function PompSettingsModal({ setMins, setSecs, setBreakTime }: { setMins: React.Dispatch<React.SetStateAction<number>>, setSecs: React.Dispatch<React.SetStateAction<number>>, setBreakTime: React.Dispatch<React.SetStateAction<number>> }) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div className="p-4">
            <button
                onClick={openModal}
                className="px-4 py-2 text-white font-bold lowercase rounded hover:text-gray-400 transition-colors"
            >
                <SettingsIcon />
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
                            Settings
                        </h2>
                        <form className='flex flex-col gap-2' onSubmit={(e) => {
                            const inputElement = e.currentTarget.elements.namedItem('mins') as HTMLSelectElement;
                            const inputElement2 = e.currentTarget.elements.namedItem('breakTime') as HTMLSelectElement;
                            if (!inputElement?.value) {
                                e.preventDefault()
                                return
                            } else {
                                setMins(parseInt(inputElement?.value))
                                setBreakTime(parseInt(inputElement2?.value))
                                closeModal()
                            }
                        }}>
                            <label className='text-white font-bold'>Minutes</label>
                            <select name="mins" className='px-4 py-2 text-black font-bold rounded transition-colors'>
                                <option value="0">0</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="35">35</option>
                                <option value="40">40</option>
                                <option value="45">45</option>
                            </select>
                            <label className='text-white font-bold'>Break Time</label>
                            <select name="breakTime" className='px-4 py-2 text-black font-bold rounded transition-colors'>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                            </select>
                            <button type='submit' className='px-4 py-2 text-white font-bold lowercase rounded hover:text-gray-400 transition-colors'>Set</button>
                        </form>

                    </div>
                </div>
            )
            }
        </div >
    );
};
