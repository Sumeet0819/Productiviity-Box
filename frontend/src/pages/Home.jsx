import React from 'react'
import Weather from '../components/weather/Weather'
import Calender from '../components/calender/Calender'
import Todo from '../components/todo/Todo'
import PomoDoro from '../components/pomodoro/PomoDoro'
import SideBar from '../components/sidebar/SideBar'

const Home = () => {
    return (
        <div className='grid grid-cols-5 gap-2 p-4 h-screen'>
             <div className='col-span-1 grid grid-rows-2 gap-5 p-2'>
                <div className='rounded-2xl'>
                    <SideBar />
                </div>
            </div>
            <div className='col-span-1 grid grid-rows-2 gap-5 p-2'>
                <div className='rounded-2xl'>
                    <Weather />
                </div>
            </div>
            <div className='rounded-2xl '>
                <Todo />
            </div>
            <div className='col-span-2 rounded-2xl '>
                <PomoDoro />
            </div>
            <div className='rounded-2xl '>
                {/* Additional widget slot */}
            </div>
            <div className='rounded-2xl '>
                {/* Additional widget slot */}
            </div>
            <div className='rounded-2xl '>
                {/* Additional widget slot */}
            </div>
            <div className='rounded-2xl '>
                {/* Additional widget slot */}
            </div>
        </div>
    )
}

export default Home