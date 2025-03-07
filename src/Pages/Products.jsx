import { Link } from 'react-router-dom'
import useSWR, { mutate } from 'swr'
import { fetcher } from '../Middlewares/Fetcher'
import { useState } from 'react'
import { IsOpenModal } from '../Components/css/Modal'
import { AddProduct } from '../modules/AddProduct'
import Axios from '../Axios'
import { EditProduct } from '../modules/EditProduct'

export const Products = () => {
  const { data, error, isLoading } = useSWR('/product', fetcher)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenE, setIsOpenE] = useState(false)
  const [id_, setId_] = useState('')
  if (error) return <div>Err</div>
  if (isLoading) return <div>Loadin...</div>
  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      await Axios.delete(`product/${id}`)
      mutate('/product')
      alert('Product deleted successfully')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete product')
    }
  }
  const handleEdit = id => {
    setIsOpenE(true)
    setId_(id)
    IsOpenModal(true)
  }
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Products </h1>
        <button
          onClick={() => {
            setIsOpen(true)
            IsOpenModal(true)
          }}
          className='text-white p-2 bg-pink-700 block rounded-md'
        >
          + product
        </button>
      </div>
      <br />
      {data.data && data.data.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {data.data.map(product => {
            const discountedPrice =
              product.sale > 0
                ? product.price - product.price * (product.sale / 100)
                : product.price
            return (
              <div
                key={product._id}
                className='bg-white rounded-md shadow-lg overflow-hidden relative'
              >
                {product.sale > 0 && (
                  <div className='absolute z-10 top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm font-bold rounded'>
                    {product.sale}% OFF
                  </div>
                )}
                <div className='w-full max-h-60 overflow-hidden'>
                  <img
                    src={product.photos[0] || null}
                    alt='Product'
                    className='w-full max-h-60 h-60 object-cover hover:scale-110 transition-all duration-200'
                  />
                </div>
                <div className='w-full p-4'>
                  <p className='font-bold'>{product.title}</p>
                  <p className='text-gray-600 text-lg font-bold'>
                    {product.sale > 0 ? (
                      <>
                        <span className='line-through text-red-500'>
                          ${product.price.toFixed(2)}
                        </span>{' '}
                        <span className='text-green-600'>
                          ${discountedPrice.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      `$${product.price.toFixed(2)}`
                    )}
                  </p>
                  <p className='text-sm text-gray-500 mt-1'>
                    {product.description?.length > 150
                      ? product.description.slice(0, 150) + ' ...'
                      : product.description || 'No description available'}
                  </p>
                  <div className='flex justify-end items-center gap-2'>
                    <button
                      onClick={() => handleEdit(product._id)}
                      className='bg-sky-600 text-white rounded-md px-3 py-1 text-sm hover:bg-sky-700'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className='bg-red-600 text-white rounded-md px-3 py-1 text-sm hover:bg-red-700'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p className='text-gray-600 text-center text-lg mt-4'>
          No products found.
        </p>
      )}
      {isOpen && <AddProduct isOpen={isOpen} setIsOpen={setIsOpen} />}
      {isOpenE && (
        <EditProduct
          setIsOpen={setIsOpenE}
          isOpen={isOpenE}
          editProductId={id_}
        />
      )}
    </div>
  )
}
