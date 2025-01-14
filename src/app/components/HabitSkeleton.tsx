import React from 'react'

export default function HabitSkeleton() {
    return (
        <div className="w-full max-w-[18rem] sm:max-w-[24rem] md:max-w-screen-md p-4 border border-c1-lighter rounded-lg animate-pulse">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                    <div className="h-6 w-32 bg-gray-700 rounded"></div>
                    <div className="flex flex-row gap-4">
                        <div className="h-6 w-20 bg-gray-700 rounded"></div>
                    </div>
                </div>
                <div className="h-6 w-6 bg-gray-700 rounded"></div>
            </div>
            <div className="flex flex-row gap-2 overflow-x-hidden">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="flex-shrink-0 w-16 pb-2">
                        <div className="h-4 w-12 bg-gray-700 rounded mb-2"></div>
                        <div className="grid grid-cols-4 gap-1">
                            {[...Array(12)].map((_, cubeIndex) => (
                                <div
                                    key={cubeIndex}
                                    className="w-3 h-3 bg-gray-700 rounded"
                                ></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
