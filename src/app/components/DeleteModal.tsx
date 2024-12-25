'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useHabit } from '../stores/use-habit';

export function DeleteModal({ id }: { id: string }) {
    const { deleteHabit } = useHabit();
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleDelete = async () => {
        try {
            console.log("Attempting to delete habit with ID:", id);
            await deleteHabit(id);
            console.log("Habit deleted successfully");
            closeModal();
        } catch (error) {
            console.error("Error deleting habit:", error);
        }
    };

    return (
        <div>
            <button
                onClick={openModal}
                className="text-white font-bold lowercase rounded hover:text-gray-400 transition-colors"
            >
                <X className="text-white cursor-pointer" />
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-gray-800 rounded-lg shadow-xl w-96 max-w-full p-6 relative space-y-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="flex justify-center text-md font-bold mb-4 text-white">
                            Are you sure you want to delete this habit?
                        </h2>
                        <div className="flex gap-2 justify-center items-center">
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-red-600 font-bold lowercase rounded hover:text-gray-400 transition-colors"
                                onClick={handleDelete}
                            >
                                Confirm
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-gray-500 font-bold lowercase rounded hover:text-gray-400 transition-colors"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
