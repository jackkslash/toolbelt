'use client'
import React from 'react'
import { PompSettingsModal } from './PomoSettingsModal';

export default function Pomo() {
    const [mins, setMins] = React.useState<number>(25);
    const [secs, setSecs] = React.useState<number>(0);
    const [breakTime, setBreakTime] = React.useState<number>(5);
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
                            setMins(25)
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
    }, [isActive, mins, secs, isBreak]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setMins(25);
        setSecs(0);
        setBreakTime(5);
        setIsBreak(false);
    };

    return (
        <div className='text-xl font-bold'>
            <p className='text-center text-2xl font-bold'>Pomodoro Timer</p>
            <div className='flex flex-row gap-2 items-center justify-center'>
                <div>
                    <p className='text-center text-lg'> {mins === 0 ? '00' : mins} : {secs === 0 ? '00' : secs}</p>
                    <p className='text-center'>{isBreak ? 'Break' : 'Work'} Time</p>
                </div>
            </div>
            <div className='flex flex-row gap-4 items-center justify-center'>
                <button onClick={() => toggleTimer()}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button onClick={() => resetTimer()}>Reset</button>

            </div>
            <div className='flex flex-row gap-4 items-center justify-center'>
                <PompSettingsModal setMins={setMins} setSecs={setSecs} setBreakTime={setBreakTime} />

            </div>
        </div>
    )
}