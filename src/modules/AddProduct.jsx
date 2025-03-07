import { useState } from 'react'
import Axios from '../Axios'
import { useNavigate } from 'react-router-dom'
import { IsOpenModal } from '../Components/css/Modal'
import { mutate } from 'swr'

export const AddProduct = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [imagePending, setImagePending] = useState(false)
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
    photos: [],
    sale: 0,
    stock: 0
  })

  const handleFormSubmit = async e => {
    e.preventDefault()
    if (productData.category === '') {
      alert('Please select a valid category.')
      return
    }
    try {
      await Axios.post('/product/create', productData)
      setIsOpen(false)
      IsOpenModal(false)
      mutate('/product')
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
      setProductData(prevData => ({
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
    setProductData(prevData => ({ ...prevData, [name]: value }))
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
          Add New Product
        </h1>
        <input
          type='text'
          name='title'
          placeholder='Title'
          onChange={handleInputChange}
          required
          className='w-full border border-pink-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-pink-500 outline-none'
        />
        <textarea
          name='description'
          placeholder='Description'
          onChange={handleInputChange}
          required
          className='w-full border border-pink-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-pink-500 outline-none'
        />
        <input
          type='number'
          name='price'
          placeholder='Price'
          onChange={handleInputChange}
          required
          className='w-full border border-pink-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-pink-500 outline-none'
        />
        <input
          type='number'
          name='stock'
          placeholder='Stock'
          onChange={handleInputChange}
          required
          className='w-full border border-pink-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-pink-500 outline-none'
        />
        <input
          type='number'
          name='sale'
          placeholder='Sale (%)'
          onChange={handleInputChange}
          className='w-full border border-pink-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-pink-500 outline-none'
        />
        <select
          name='category'
          onChange={handleInputChange}
          required
          className='w-full border border-pink-300 p-3 rounded-md mb-3 bg-white focus:ring-2 focus:ring-pink-500 outline-none'
        >
          <option value=''>Select Category</option>
          <option value='roses'>Roses</option>
          <option value='tulips'>Tulips</option>
          <option value='lilies'>Lilies</option>
          <option value='sunflowers'>Sunflowers</option>
        </select>
        <input
          type='file'
          name='photos'
          onChange={handleFileChange}
          multiple
          required
          className='border border-pink-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-pink-400'
        />
        {error && <p className='text-red-500 mt-2'>{error}</p>}
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
            disabled={imagePending}
            className={`${
              imagePending ? 'bg-pink-400 cursor-not-allowed' : 'bg-pink-500'
            } rounded-md text-white py-3 font-bold hover:bg-pink-600 transition`}
          >
            {imagePending ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
