import { AlertTriangle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from '../Context/Context'
import { DeleteItems } from '../modules/DeleteItems'

export const ConfirmAlert = ({ message }) => {
  const [visible, setVisible] = useState(false)
  const { setShowConfirm, setShowAlerterr, delete_ } = useContext(ContextData)
  const deleteItem = DeleteItems(delete_[0], delete_[1])

  useEffect(() => {
    if (message) {
      setVisible(true)
    }
  }, [message])

  const handleConfirm = () => {
    setVisible(false)
    setShowAlerterr(true)
    setShowConfirm(false)
    deleteItem()
  }

  const handleCancel = () => {
    setVisible(false)
    setShowConfirm(false)
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen z-[9999] px-2 bg-black/50 flex items-center justify-center transition-opacity duration-500 ${
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
