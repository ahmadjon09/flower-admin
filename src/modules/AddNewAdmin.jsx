import React, { useState } from 'react'
import Axios from '../Axios'
import { Eye, EyeOff } from 'lucide-react'
import { mutate } from 'swr'
import { IsOpenModal } from '../Components/css/Modal'

export const AddNewAdmin = ({ isOpen, setIsOpen }) => {
  const [error, setError] = useState('')
  const [adminData, setAdminData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    phoneNumber: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword)
  }

  const handleFormSubmit = async e => {
    e.preventDefault()
    setIsPending(true)
    try {
      await Axios.post('/admin/create', adminData)
      setIsOpen(false)
      mutate('/admin')
      IsOpenModal(false)
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred')
    } finally {
      setIsPending(false)
      IsOpenModal(false)
    }
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setAdminData(prevData => ({ ...prevData, [name]: value }))
  }

  return (
    <div
      className={`fixed transition-all duration-300 z-[999] top-0 ${
        isOpen ? 'right-0 bg-black/90' : '-right-full'
      } flex justify-end items-center w-full h-full`}
    >
      <form
        onSubmit={handleFormSubmit}
        className='w-full h-full max-w-md md:max-w-lg bg-white p-6 md:p-8 shadow-2xl border border-pink-300'
      >
        <h1 className='text-center text-2xl font-bold text-pink-600 mb-4'>
          Add New Admin
        </h1>
        <input
          type='text'
          name='firstName'
          placeholder='First Name'
          className='p-3 outline-none border-2 border-pink-400 rounded-md w-full mb-3 focus:border-pink-600 transition'
          onChange={handleInputChange}
          required
        />
        <input
          type='text'
          name='lastName'
          placeholder='Last Name'
          className='p-3 outline-none border-2 border-pink-400 rounded-md w-full mb-3 focus:border-pink-600 transition'
          onChange={handleInputChange}
          required
        />
        <input
          type='number'
          name='phoneNumber'
          placeholder='Phone Number'
          className='p-3 outline-none border-2 border-pink-400 rounded-md w-full mb-3 focus:border-pink-600 transition'
          onChange={handleInputChange}
          required
        />
        <div className='relative w-full'>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Password'
            className='p-3 outline-none border-2 border-pink-400 rounded-md w-full mb-3 focus:border-pink-600 transition'
            onChange={handleInputChange}
            required
          />
          <span
            className='absolute right-3 top-3 cursor-pointer'
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>
        {error && <p className='text-red-500 p-5'>{error}</p>}
        <div className='grid grid-cols-2 gap-3'>
          <button
            onClick={() => {
              setIsOpen(false)
              IsOpenModal(false)
            }}
            className='bg-gray-400 rounded-md flex justify-center text-white py-3 font-bold hover:bg-gray-500 transition'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={isPending}
            className={
              isPending
                ? 'bg-pink-400 cursor-not-allowed'
                : `bg-pink-500 rounded-md text-white py-3 font-bold hover:bg-pink-600 transition`
            }
          >
            {isPending ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
