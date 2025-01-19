'use client'
import React from 'react'
import { PompSettingsModal } from './PomoSettingsModal';

export default function Pomo() {
    const [mins, setMins] = React.useState<number>(25);
    const [secs, setSecs] = React.useState<number>(0);
    const [breakTime, setBreakTime] = React.useState<number>(5);
    const [workTime, setWorkTime] = React.useState<number>(25); // New state for custom work time
    const [isActive, setIsActive] = React.useState<boolean>(false);
    const [isBreak, setIsBreak] = React.useState<boolean>(false);

    React.useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive) {
            interval = setInterval(() => {
                if (secs === 0) {
                    if (mins === 0) {
                        setIsActive(false);
                        if (!isBreak) {
                            setMins(breakTime);
                            setIsBreak(true);
                        } else {
                            setMins(workTime) // Use workTime instead of hardcoded 25
                            setIsBreak(false);
                        }
                    } else {
                        setMins(mins - 1);
                        setSecs(59);
                    }
                } else {
                    setSecs(secs - 1);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, mins, secs, isBreak, workTime]); // Added workTime to dependencies

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setMins(workTime); // Use workTime instead of hardcoded 25
        setSecs(0);
        setBreakTime(5);
        setIsBreak(false);
    };

    const getColor = () => {
        const totalSeconds = mins * 60 + secs;
        const initialMinutes = isBreak ? breakTime : workTime; // Use workTime instead of 25
        const maxSeconds = initialMinutes * 60;
        const ratio = totalSeconds / maxSeconds;

        // Start from green (120) and go to red (0)
        const hue = Math.floor(ratio * 120);
        return `hsl(${hue}, 80%, 50%)`;
    };

    const timerStyle = {
        color: isActive ? getColor() : 'inherit'
    };

    return (
        <div className='flex flex-col items-center text-2xl md:text-4xl lg:text-6xl font-bold pt-14'>
            <p className='mb-8 md:mb-12'>pomodoro</p>
            <div className='flex flex-col items-center mb-8 md:mb-12'>
                <div>
                    <p style={timerStyle} className='text-center'>{mins === 0 ? '00' : mins} : {secs === 0 ? '00' : secs}</p>
                    <p className='text-center text-2xl md:text-4xl lg:text-6xl mt-4 '>{isBreak ? 'break' : 'work'} time</p>
                </div>
            </div>
            <div className='flex flex-row gap-8 md:gap-12 items-center justify-center mb-2 md:mb-4'>
                <button
                    className='hover:scale-105 transition-transform'
                    onClick={() => toggleTimer()}
                >
                    {isActive ? 'pause' : 'start'}
                </button>
                <button
                    className='hover:scale-105 transition-transform'
                    onClick={() => resetTimer()}
                >
                    reset
                </button>
                <button
                    className='hover:scale-105 transition-transform'
                    onClick={() => {
                        setIsActive(false);
                        if (!isBreak) {
                            setMins(breakTime);
                            setIsBreak(true);
                        } else {
                            setMins(workTime);
                            setIsBreak(false);
                        }
                        setSecs(0);
                    }}
                >
                    skip
                </button>
            </div>
            <div className='mt-2'>
                <PompSettingsModal setMins={setMins} setSecs={setSecs} setBreakTime={setBreakTime} setWorkTime={setWorkTime} /> {/* Added setWorkTime prop */}
            </div>
        </div>
    )
}