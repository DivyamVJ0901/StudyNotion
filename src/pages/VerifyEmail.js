import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input'
import { sendOtp, signUp } from '../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Spinner from '.././components/common/Spinner'
import { FiArrowLeft } from 'react-icons/fi'
import { GiBackwardTime } from 'react-icons/gi'
// import "App.css"

const VerifyEmail = () => {
  const [otp, setOtp] = useState('')
  const { signupData, loading } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Aisa bhi to ho skta hai ki signup me ye data naa pda ho ,
  // to iske liye hum useEffect hook ka use krenge

  useEffect(() => {
    if (!signupData) {
      navigate('/signup')
    }
  })

  const handleOnSubmit = e => {
    e.preventDefault()

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = signupData

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    )
  }

  return (
    <div className='w-11/12 max-w-maxContent mx-auto min-h-screen flex items-center justify-center'>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className='flex flex-col gap-6 w-[33%]'>
          <div className='flex flex-col gap-3'>
            <h1 className='font-semibold text-3xl text-richblack-5 '>
              VerifyEmail
            </h1>
            <p className='font-normal text-lg text-richblack-100'>
              An One Time Password has been sent to you. Please enter the code
              below
            </p>
          </div>

          <div className='text-white flex justify-center items-center'>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={props => (
                <input
                  {...props}
                  placeholder='-'
                  style={{
                    boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)'
                  }}
                  className='w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50'
                />
              )}
              containerStyle={{
                justifyContent: 'space-between',
                gap: '0 6px'
              }}
            />
          </div>

          <div className='flex flex-col gap-3'>
            <button
              onClick={handleOnSubmit}
              className='bg-yellow-50 p-3 rounded-lg font-medium text-base  '
            >
              Verify email
            </button>

            {/* back to login and resend button */}
            <div className='flex flex-row gap-3 items-center justify-between '>
              {/* pagin page */}
              <Link to={'/login'}>
                <div className='flex items-center gap-2 pl-0 p-3 text-richblack-5 '>
                  <FiArrowLeft fontSize={16} />
                  <p className=' font-medium text-base'>Back to login</p>
                </div>
              </Link>

              {/* Resend it */}
              <button
                onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                className='flex items-center gap-2 pr-0 p-3 text-blue-100 '
              >
                <GiBackwardTime fontSize={20} />
                <p className='font-medium text-base'>Resend it</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default VerifyEmail
