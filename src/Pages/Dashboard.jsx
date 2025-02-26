import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../Axios'
import Cookies from 'js-cookie'
import { LogOut } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {
  getCarouselError,
  getCarouselPending,
  getCarouselSuccess
} from '../Toolkit/CarouselSlicer'

export const Dashboard = () => {
  const dispatch = useDispatch()
  const { data, isPending, isError } = useSelector(state => state.carousel)
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
        dispatch(
          getCarouselError(error.response?.data?.message || 'Unknown error')
        )
      }
    }
    getAllCarousel()
  }, [dispatch])
  console.log(data)

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress)
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
  }

  function Logout () {
    Cookies.remove('is_auth')
    window.location.href = '/'
  }

  return (
    <div className='w-full h-screen overflow-y-auto pb-[100px]  bg-pink-100'>
      <div className='flex justify-between flex-wrap gap-3 h-[100px] p-5 items-center border-b border-pink-300'>
        <div className='flex text-pink-600 font-bold items-center gap-3'>
          <img
            src={user.avatar}
            width={'50px'}
            alt='User Avatar'
            className='rounded-full object-cover border-2 border-pink-500'
          />
          <h1>{user.lastName + ' ' + user.firstName}</h1>
        </div>
        <button
          onClick={() => Logout()}
          className='flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-2xl font-bold hover:bg-red-400 transition-all'
        >
          Logout <LogOut size={14} />
        </button>
      </div>
      <br />
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className='mySwiper h-[400px]' // Swiper'ga balandlik qo‘shildi
      >
        {isPending ? (
          <SwiperSlide className='flex items-center justify-center text-lg font-bold text-gray-600'>
            Loading...
          </SwiperSlide>
        ) : data.length > 0 ? (
          data.map((item, index) => (
            <SwiperSlide
              key={index}
              className='bg-pink-200 text-center h-full flex items-center justify-center text-pink-700 font-bold text-xl py-6'
            >
              {item.title}
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
