import React, { useState } from 'react'
import { Home, Calendar, CloudSun, Music, ListTodo, Wallet, Timer, Settings, LogOut } from 'lucide-react'

const SideBar = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const getIconClass = (tab) => `transition-all duration-300 cursor-pointer ${activeTab === tab
        ? 'text-[var(--primary)] drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)] scale-110'
        : 'text-[var(--on-surface-variant)] hover:text-[var(--primary)] opacity-60 hover:opacity-100 hover:scale-105'
        }`;


    return (
        <div className="space-y-6 h-[90vh] flex flex-col items-center justify-between">

            <div className='flex flex-col items-center justify-center gap-15 h-full'>
                <div className='flex flex-col items-center justify-between gap-8 rounded-[2rem] bg-[var(--surface-container-lowest)] p-4 shadow-[var(--shadow-focus)]'>
                    <Home size={24} onClick={() => setActiveTab('dashboard')} className={getIconClass('dashboard')} title="Dashboard" />
                    <Calendar size={24} onClick={() => setActiveTab('calendar')} className={getIconClass('calendar')} title="Calendar" />
                    <CloudSun size={24} onClick={() => setActiveTab('weather')} className={getIconClass('weather')} title="Weather" />
                    <Music size={24} onClick={() => setActiveTab('music')} className={getIconClass('music')} title="Music" />
                </div>
                <div className='flex flex-col items-center justify-between gap-8 rounded-[2rem] bg-[var(--surface-container-lowest)] p-4 shadow-[var(--shadow-focus)]'>
                    <ListTodo size={24} onClick={() => setActiveTab('todo')} className={getIconClass('todo')} title="Todo" />
                    <Wallet size={24} onClick={() => setActiveTab('finance')} className={getIconClass('finance')} title="Finance" />
                    <Timer size={24} onClick={() => setActiveTab('pomodoro')} className={getIconClass('pomodoro')} title="Pomodoro" />
                </div>
            </div>
            <div className='flex flex-col items-center justify-between gap-5 rounded-[2rem] bg-[var(--surface-container-lowest)] p-4 shadow-[var(--shadow-focus)]'>
                <Settings size={24} onClick={() => setActiveTab('settings')} className={getIconClass('settings')} title="Settings" />
                <LogOut size={24} onClick={() => setActiveTab('logout')} className={getIconClass('logout')} title="Logout" />
            </div>
        </div>
    )
}

export default SideBar