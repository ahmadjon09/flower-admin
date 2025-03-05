import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from '../Axios'

export const AddNewCarousel = () => {
  const [error, setError] = useState('')
  const [carouselData, setCarouselData] = useState({
    title: '',
    lastName: '',
    photos: []
  })
  const [imagePending, setImagePending] = useState(false)
  const nav = useNavigate()

  const handleFormSubmit = async e => {
    e.preventDefault()
    try {
      await Axios.post('/carousel/create', carouselData)
      nav('/')
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred')
    }
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
      setCarouselData(prevData => ({
        ...prevData,
        photos: data.images
      }))
    } catch (error) {
      console.log(error)
    } finally {
      setImagePending(false)
    }
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setCarouselData(prevData => ({ ...prevData, [name]: value }))
  }

  return (
    <div className='flex items-center justify-center pb-[100px] bg-gradient-to-br from-pink-100 to-pink-200 p-4'>
      <form
        onSubmit={handleFormSubmit}
        className='bg-white shadow-xl rounded-2xl p-4 w-full max-w-lg space-y-6 relative'
      >
        <h1 className='text-3xl font-bold text-center text-pink-700'>
          New Carousel
        </h1>
        <div className='space-y-4'>
          <input
            type='text'
            name='title'
            placeholder='Title'
            className='w-full p-3 border rounded-xl focus:ring-2 focus:ring-pink-400'
            onChange={handleInputChange}
            required
          />
          <textarea
            type='text'
            name='description'
            placeholder='Description'
            className='w-full p-3 border rounded-xl focus:ring-2 focus:ring-pink-400'
            onChange={handleInputChange}
            required
          />
          <input
            type='file'
            name='photos'
            onChange={handleFileChange}
            multiple
            required
            className='border border-pink-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-pink-400'
          />
        </div>
        {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
        <button
          type='submit'
          disabled={imagePending}
          className={`${
            imagePending
              ? 'bg-pink-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500'
          } w-full text-xl py-3 rounded-lg text-white font-bold transition-all duration-300`}
        >
          {imagePending ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
