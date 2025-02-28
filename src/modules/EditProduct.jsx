import React, { useContext, useEffect, useState } from 'react'
import Axios from '../Axios'
import { useNavigate, useParams } from 'react-router-dom'
import { ContextData } from '../Context/Context'

export const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setShowAlertInfo, setShowAlerterr } = useContext(ContextData)

  const [productData, setProductData] = useState({
    description: '',
    price: 0,
    category: '',
    photos: [],
    sale: 0,
    stock: 0,
    title: ''
  })

  const [isPending, setIsPending] = useState(false)
  const [isError, setIsError] = useState('')
  const [imagePending, setImagePending] = useState(false)

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsPending(true)
        const { data } = await Axios.get(`/product/${id}`)
        setProductData(data.data)
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
        formImageData.append('images', files[i])
      }
      setImagePending(true)
      const { data } = await Axios.post('/upload', formImageData)
      setProductData(prevData => ({
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
      await Axios.put(`product/${id}`, productData)
      navigate('/products')
      setShowAlertInfo('Product updated successfully')
      setShowAlerterr(true)
    } catch (error) {
      console.error(error.response?.data?.message || 'An error occurred.')
    }
  }

  return (
    <div className='w-full h-screen overflow-y-auto py-[100px] min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex justify-center items-center'>
      <form
        onSubmit={handleFormSubmit}
        className='flex flex-col space-y-4 w-full max-w-md bg-white shadow-lg rounded-lg p-6'
      >
        <h1 className='text-3xl text-center font-bold text-pink-700'>
          Edit Product
        </h1>

        <div className='space-y-4'>
          <input
            type='text'
            name='title'
            className='border border-pink-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-pink-400'
            onChange={handleInputChange}
            value={productData?.title || ''}
            required
            placeholder='Title'
          />
          <textarea
            name='description'
            className='border border-pink-300 rounded-lg p-3 w-full resize-none focus:ring-2 focus:ring-purple-400'
            onChange={handleInputChange}
            value={productData?.description || ''}
            required
            placeholder='Description'
          />
          <input
            type='number'
            name='stock'
            className='border border-pink-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-pink-400'
            onChange={handleInputChange}
            value={productData?.stock || ''}
            required
            placeholder='In Stock'
          />
          <div className='grid grid-cols-2 gap-3'>
            <input
              type='number'
              name='price'
              className='border border-pink-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-purple-400'
              onChange={handleInputChange}
              value={productData?.price || ''}
              required
              placeholder='Price'
            />
            <input
              type='number'
              name='sale'
              className='border border-pink-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-pink-400'
              onChange={handleInputChange}
              value={productData?.sale || ''}
              required
              placeholder='Sale (%)'
            />
          </div>
          <select
            name='category'
            className='border border-pink-300 rounded-lg p-3 bg-white w-full focus:ring-2 focus:ring-purple-400'
            onChange={handleInputChange}
            value={productData?.category || ''}
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
            className='border border-pink-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-pink-400'
          />
          {imagePending && (
            <h1 className='bg-sky-600 text-white text-center py-2 rounded-lg'>
              Uploading image...
            </h1>
          )}
        </div>
        <button
          type='submit'
          disabled={imagePending || isPending}
          className={`${
            imagePending || isPending
              ? 'bg-pink-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500'
          } w-full text-xl py-3 rounded-lg text-white font-bold transition-all duration-300`}
        >
          {imagePending || isPending ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
