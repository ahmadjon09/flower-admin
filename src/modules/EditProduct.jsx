import React, { useEffect, useState } from 'react'
import Axios from '../Axios'
import { useNavigate, useParams } from 'react-router-dom'

export const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [productData, setProductData] = useState({
    description: '',
    days: 0,
    price: 0,
    person: 0,
    category: '',
    photos: [],
    location: '',
    sale: 0
  })

  const [isPending, setIsPending] = useState(false)
  const [isError, setIsError] = useState('')
  const [imagePending, setImagePending] = useState(false)

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsPending(true)
        const { data } = await Axios.get(`product/${id}`)
        setProductData(data.product)
      } catch (error) {
        setIsError(error.response?.data?.message || 'An error occurred.')
      } finally {
        setIsPending(false)
      }
    }
    getProduct()
  }, [id])

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
        photos: [...data.photos]
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
      await Axios.put(`product/${id}`, {
        ...productData,
        days: +productData.days,
        price: +productData.price,
        person: +productData.person,
        sale: +productData.sale,
        description: productData.description
      })
      navigate('/products')
    } catch (error) {
      console.error(error.response?.data?.message || 'An error occurred.')
    }
  }

  return (
    <>
      {isPending && <p>Loading...</p>}
      {isError && <p className='text-red-500'>{isError}</p>}
      <form
        onSubmit={handleFormSubmit}
        className='flex flex-col space-y-4 w-full mx-auto mt-14 md:w-[500px]'
      >
        <h1 className='text-4xl text-center'>Edit Product</h1>
        <textarea
          name='description'
          className='border border-gray-300 rounded-md p-2 w-full resize-none'
          onChange={handleInputChange}
          value={productData?.description || ''}
          placeholder='Description'
        />
        <div className='grid grid-cols-2 gap-3'>
          <input
            type='number'
            name='price'
            className='border border-gray-300 rounded-md p-2 w-full'
            onChange={handleInputChange}
            value={productData?.price}
            placeholder='Price'
          />
          <input
            type='number'
            name='sale'
            className='border border-gray-300 rounded-md p-2 w-full'
            onChange={handleInputChange}
            value={productData?.sale}
            placeholder='Sale (%)'
          />
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <input
            type='number'
            name='days'
            className='border border-gray-300 rounded-md p-2 w-full'
            onChange={handleInputChange}
            value={productData?.days || ''}
            placeholder='Days'
          />
          <input
            type='number'
            name='person'
            className='border border-gray-300 rounded-md p-2 w-full'
            onChange={handleInputChange}
            value={productData?.person || ''}
            placeholder='Person Count'
          />
        </div>
        <input
          type='text'
          name='location'
          className='border border-gray-300 rounded-md p-2 w-full'
          onChange={handleInputChange}
          value={productData?.location || ''}
          placeholder='Location'
        />
        <select
          name='category'
          className='border border-gray-300 rounded-md p-2 bg-white w-full'
          onChange={handleInputChange}
          value={productData?.category || ''}
        >
          <option value=''>Select Category</option>
          <option value='adventure'>Adventure</option>
          <option value='cultural'>Cultural</option>
          <option value='relaxation'>Relaxation</option>
          <option value='nature'>Nature</option>
          <option value='city-tours'>City Tours</option>
          <option value='family-friendly'>Family Friendly</option>
          <option value='beach'>Beach</option>
          <option value='honeymoon'>Honeymoon</option>
        </select>
        <input
          type='file'
          name='photos'
          onChange={handleFileChange}
          multiple
          className='border border-gray-300 rounded-md p-2 w-full'
        />
        {imagePending && (
          <h1 className='bg-sky-600 text-white text-center py-2'>
            Uploading image...
          </h1>
        )}
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
    </>
  )
}
