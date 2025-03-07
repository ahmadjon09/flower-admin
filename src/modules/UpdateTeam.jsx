import React, { useEffect, useState } from 'react'
import Axios from '../Axios'
import { useNavigate } from 'react-router-dom'
import { mutate } from 'swr'
import { IsOpenModal } from '../Components/css/Modal'

export const UpdateTeam = ({ isOpen, setIsOpen, teamId }) => {
  const navigate = useNavigate()
  const [teamData, setTeamData] = useState({
    name: '',
    position: '',
    fsblink: '',
    twtlink: '',
    inslink: '',
    photos: []
  })
  const [isPending, setIsPending] = useState(false)
  const [imagePending, setImagePending] = useState(false)

  useEffect(() => {
    if (teamId) {
      const getTeam = async () => {
        try {
          setIsPending(true)
          const { data } = await Axios.get(`/teams/${teamId}`)
          setTeamData(data.OneTeam)
        } catch (error) {
          console.log(error)
        } finally {
          setIsPending(false)
        }
      }
      getTeam()
    }
  }, [teamId])

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
    } catch (error) {
      console.log(error)
    } finally {
      setImagePending(false)
    }
  }

  const handleFormSubmit = async e => {
    e.preventDefault()
    try {
      await Axios.put(`teams/${teamId}`, teamData)
      setIsOpen(false)
      IsOpenModal(false)
      mutate('/teams')
    } catch (error) {
      console.error(error.response?.data?.message || 'An error occurred.')
    }
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
          Edit Team
        </h1>
        <input
          type='text'
          name='name'
          className='w-full border border-pink-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-pink-500 outline-none'
          onChange={handleInputChange}
          required
          value={teamData?.name || ''}
          placeholder='Name'
        />
        <input
          type='text'
          name='position'
          className='w-full border border-pink-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-pink-500 outline-none'
          value={teamData?.position || ''}
          onChange={handleInputChange}
          required
          placeholder='Position'
        />
        <input
          type='url'
          name='fsblink'
          className='w-full border border-gray-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-blue-500 outline-none'
          value={teamData?.fsblink || ''}
          onChange={handleInputChange}
          placeholder='Facebook Link'
        />
        <input
          type='url'
          name='twtlink'
          className='w-full border border-gray-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-blue-400 outline-none'
          value={teamData?.twtlink || ''}
          onChange={handleInputChange}
          placeholder='Twitter Link'
        />
        <input
          type='url'
          name='inslink'
          className='w-full border border-gray-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-pink-500 outline-none'
          value={teamData?.inslink || ''}
          onChange={handleInputChange}
          placeholder='Instagram Link'
        />
        <input
          type='file'
          name='photos'
          onChange={handleFileChange}
          multiple
          className='border border-pink-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-pink-400'
        />
        {imagePending && (
          <p className='text-blue-600 text-center'>Uploading image...</p>
        )}
        <div className='grid grid-cols-2 gap-3 mt-4'>
          <button
            onClick={() => {
              IsOpenModal(false)
              setIsOpen(false)
            }}
            className='bg-gray-400 rounded-md flex justify-center text-white py-3 font-bold hover:bg-gray-500 transition'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={imagePending || isPending}
            className={`${
              imagePending || isPending
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-pink-500'
            } rounded-md text-white py-3 font-bold hover:bg-pink-600 transition`}
          >
            {imagePending || isPending ? 'Loading...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}
