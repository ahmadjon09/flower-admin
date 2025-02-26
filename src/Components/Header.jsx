import React from 'react'
import Logo from '../data/logo.png'
import { Menu } from 'lucide-react'
export const Header = () => {
  return (
    <nav className='w-full h-[80px] bg-pink-400 flex items-center justify-around'>
      <div className='flex items-center justify-center relative z-50 w-full h-full'>
        <img src={Logo} alt='Logo' className='object-cover h-full' />
        <span className='font-oi -right-10 top-5 text-xl text-pink-700'>
          Flowers
        </span>
      </div>
    </nav>
  )
}
