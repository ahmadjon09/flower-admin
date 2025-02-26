import React, { useState } from 'react'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import Axios from '../Axios'

export const Login = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { isAuth } = useSelector(state => state.user)

  if (isAuth) {
    window.location.href = '/'
  }

  const handleLogin = async e => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { data } = await Axios.post('admin/login', {
        password,
        phoneNumber: +phone
      })

      Cookies.set('is_auth', data.token, { secure: true, expires: 7 })
      window.location.href = '/'
    } catch (err) {
      setError(err.response?.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='h-screen bg-pink-100 flex items-center justify-center'>
      <form
        className='flex flex-col gap-5 w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-pink-300'
        onSubmit={handleLogin}
      >
        <h2 className='text-pink-600 text-center text-2xl font-bold'>
          Welcome Back
        </h2>

        <div className='flex items-center border border-pink-300 rounded-xl overflow-hidden'>
          <span className='px-4 text-pink-600 font-bold'>+998</span>
          <input
            type='number'
            className='p-3 w-full outline-none bg-transparent text-pink-700'
            placeholder='Телефон номер'
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>

        <div className='relative'>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            className='border border-pink-300 p-3 w-full rounded-xl bg-transparent text-pink-700'
            placeholder='Введите пароль'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div
            className='absolute inset-y-0 right-3 flex items-center cursor-pointer text-pink-600'
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <EyeSlash size={24} /> : <Eye size={24} />}
          </div>
        </div>

        {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

        <button
          type='submit'
          className={`bg-pink-500 py-3 text-white rounded-xl font-bold transition-all hover:bg-pink-400 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>
    </section>
  )
}
