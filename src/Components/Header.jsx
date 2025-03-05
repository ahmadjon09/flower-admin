import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './css/Header.css'
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className='h-[60px] bg-black relative'>
      <nav className={`h-full flex text-white items-center justify-center`}>
        <ul
          className={`h-full bg-black/95 headerLinks transition-all duration-300 ease-in-out ${
            isOpen
              ? 'top-0 left-0 w-[130px] z-[9999] gap-10 items-start justify-center'
              : '-left-full items-center justify-center gap-5'
          } flex p-5`}
        >
          <li>
            <NavLink to={'/'} className='text-white'>
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink to={'/admin'} className='text-white'>
              Admins
            </NavLink>
          </li>
          <li>
            <NavLink to={'/product'} className='text-white'>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to={'/teams'} className='text-white'>
              Teams
            </NavLink>
          </li>
          <li>
            <NavLink to={'/map'} className='text-white'>
              Locations
            </NavLink>
          </li>
        </ul>
        <button
          className='absolute headerBars top-4.5 right-2'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>
    </header>
  )
}
