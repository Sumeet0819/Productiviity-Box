import React from 'react'
import Weather from '../components/weather/Weather'
import Todo from '../components/todo/Todo'
import PomoDoro from '../components/pomodoro/PomoDoro'
import SideBar from '../components/sidebar/SideBar'
import LastPlayedMusic from '../components/music/LastPlayedMusic'
import FinanceTracker from '../components/finance/FinanceTracker'
import Profile from '../components/profile/Profile'
import Calender from '../components/calender/Calender'

const Home = () => {
    return (
        <div className="flex min-h-screen bg-[var(--surface)] text-[var(--on-surface)]">
            {/* Outer Sidebar Navigation */}
            <div className="fixed inset-y-0 left-0 flex flex-col justify-center px-8 z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <SideBar />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col justify-center pl-[120px] pr-6 py-8">
                <div className="w-full max-w-[1800px] mx-auto">
                    <main className="space-y-10 min-w-0">
                        <header className="flex flex-col gap-4">
                            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">
                                Personal Command Center
                            </p>
                            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <h1 className="text-5xl font-bold tracking-tight text-[var(--on-surface)]">
                                        Productivity Box
                                    </h1>
                                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                                        Your unified hub for daily focus. Seamlessly track personal finances, manage daily objectives, check real-time weather, and align your workflow perfectly.
                                    </p>
                                </div>
                                <div className="inline-flex items-center rounded-full bg-[var(--surface-container-low)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">
                                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                </div>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-5">
                            <div className="flex xl:col-span-1 flex-col gap-6">
                                <Profile />
                                <div className="flex-1 min-h-0">
                                    <Calender />
                                </div>
                            </div>
                            <div className="flex xl:col-span-1 flex-col gap-6">
                                <Weather />
                                <div className="flex-1">
                                    <LastPlayedMusic />
                                </div>
                            </div>
                            <div className="flex xl:col-span-1 flex-col gap-6">
                                <FinanceTracker />
                                <div className="flex-1 min-h-0">
                                    <PomoDoro />
                                </div>
                            </div>
                            <div className="flex xl:col-span-2 flex-col">
                                <Todo />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Home