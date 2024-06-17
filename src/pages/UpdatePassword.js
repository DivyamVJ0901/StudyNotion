import React from 'react'
import { useDispatch  , useSelector} from 'react-redux'
import { resetPassword } from '../services/operations/authAPI'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })

  // Ek flag create karna hoga kyuki change password krte time new password
  // ek text bhi ho skta hai yaa fir ek password bhi

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { loading } = useSelector((state) => state.auth)
  const { password, confirmPassword } = formData

  const handleOnChange = e => {
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  // HandleOnSubmit - Isse saare actions dispatch ho rahe honge
  const handleOnSubmit = e => {
    e.preventDefault()
    const token = location.pathname.split('/').at(-1)
    dispatch(resetPassword(password, confirmPassword, token, navigate)) // The last part in the link that is present in sent email is the token
  }

  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
      {loading ? (
        <div className='spinner'></div>
      ) : (
        <div className='max-w-[500px] p-4 lg:p-8'>
          <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
            Choose New Password
          </h1>
          <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
            Enter your new password
          </p>

          <form onSubmit={handleOnSubmit}>
            <label className='relative'>
              <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                New Password<sup className='ml-1 text-pink-200'>*</sup>
              </p>

              <input
                required  
                type={showPassword ? 'text' : 'password'}
                value={password}
                name='password'
                placeholder='New Password'
                onChange={handleOnChange}
                className='form-style w-full !pr-10'
              />

              <span
                onClick={() => setShowPassword(prev => !prev)}
                className='absolute right-3 top-[38px] z-[10] cursor-pointer'
              >
                {showPassword ? (
                  <FaEye fontSize={24} fill='#AFB2BF' />
                ) : (
                  <FaEyeSlash fontSize={24} fill='#AFB2BF' />
                )}
              </span>
            </label>

            <label className='relative mt-3 block'>
              <p className='mb-1 text-[0.875rem] leadint-[1.375rem] text-richblack-5'>
                Confirm Password<sup className='ml-1 text-pink-200'>*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                name='confirmPassword'
                placeholder='Confirm Password'
                onChange={handleOnChange}
                className='form-style w-full !pr-10'
              />
              <span
                onClick={() => setShowConfirmPassword(prev => !prev)}
                className='absolute right-3 top-[38px] z-[10] cursor-pointer'
              >
                {showConfirmPassword ? (
                  <FaEye fontSize={24} fill='#AFB2BF' />
                ) : (
                  <FaEyeSlash fontSize={24} fill='#AFB2BF' />
                )}
              </span>
            </label>

            <button
              type='submit'
              onSubmit={handleOnSubmit}
              className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'
            >
              Reset Password
            </button>
          </form>

          <div className='mt-6 flex items-center justify-between'>
            <Link to='/login'>
              <p className='flex items-center gap-x-2 text-richblack-5'>
                Back to Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword
