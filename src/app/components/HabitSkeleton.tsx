'use client'
import React from 'react'

export default function HabitSkeleton() {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col gap-2 w-full max-w-[18rem] sm:max-w-[24rem] md:max-w-screen-md p-4 border border-c1-lighter rounded-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center justify-between w-full">
                        <div className="h-6 w-32 bg-gray-700 rounded"></div>
                        <div className="flex flex-row gap-4">
                            <div className="h-6 w-6 bg-gray-700 rounded"></div>
                            <div className="h-6 w-6 bg-gray-700 rounded"></div>
                            <div className="h-6 w-6 bg-gray-700 rounded"></div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row p-2 gap-2 overflow-x-auto max-w-screen-md scrollbar scrollbar-track-c1-light scrollbar-thumb-c1-lighter">
                    {[...Array(12)].map((_, index) => (
                        <div key={index} className="flex-shrink-0 w-16 pb-2">
                            <div className="h-4 w-12 bg-gray-700 rounded mb-2"></div>
                            <div className="grid grid-cols-4 gap-1">
                                {[...Array(32)].map((_, cubeIndex) => (
                                    <div
                                        key={cubeIndex}
                                        className="size-4 bg-gray-700 rounded-sm"
                                    ></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
