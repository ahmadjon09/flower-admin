import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import {
  UserCheck,
  Package,
  Users,
  SlidersHorizontalIcon,
  PanelRightClose,
  PanelRightOpen,
  MapPinPlus
} from 'lucide-react'
import { ContextData } from '../Context/Context'
export const Sidebar = () => {
  const { sideBar, setSideBar } = useContext(ContextData)

  return (
    <aside
      className={`bg-pink-900 h-screen transition-all duration-300 ease-in-out relative ${
        sideBar ? 'w-[250px]' : 'w-[60px]'
      }`}
    >
      <div className='flex absolute w-full p-3 justify-end text-yellow-500'>
        <button onClick={() => setSideBar(!sideBar)}>
          {sideBar ? <PanelRightOpen /> : <PanelRightClose />}
        </button>
      </div>
      <ul
        className={`h-full flex flex-col sidebar ${
          sideBar ? 'px-3' : ''
        } py-10`}
      >
        <li>
          <NavLink
            to={'/'}
            className='flex items-center gap-2 text-xl text-yellow-500 p-5'
          >
            <SlidersHorizontalIcon />
            {sideBar ? 'Carousel' : null}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/admin'}
            className='flex items-center gap-2 text-xl text-yellow-500 p-5'
          >
            <UserCheck />
            {sideBar ? 'Admins' : null}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/product'}
            className='flex items-center gap-2 text-xl text-yellow-500 p-5'
          >
            <Package />
            {sideBar ? 'Products' : null}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/teams'}
            className='flex items-center gap-2 text-xl text-yellow-500 p-5'
          >
            <Users />
            {sideBar ? 'Teams' : null}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/map'}
            className='flex items-center gap-2 text-xl text-yellow-500 p-5'
          >
            <MapPinPlus />
            {sideBar ? 'Map' : null}
          </NavLink>
        </li>
      </ul>
    </aside>
  )
}
