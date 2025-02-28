import React, { useContext } from 'react'
import { Header } from '../Components/Header'
import { Sidebar } from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'
import { ContextData } from '../Context/Context'
import { SetAlertErr } from '../Components/SetAlertErr'
import { ConfirmAlert } from '../Components/ConfirmAlert'

export const RootLayout = () => {
  const { showConfirm, sideBar, setShowConfirm, showAlerterr, showAlertInfo } =
    useContext(ContextData)
  return (
    <div className='h-screen overflow-hidden'>
      <Header />
      {showConfirm && (
        <ConfirmAlert message={'Are you sure you want to delete this?'} />
      )}
      {showAlerterr && <SetAlertErr />}
      <div className={sideBar ? 'open-grid' : 'close-grid'}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}
