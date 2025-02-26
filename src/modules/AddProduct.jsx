import React, { useState } from 'react'
import Axios from '../Axios'
import { useNavigate } from 'react-router-dom'

export const AddProduct = () => {
  const navigate = useNavigate()
  const [imagePending, setImagePending] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [productData, setProductData] = useState({
    description: '',
    price: 0,
    category: '',
    photos: [],
    sale: 0,
    stock: 0,
    title: ''
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setProductData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleFileChange = async e => {
    try {
      const formImageData = new FormData()
      const files = e.target.files
      for (let i = 0; i < files.length; i++) {
        formImageData.append('photos', files[i])
      }
      setImagePending(true)
      const { data } = await Axios.post('/upload', formImageData)
      setProductData(prevData => ({
        ...prevData,
        photos: [...prevData.photos, ...data.photos]
      }))
    } catch (err) {
      console.error(err)
    } finally {
      setImagePending(false)
    }
  }

  const handleFormSubmit = async e => {
    e.preventDefault()

    if (productData.category === 'none' || productData.colors === 'none') {
      alert('Please select valid category and color options.')
      return
    }

    try {
      setIsPending(true)
      await Axios.post('/product/create', productData)
      navigate('/products')
    } catch (error) {
      console.error(error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className='w-full h-screen overflow-y-auto pb-[100px]'>
      <form
        onSubmit={handleFormSubmit}
        className='flex h-screen flex-col  space-y-4 w-full mx-auto mt-14 px-4 py-4 md:w-[400px]'
      >
        <h1 className='text-3xl text-center font-bold'>Add New Product</h1>

        <div className='space-y-4'>
          <input
            type='text'
            name='title'
            className='border border-gray-300 rounded-md p-2 w-full'
            onChange={handleInputChange}
            required
            placeholder='Title'
          />
          <textarea
            name='description'
            className='border border-gray-300 rounded-md p-2 w-full resize-none'
            onChange={handleInputChange}
            required
            placeholder='Description'
          />
          <input
            type='number'
            name='stock'
            className='border border-gray-300 rounded-md p-2 w-full'
            onChange={handleInputChange}
            required
            placeholder='In Stock'
          />
          <div className='grid grid-cols-2 gap-3'>
            <input
              type='number'
              name='price'
              className='border border-gray-300 rounded-md p-2 w-full'
              onChange={handleInputChange}
              required
              placeholder='Price'
            />

            <input
              type='number'
              name='sale'
              className='border border-gray-300 rounded-md p-2 w-full'
              onChange={handleInputChange}
              required
              placeholder='Sale (%)'
            />
          </div>

          <select
            name='category'
            className='border border-gray-300 rounded-md p-2 bg-white w-full'
            onChange={handleInputChange}
            required
          >
            <option value=''>Select Flower Type</option>
            <option value='roses'>Roses</option>
            <option value='tulips'>Tulips</option>
            <option value='lilies'>Lilies</option>
            <option value='sunflowers'>Sunflowers</option>
            <option value='orchids'>Orchids</option>
            <option value='daisies'>Daisies</option>
            <option value='peonies'>Peonies</option>
            <option value='cherry-blossom'>Cherry Blossom</option>
          </select>
          <input
            type='file'
            name='photos'
            onChange={handleFileChange}
            multiple
            required
            className='border border-gray-300 rounded-md p-2 w-full'
          />

          {imagePending && (
            <h1 className='bg-sky-600 text-white text-center py-2'>
              Uploading image...
            </h1>
          )}
        </div>

        <button
          type='submit'
          disabled={imagePending || isPending}
          className={`${
            imagePending || isPending
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-green-700'
          } w-full text-xl py-2 rounded-md text-white`}
        >
          {imagePending || isPending ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
