import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

const WORK_MINUTES = 25;

const PomoDoro = () => {
    const [timeLeft, setTimeLeft] = useState(WORK_MINUTES * 60);
    const [isActive, setIsActive] = useState(false);

    // Timer countdown logic
    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => time - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            // Optionally could place an Audio bell sound here when time completes!
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    // Play & Pause
    const toggleTimer = () => setIsActive(!isActive);

    // Hard reset back to full duration
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(WORK_MINUTES * 60);
    };
    
    // Formatting MM:SS securely with padding
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');

    // Maths for the circular SVG progress ring tracking the seconds
    const totalSeconds = WORK_MINUTES * 60;
    const progress = timeLeft / totalSeconds; // Progress slides from 1 down to 0
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <div className="w-full max-w-[320px] min-h-[420px] flex flex-col p-8 bg-white rounded-[2rem] shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-slate-100 font-sans">
            {/* -- Header -- */}
            <div className="flex w-full items-center gap-3 mb-6">
                <div className="bg-slate-50 p-2.5 rounded-2xl text-slate-800 border border-slate-100 shadow-sm">
                    <Timer size={20} strokeWidth={2.5} />
                </div>
                <h2 className="font-bold text-lg text-slate-800 tracking-tight">Focus</h2>
            </div>

            {/* -- Beautiful SVG Timer Circle -- */}
            <div className="relative flex justify-center items-center mb-10 w-full flex-1">
                {/* SVG flipped -90deg so the progress draws from the exact top (12 o'clock) */}
                <svg width="210" height="210" className="-rotate-90 drop-shadow-sm">
                    {/* Background Track Circle */}
                    <circle
                        cx="105" cy="105" r={radius}
                        fill="none"
                        stroke="#f8fafc" // very light slate-50 acting as a soft track
                        strokeWidth="10"
                    />
                    {/* Active Colored Progress Loop */}
                    <circle
                        cx="105" cy="105" r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeLinecap="round"
                        className={`transition-all duration-1000 ease-linear text-orange-400`}
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: strokeDashoffset
                        }}
                    />
                </svg>

                {/* Big Time Display nestled perfectly inside the ring */}
                <div className="absolute flex flex-col items-center justify-center mt-1">
                    <span className="text-4xl font-light tracking-tight text-slate-800 tabular-nums">
                        {minutes}:{seconds}
                    </span>
                    <span className={`text-[10px] font-bold tracking-[0.2em] uppercase mt-1 transition-colors text-orange-400 ${isActive ? 'animate-pulse' : 'opacity-70'}`}>
                        {isActive ? 'Running' : 'Paused'}
                    </span>
                </div>
            </div>

            {/* -- Main Play/Pause & Reset Controls -- */}
            <div className="flex justify-center items-center gap-8 mt-auto w-full">
                <button 
                    onClick={resetTimer} 
                    className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors rounded-2xl active:bg-slate-100"
                >
                    <RotateCcw size={24} strokeWidth={2.5} />
                </button>
                <button 
                    onClick={toggleTimer}
                    className={`flex items-center justify-center w-[48px] h-[48px] rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95 bg-orange-400 hover:bg-orange-500 shadow-orange-400/40`}
                >
                    {isActive 
                        ? <Pause size={24} strokeWidth={3} className="fill-current" /> 
                        : <Play size={24} strokeWidth={3} className="fill-current ml-1" />
                    }
                </button>
            </div>
        </div>
    );
};

export default PomoDoro;
