import React from 'react'
import { Link } from 'react-router-dom'

export const Error = () => {
  return (
    <section className='h-screen'>
      <div className='container h-full flex items-center justify-center flex-col gap-5'>
        <p className='text-9xl'>404</p>
        <p className='text-xl'>Page not found!</p>
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
