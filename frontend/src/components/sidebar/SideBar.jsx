import React from 'react'
import Profile from '../profile/Profile'
import Calender from '../calender/Calender'

const SideBar = () => {
    return (
        <div className='col-span-1 grid grid-rows-2 gap-5 p-2'>
            <div className='rounded-2xl'>
                <Profile />
            </div>

            <div className='rounded-2xl'>
                <Calender />
            </div>
        </div>
    )
}

export default SideBar