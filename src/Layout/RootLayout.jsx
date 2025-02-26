import React, { useContext } from 'react'
import { Header } from '../Components/Header'
import { Sidebar } from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'
import { ContextData } from '../Context/Context'

export const RootLayout = () => {
  const { sideBar } = useContext(ContextData)
  return (
    <div className='h-screen overflow-hidden'>
      <Header />
      <div className={sideBar ? 'open-grid' : 'close-grid'}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}
