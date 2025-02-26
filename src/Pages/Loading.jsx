import React from 'react'

export const Loading = () => {
  return (
    <>
      <section className='h-screen '>
        <div className='container flex flex-col h-full items-center justify-center gap-3'>
          <div className='loader'></div>
        </div>
      </section>
    </>
  )
}
