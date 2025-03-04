import React from 'react'
import { Header } from '../Components/Header'
import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}
