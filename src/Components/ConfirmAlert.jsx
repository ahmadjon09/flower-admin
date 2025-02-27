import { AlertTriangle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from '../Context/Context'

export const ConfirmAlert = ({ message }) => {
  const [visible, setVisible] = useState(false)
  const { setShowConfirm, setShowAlerterr } = useContext(ContextData)

  useEffect(() => {
    if (message) {
      setVisible(true)
    }
  }, [message])

  const handleConfirm = () => {
    console.log('User confirmed!')
    setVisible(false)
    setShowAlerterr(true)
  }

  const handleCancel = () => {
    setVisible(false)
    setShowConfirm(false)
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen z-20 px-2 bg-black/50 flex items-center justify-center transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {visible && (
        <div className='bg-white p-6 rounded-xl  shadow-lg text-center'>
          <div className='flex w-full items-center justify-center'>
            <AlertTriangle color='red' size={100} />
          </div>
          <p className='text-lg font-bold mb-4'>{message}</p>
          <div className='flex justify-center gap-4'>
            <button
              className='transition-all duration-300 hover:scale-105 bg-red-500 text-white px-4 py-2 rounded-lg'
              onClick={handleConfirm}
            >
              Yes
            </button>
            <button
              className='transition-all duration-300 hover:scale-105 bg-green-500 text-white px-4 py-2 rounded-lg'
              onClick={handleCancel}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
