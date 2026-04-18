import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

const WORK_MINUTES = 25;

const PomoDoro = () => {
    const [timeLeft, setTimeLeft] = useState(WORK_MINUTES * 60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(prev => !prev);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(WORK_MINUTES * 60);
    };

    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    const totalSeconds = WORK_MINUTES * 60;
    const progress = timeLeft / totalSeconds;
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <div className="relative flex h-full max-h-[380px] flex-col items-center justify-between rounded-[2rem] bg-[var(--surface-container-lowest)] p-5 shadow-[var(--shadow-focus)]">
            <div className="absolute inset-x-6 top-6 h-24 rounded-[2rem] bg-[var(--surface-container-low)] blur-2xl opacity-50" />
            <div className="relative z-10 w-full flex flex-col flex-1">
                <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2 rounded-full bg-[var(--surface-container-low)] px-3 py-2 text-[var(--on-surface-variant)]">
                        <Timer size={14} />
                        <span className="text-[0.6rem] uppercase tracking-[0.35em]">Focus session</span>
                    </div>
                    <span className="rounded-full bg-[var(--surface-container-low)] px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">
                        {WORK_MINUTES} min
                    </span>
                </div>

                <div className="relative mx-auto my-auto flex h-[120px] w-[120px] items-center justify-center">
                    <svg width="120" height="120" className="-rotate-90">
                        <circle
                            cx="60"
                            cy="60"
                            r={radius}
                            fill="none"
                            stroke="var(--surface-container-low)"
                            strokeWidth="12"
                        />
                        <circle
                            cx="60"
                            cy="60"
                            r={radius}
                            fill="none"
                            stroke="var(--primary)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <p className="text-3xl font-semibold tracking-tight text-[var(--on-surface)] tabular-nums">
                            {minutes}:{seconds}
                        </p>
                        <span className="mt-1 text-[0.6rem] uppercase tracking-[0.3em] text-[var(--on-surface-variant)]">
                            {isActive ? 'Running' : 'Paused'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex w-full items-center justify-between gap-3">
                <button
                    onClick={resetTimer}
                    className="inline-flex items-center justify-center rounded-full bg-[var(--surface-container-low)] p-3 text-[var(--on-surface-variant)] transition hover:bg-[var(--surface-container-lowest)]"
                >
                    <RotateCcw size={16} strokeWidth={2.5} />
                </button>
                <button
                    onClick={toggleTimer}
                    className="flex-1 inline-flex items-center justify-center rounded-full py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(0,33,15,0.12)] transition hover:scale-[1.02] active:scale-[0.98] btn-primary"
                >
                    {isActive ? 'Pause' : 'Start focus'}
                </button>
            </div>
        </div>
    );
};

export default PomoDoro;
