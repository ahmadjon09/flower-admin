import React from 'react'
import { Link } from 'react-router-dom'
import errPage from '../data/404.png'
export const Error = () => {
  return (
    <section className='h-screen'>
      <div className='container h-full flex items-center justify-center flex-col gap-5'>
        <img className='w-[300px] object-cover' src={errPage} alt='err' />
        <Link
          to={'/'}
          className='bg-pink-700 py-2 px-5 font-bold text-white rounded-3xl'
        >
          Go Home
        </Link>
      </div>
    </section>
  )
}
