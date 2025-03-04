import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <header className='h-[60px] bg-black'>
      <nav className='h-full'>
        <ul className={`h-full flex items-center justify-center gap-5`}>
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
              Map
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
