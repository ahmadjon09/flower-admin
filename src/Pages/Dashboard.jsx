import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../Axios'
import Cookies from 'js-cookie'
import { LogOut, Pencil, Trash2 } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {
  getCarouselPending,
  getCarouselSuccess
} from '../Toolkit/CarouselSlicer'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
  const dispatch = useDispatch()
  const { data, isPending } = useSelector(state => state.carousel)
  const user = useSelector(state => state.user.data?.data || {})
  const progressCircle = useRef(null)
  const progressContent = useRef(null)

  useEffect(() => {
    const getAllCarousel = async () => {
      dispatch(getCarouselPending())
      try {
        const response = await Axios.get('carousel')
        dispatch(getCarouselSuccess(response.data?.data || []))
      } catch (error) {
        console.log(error)
      }
    }
    getAllCarousel()
  }, [dispatch])

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress)
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
  }

  function Logout () {
    Cookies.remove('is_auth')
    window.location.href = '/'
  }

  return (
    <div className='w-full h-screen overflow-y-auto pb-[100px] bg-pink-100'>
      <div className='flex justify-between flex-wrap gap-3 min-h-[100px] p-5 items-center border-b border-pink-300'>
        <div className='flex text-pink-600 items-center gap-3'>
          {isPending ? (
            <p className='text-sm'>Loading</p>
          ) : (
            <img
              src={user.avatar}
              width={'50px'}
              alt='User Avatar'
              className='rounded-full object-cover border-2 border-pink-500'
            />
          )}
          <div className='flex flex-col'>
            <h1 className='font-bold text-lg sm:text-xl'>
              {user.lastName} {user.firstName}
            </h1>
            <p className='text-sm text-gray-600'>+(998) {user.phoneNumber}</p>
          </div>
        </div>
        <div className='flex gap-2 flex-wrap'>
          <button
            onClick={() => Logout()}
            className='flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-bold hover:bg-red-400 transition-all'
          >
            Logout <LogOut size={14} />
          </button>
          <Link
            to={'+carousel'}
            className='bg-pink-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-pink-800 transition-all'
          >
            + Carousel
          </Link>
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
        {isPending ? (
          <SwiperSlide className='flex items-center justify-center text-lg font-bold text-gray-600'>
            Loading...
          </SwiperSlide>
        ) : data.length > 0 ? (
          data.map(item => (
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
              <div className='flex items-center absolute gap-3 z-10 bottom-10 right-10 sm:right-14'>
                <Link
                  to={`/edit-carus/${item._id}`}
                  className='bg-blue-500 text-white rounded-full p-3 sm:p-4 hover:bg-blue-600 transition-all'
                >
                  <Pencil size={16} sm:size={20} />
                </Link>
                {data.length > 1 ? (
                  <button className='bg-red-500 text-white rounded-full p-3 sm:p-4 hover:bg-red-600 transition-all'>
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
          className='autoplay-progress z-10 absolute bottom-3 right-3 bg-white p-1 rounded-full'
          slot='container-end'
        >
          <svg viewBox='0 0 48 48' ref={progressCircle} className='w-6 h-6'>
            <circle cx='24' cy='24' r='20'></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  )
}
