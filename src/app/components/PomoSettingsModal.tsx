'use client';
import { SettingsIcon } from 'lucide-react';
import React, { useState } from 'react';

export function PompSettingsModal({
    setMins,
    setSecs,
    setBreakTime,
    setWorkTime
}: {
    setMins: React.Dispatch<React.SetStateAction<number>>,
    setSecs: React.Dispatch<React.SetStateAction<number>>,
    setBreakTime: React.Dispatch<React.SetStateAction<number>>,
    setWorkTime: React.Dispatch<React.SetStateAction<number>>
}) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div className="p-4">
            <button
                onClick={openModal}
                className="p-2 text-white rounded-full hover:bg-c1-light transition-all duration-200"
            >
                <SettingsIcon className="w-6 h-6" />
            </button>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 flex justify-center items-center backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <div
                        className="bg-c1 border border-c1-light rounded-xl shadow-2xl w-96 max-w-full p-8 relative space-y-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold text-center text-white mb-6">
                            Settings
                        </h2>
                        <form className='flex flex-col gap-4' onSubmit={(e) => {
                            e.preventDefault();
                            const inputElement = e.currentTarget.elements.namedItem('mins') as HTMLSelectElement;
                            const inputElement2 = e.currentTarget.elements.namedItem('breakTime') as HTMLSelectElement;
                            if (!inputElement?.value) {
                                return;
                            }
                            const newTime = parseInt(inputElement?.value);
                            setMins(newTime);
                            setWorkTime(newTime);
                            setBreakTime(parseInt(inputElement2?.value));
                            setSecs(0);
                            closeModal();
                        }}>
                            <div className="space-y-2">
                                <label className='text-white font-medium block'>Work Time</label>
                                <select name="mins" className='w-full px-4 py-2 bg-c1-light text-white rounded-lg border border-c1-lighter focus:outline-none focus:border-white transition-colors'>
                                    {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45].map(value => (
                                        <option key={value} value={value}>{value}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className='text-white font-medium block'>Break Time</label>
                                <select name="breakTime" className='w-full px-4 py-2 bg-c1-light text-white rounded-lg border border-c1-lighter focus:outline-none focus:border-white transition-colors'>
                                    {[5, 10, 15, 20, 25].map(value => (
                                        <option key={value} value={value}>{value}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type='submit'
                                className='w-full pb-4 bg-c1-light text-white font-bold rounded-lg hover:bg-c1-lighter transition-colors duration-200'
                            >
                                set
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};