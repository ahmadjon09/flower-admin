import Cookies from 'js-cookie'
import { LogOut, Pencil, PencilIcon, Trash2 } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Axios from '../Axios'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import useSWR, { mutate } from 'swr'
import { fetcher } from '../Middlewares/Fetcher'
import { useSelector } from 'react-redux'
import { UserUpdate } from '../modules/UserUpdate'
import { IsOpenModal } from '../Components/css/Modal'
import { AddCarousel } from '../modules/AddCarousel'

export const Dashboard = () => {
  const user = useSelector(state => state.user.data?.data || {})
  const progressCircle = useRef(null)
  const progressContent = useRef(null)
  const { data, isLoading } = useSWR('/carousel', fetcher)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenC, setIsOpenC] = useState(false)

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress)
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
  }
  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this carousel?'))
      return
    try {
      await Axios.delete(`carousel/${id}`)
      mutate('/carousel')
      alert('Carousel deleted successfully')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete carousel')
    }
  }

  function Logout () {
    Cookies.remove('is_auth')
    window.location.href = '/'
  }

  return (
    <div className='w-full pb-[100px]'>
      <div className='flex justify-between flex-wrap gap-3 min-h-[100px] p-5 items-center border-b border-pink-300'>
        <div className='flex text-pink-600 items-center gap-3'>
          {isLoading ? (
            <p className='text-sm'>Loading</p>
          ) : (
            <img
              src={user.avatar}
              width={'50px'}
              height={'50px'}
              alt='User Avatar'
              className='rounded-full min-h-[50px] object-cover border-2 border-pink-500'
            />
          )}
          <div className='flex flex-col relative'>
            <h1 className='font-bold text-lg sm:text-xl'>
              {user.lastName} {user.firstName}
            </h1>
            <button
              onClick={() => {
                setIsOpen(true)
                IsOpenModal(true)
              }}
              className='absolute w-[25px] h-[25px] p-1 flex items-center justify-center bg-blue-500 rounded-md -top-3 -right-6'
            >
              <PencilIcon color='#fff' />
            </button>
            <p className='text-sm text-gray-600'>+(998) {user.phoneNumber}</p>
          </div>
        </div>
        <div className='flex gap-2 flex-wrap'>
          <button
            onClick={() => Logout()}
            className='flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md font-bold hover:bg-red-400 transition-all'
          >
            Logout <LogOut size={14} />
          </button>
          <button
            onClick={() => {
              setIsOpenC(true)
              IsOpenModal(true)
            }}
            className='bg-pink-700 text-white px-6 py-3 rounded-md shadow-lg hover:bg-pink-800 transition-all'
          >
            + Carousel
          </button>
        </div>
      </div>
      <br />
      <Swiper
        spaceBetween={15}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className='mySwiper h-[300px] sm:h-[400px] md:h-[500px] px-2'
      >
        {isLoading ? (
          <SwiperSlide className='flex items-center justify-center text-lg font-bold text-gray-600'>
            Loading...
          </SwiperSlide>
        ) : data?.data?.length > 0 ? (
          data?.data.map(item => (
            <SwiperSlide
              key={item._id}
              className='relative h-full active:cursor-grab'
            >
              <img
                src={item.photos[0]}
                className='w-full h-full object-cover rounded-lg shadow-lg'
              />
              <div className='absolute inset-0 flex flex-col justify-center items-start text-white text-left px-4 sm:px-6 md:px-8 py-2 sm:py-4'>
                <span className='text-xs sm:text-sm md:text-lg font-bold tracking-widest mb-1 sm:mb-2'>
                  {item.title}
                </span>
                <h1 className='text-sm sm:text-lg md:text-2xl font-bold tracking-widest sm:w-[20rem] md:w-[25rem]'>
                  {item.description}
                </h1>
              </div>
              <div className='absolute z-10 bottom-10 right-10 sm:right-14'>
                {data?.data?.length > 1 ? (
                  <button
                    onClick={() => handleDelete(item._id)}
                    className='bg-red-500 text-white rounded-md p-3 sm:p-4 hover:bg-red-600 transition-all'
                  >
                    <Trash2 size={16} sm:size={20} />
                  </button>
                ) : null}
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className='flex items-center justify-center text-lg font-bold text-gray-600'>
            No Data
          </SwiperSlide>
        )}

        <div
          className='autoplay-progress z-10 absolute bottom-3 right-3 bg-white p-1 rounded-md'
          slot='container-end'
        >
          <svg viewBox='0 0 48 48' ref={progressCircle} className='w-6 h-6'>
            <circle cx='24' cy='24' r='20'></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
      {isOpen && (
        <UserUpdate id={user?._id} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      {isOpenC && <AddCarousel setIsOpen={setIsOpenC} isOpen={isOpenC} />}
    </div>
  )
}
