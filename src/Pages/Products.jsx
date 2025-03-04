import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../Axios'
import {
  getProductError,
  getProductPending,
  getProductSuccess
} from '../Toolkit/ProductsSlicer'
import { Link } from 'react-router-dom'

export const Products = () => {
  const dispatch = useDispatch()
  const { data, isPending, isError } = useSelector(state => state.products)

  useEffect(() => {
    const getAllProducts = async () => {
      dispatch(getProductPending())
      try {
        const response = await Axios.get('product')
        dispatch(getProductSuccess(response.data?.data || []))
      } catch (error) {
        console.log(error)
      }
    }
    getAllProducts()
  }, [dispatch])

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Products </h1>
        <Link
          to={'/create-product'}
          className='text-white p-2 bg-black block rounded-md'
        >
          new product
        </Link>
      </div>
      <br />
      {isPending ? (
        <div className='flex justify-center items-center mt-10'>
          <p className='text-xl text-gray-600'>Loading...</p>
        </div>
      ) : isError ? (
        <p className='text-red-500 text-center text-xl'>Error: {isError}</p>
      ) : data.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {data.map(product => {
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
                    <Link
                      to={`/products/edit/${product._id}`}
                      className='bg-sky-600 text-white rounded-md px-3 py-1 text-sm hover:bg-sky-700'
                    >
                      Edit
                    </Link>
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
    </div>
  )
}
