import { Pencil, Trash2, ThumbsUp, ThumbsDown, Eye, EyeOff } from 'lucide-react'
import useSWR, { mutate } from 'swr'
import { fetcher } from '../Middlewares/Fetcher'
import Axios from '../Axios'

export const Post = () => {
  const { data, isLoading } = useSWR('/post', fetcher)
  const formatToUzbekDate = createdAt =>
    new Intl.DateTimeFormat('uz-UZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
      .format(new Date(createdAt))
      .replace(',', '')
  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this post?')) return
    try {
      await Axios.delete(`/post/${id}`)
      mutate('/post')
      alert('Post deleted successfully')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete post')
    }
  }

  const handleShow = async id => {
    const postId = id
    try {
      await Axios.post('/post/show', { postId })
      mutate('/post')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete post')
    }
  }

  return (
    <div className='p-2'>
      <div className='w-full flex-wrap gap-3 flex justify-between items-center p-4'>
        <h1 className='text-3xl text-pink-700 font-bold'>Posts</h1>
      </div>
      <br />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : data?.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {data?.map(post => (
            <div
              key={post._id}
              className='bg-white relative shadow-lg rounded-xl p-4 flex flex-col items-strat text-start  hover:shadow-2xl'
            >
              <div className='flex w-full items-start gap-2 justify-start'>
                <img
                  src={
                    post.avatar ||
                    'https://st3.depositphotos.com/5852012/15878/v/450/depositphotos_158781058-stock-illustration-photo-gallery-flat-icon-with.jpg'
                  }
                  alt='Avatar'
                  className='w-14 h-14 rounded-full object-cover mb-3'
                />
                <div className='flex flex-col'>
                  <h3 className='text-lg font-semibold text-pink-800'>
                    {post.firstName || 'Unknown'}
                  </h3>
                  <div className='flex'>
                    <p
                      className={`${
                        post.show ? ' text-green-500' : 'text-red-500'
                      }`}
                    >
                      {post.show ? 'visible' : 'invisible'}
                    </p>
                  </div>
                </div>
              </div>
              <p className='text-gray-600 text-start'>
                <b>Says</b>: <br />
                {post.sms}
              </p>
              <button
                onClick={() => handleShow(post._id)}
                className='absolute top-2 right-2 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition-all'
              >
                {!post.show ? <Eye /> : <EyeOff />}
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className='absolute bottom-2 right-1 bg-red-500 text-white rounded-md p-2 hover:bg-red-600 transition-all'
              >
                <Trash2 size={16} />
              </button>
              <div className='flex gap-4 mt-2 text-gray-700'>
                <div className='flex items-center gap-1'>
                  <ThumbsUp size={16} /> {post.likes}
                </div>
                <div className='flex items-center gap-1'>
                  <ThumbsDown size={16} /> {post.dislikes}
                </div>
              </div>
               <div className='flex text-gray-500 font-semibold text-sm absolute top-0'>
                {formatToUzbekDate(post.createdAt)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-600 text-center text-lg mt-4'>
          No posts found.
        </p>
      )}
    </div>
  )
}
