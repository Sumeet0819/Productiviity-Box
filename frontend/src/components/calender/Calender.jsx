import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const Calender = () => {
    // State to track the current live time, updating every second to reflect real life
    const [currentTime, setCurrentTime] = useState(new Date());
    // State to track which month/year the user is currently viewing in the calendar grid (allows navigating away from current month without changing the clock)
    const [viewDate, setViewDate] = useState(new Date());

    // Effect hook to run a clock timer continuously in the background
    useEffect(() => {
        // Set an interval that triggers every 1000ms (1 second)
        const timer = setInterval(() => {
            setCurrentTime(new Date()); // Update currentTime state to the new exact time
        }, 1000);

        // Cleanup function to clear the interval when the component is unmounted
        // This prevents memory leaks natively in React
        return () => clearInterval(timer);
    }, []);

    // Extract the currently viewed month and year (0-indexed: 0 = Jan, 11 = Dec)
    const currentMonth = viewDate.getMonth();
    const currentYear = viewDate.getFullYear();

    // Trick to get total days in a month: Use `day=0` of the *next* month 
    // Example: new Date(2026, currentMonth + 1, 0) gives the last day of the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Find what day of the week the 1st of the month lands on (0 = Sunday, 1 = Monday...)
    // This is necessary to know how many empty blocks to put before starting the grid
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    // Handlers for navigating months backward and forward
    const handlePrevMonth = () => {
        // Javascript's Date automatically handles rolling back a year if currentMonth - 1 is negative (< January)
        setViewDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
        // Automatically rolls over to the next year if month + 1 exceeds December
        setViewDate(new Date(currentYear, currentMonth + 1, 1));
    };

    // Handler to easily jump straight back to whatever the current month is
    const resetToToday = () => {
        setViewDate(new Date());
    };

    // Check if the rendered day in the loop is the truly active "today" based on the ticking clock.
    const isRealTimeToday = (day) => {
        return day === currentTime.getDate()
            && currentMonth === currentTime.getMonth()
            && currentYear === currentTime.getFullYear();
    };

    const renderCalendarDays = () => {
        const days = [];

        // 1. Generate empty "spacer" blocks to align the 1st of the month under the correct day column
        // e.g., If the month starts on a Tuesday (day 2), we add 2 empty div blocks (for Sunday & Monday)
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="w-9 h-9"></div>);
        }

        // 2. Generate the actual day blocks for the entire month
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = isRealTimeToday(day);

            // Assign specific Tailwind classes dynamically based on whether it is today
            const todayClass = isToday
                ? "bg-orange-400 border-orange-400 text-white font-bold shadow-md shadow-orange-400/40" // Active "today" styling
                : "bg-white hover:bg-slate-50 border-slate-100 text-slate-500 font-medium"; // Default unselected styling

            days.push(
                <div key={day} className="relative flex items-center justify-center w-9 h-9">
                    {/* The day circle itself */}
                    <div className={`w-8 h-8 flex flex-col items-center justify-center rounded-full transition-all cursor-pointer border z-10 relative ${todayClass}`}>
                        <span className="text-[13px]">{day}</span>
                        {/* Remove redundant dot, rely on the distinct orange background highlighting to indicate today */}
                    </div>
                </div>
            );
        }
        return days;
    };



    return (
        <div className="w-full min-w-[320px] min-h-[420px] flex flex-col p-8 bg-white rounded-[2rem] shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-slate-100 font-sans">

            {/* -- Calendar UI: Title and Controls Section -- */}
            <div className="flex w-full items-center mb-6">
                {/* Month/Year Title button overrides to return to current month/year on click */}
                <button onClick={resetToToday}
                    className="font-bold text-lg text-slate-800 hover:text-orange-400 transition-colors tracking-tight"
                >
                    {viewDate.toLocaleString('default', { month: 'long' })}, {currentYear}
                </button>

                {/* Flexible spacer pushes arrows all the way to the right */}
                <div className="flex-1" />

                {/* Previous / Next Iteration Controls */}
                <div className="flex gap-3 items-center">
                    <button onClick={handlePrevMonth} className="text-slate-300 hover:text-slate-500 transition-colors p-1">
                        <ChevronLeft size={20} strokeWidth={2.5} />
                    </button>
                    <button onClick={handleNextMonth} className="bg-orange-300 text-white rounded-full p-2 hover:bg-orange-400 transition-colors shadow-sm shadow-orange-300/40">
                        <ChevronRight size={18} strokeWidth={3} />
                    </button>
                </div>
            </div>

            {/* -- Calendar Grid Layout Section -- */}
            <div className="grid grid-cols-7 gap-y-2 gap-x-1.5 place-items-center mt-2">
                {/* Notice: Days of week header (Su, Mo, Tu...) intentionally removed to match the reference design 
                    but the mathematical column grid remains correctly aligned to Sunday=0. */}
                {/* Unpack the dynamically generated blank spaces and valid day boxes */}
                {renderCalendarDays()}
            </div>
        </div>
    );
};

export default Calender;