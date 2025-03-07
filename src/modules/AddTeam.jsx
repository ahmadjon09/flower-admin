import React, { useState } from 'react'
import Axios from '../Axios'
import { IsOpenModal } from '../Components/css/Modal'
import { mutate } from 'swr'

export const AddTeam = ({ isOpen, setIsOpen }) => {
  const [imagePending, setImagePending] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const [teamData, setTeamData] = useState({
    name: '',
    position: '',
    fsblink: '',
    twtlink: '',
    inslink: '',
    photos: []
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setTeamData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleFileChange = async e => {
    try {
      const formImageData = new FormData()
      const files = e.target.files
      for (let i = 0; i < files.length; i++) {
        formImageData.append('images', files[i])
      }
      setImagePending(true)
      const { data } = await Axios.post('/upload', formImageData)
      setTeamData(prevData => ({
        ...prevData,
        photos: data.images
      }))
    } catch (err) {
      console.error(err)
    } finally {
      setImagePending(false)
    }
  }

  const handleFormSubmit = async e => {
    e.preventDefault()
    try {
      setIsPending(true)
      await Axios.post('teams/create', teamData)
      setIsOpen(false)
      IsOpenModal(false)
      mutate('/teams')
    } catch (error) {
      console.error(error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div
      className={`fixed transition-all duration-300 bg-black/90 overflow-hidden z-[999] top-0 ${
        isOpen ? 'right-0' : '-right-full'
      } flex justify-end items-center w-full h-screen`}
    >
      <form
        onSubmit={handleFormSubmit}
        className='w-full h-full max-w-md md:max-w-lg bg-white p-6 md:p-8 shadow-2xl border border-pink-300'
      >
        <h1 className='text-center text-2xl font-bold text-pink-600 mb-4'>
          Add New Team Member
        </h1>
        <input
          className='p-3 outline-none border-2 border-pink-400 rounded-md w-full mb-3 focus:border-pink-600 transition'
          type='text'
          placeholder='Full Name'
          name='name'
          value={teamData.name}
          onChange={handleInputChange}
        />
        <input
          className='p-3 outline-none border-2 border-pink-400 rounded-md w-full mb-3 focus:border-pink-600 transition'
          type='text'
          placeholder='Position'
          name='position'
          value={teamData.position}
          onChange={handleInputChange}
        />
        <input
          className='p-3 outline-none border-2 border-pink-400 rounded-md w-full mb-3 focus:border-pink-600 transition'
          type='url'
          placeholder='Facebook Link'
          name='fsblink'
          value={teamData.fsblink}
          onChange={handleInputChange}
        />
        <input
          className='p-3 outline-none border-2 border-pink-400 rounded-md w-full mb-3 focus:border-pink-600 transition'
          type='url'
          placeholder='Twitter Link'
          name='twtlink'
          value={teamData.twtlink}
          onChange={handleInputChange}
        />
        <input
          className='p-3 outline-none border-2 border-pink-400 rounded-md w-full mb-3 focus:border-pink-600 transition'
          type='url'
          placeholder='Instagram Link'
          name='inslink'
          value={teamData.inslink}
          onChange={handleInputChange}
        />
        <input
          type='file'
          name='photos'
          onChange={handleFileChange}
          multiple
          className='p-3 outline-none border-2 border-pink-400 rounded-md w-full mb-3 focus:border-pink-600 transition'
        />
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
            disabled={imagePending}
            className={
              imagePending
                ? 'bg-pink-400 cursor-not-allowed'
                : `bg-pink-500 rounded-md text-white py-3 font-bold hover:bg-pink-600 transition`
            }
          >
            {imagePending ? 'Uploading...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}
