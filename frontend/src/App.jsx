import React from 'react'
import Weather from './components/weather/Weather'
import Calender from './components/calender/Calender'
import Todo from './components/todo/Todo'
import PomoDoro from './components/pomodoro/PomoDoro'

const App = () => {
  return (
    <div className='max-w-[1600px] mx-auto  h-screen  p-4 items-center gap-5 justify-between flex'>
      <Weather />
      <Calender />
      <Todo />
      <PomoDoro />
    </div>
  )
}

export default App