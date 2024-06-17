import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { apiConnector } from '../../services/apiconnector'
import { contactusEndpoint } from '../../services/apis'
import CountryCode from '../../data/countrycode.json'

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm()

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: '',
        firstName: '',
        lastName: '',
        message: '',
        phoneNo: ''
      })
    }
  }, [reset, isSubmitSuccessful]) // here , [] is called dependency array which contains both of these items (*important)

  const submitContactForm = async data => {
    console.log('Logging Data', data)
    try {
      setLoading(true)
      // const response = await apiConnector("POST" , contactusEndpoint.CONTACT_US_API,data);
      const response = { status: 'OK' }
      console.log('Logging Response', response)
      setLoading(false)
    } catch (error) {
      console.log('Error : ', error.message)
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitContactForm)}
      className='flex flex-col gap-7 mt-7 '
    >
      <div className='flex flex-col gap-5 lg:flex-row'>
        {/* First Name  */}
        <div className='flex flex-col gap-2 w-[48%]'>
          <label htmlFor='firstname' className='text-14px text-richblack-5'>
            First Name <sup className='text-pink-400 text-xl'>*</sup>
          </label>
          <input
            type='text'
            id='firstname'
            placeholder='Enter first Name'
            name='firstname'
            className='border border-richblack-600 rounded-lg bg-richblack-700 p-3 
            text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] 
            shadow-white/50 placeholder:text-richblack-400 focus-outline-none'
            {...register('firstname', { required: true })}
          />
          {errors.firstname && (
            <span className='-mt-1 text-[12px] text-yellow-100'>
              Please enter your name
            </span>
          )}
        </div>

        {/* Last Name  */}
        <div className='flex flex-col gap-2 w-[48%]'>
          <label htmlFor='lastname' className=' text-14px text-richblack-5'>
            Last Name <sup className='text-pink-400 text-xl'></sup> 
          </label>
          <input
            type='text'
            id='lastname'
            placeholder='Enter last name'
            name='lastname'
            className='border border-richblack-600 rounded-lg bg-richblack-700 p-3 
            text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] 
            shadow-white/50 placeholder:text-richblack-400 focus-outline-none'
            {...register('lastname')}
          />
        </div>
      </div>

      {/* Email address */}
      <div className='flex flex-col gap-2'>
        <label htmlFor='email' className='text-14px text-richblack-5'>
          Email Address <sup className='text-pink-400 text-xl'>*</sup>
        </label>
        <input
          type='email'
          name='email'
          id='email'
          className='border border-richblack-600 rounded-lg bg-richblack-700 p-3 
            text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] 
            shadow-white/50 placeholder:text-richblack-400 focus-outline-none'
          placeholder='Enter email address'
          {...register('email', { required: true })}
        />
        {errors.email && (
          <span className='-mt-1 text-[12px] text-yellow-100'>
            Please enter your Email address.
          </span>
        )}
      </div>

      {/* Phone Number */}
      <div className='flex flex-col gap-2'>
        <label htmlFor='phonenumber' className='text-14px text-richblack-5'>
          Phone Number <sup className='text-pink-400 text-xl'>*</sup>
        </label>

        <div className='flex flex-row'>
          {/* dropdown arrow - Using <select> tag */}
          <select
            name='dropdown'
            id='dropdown'
            {...register('countryCode', { required: true })}
            className='border border-richblack-600 rounded-lg bg-richblack-700 p-3 
                        text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] 
                      shadow-white/50 placeholder:text-richblack-400 focus-outline-none w-[80px] mr-3'
          >
            {CountryCode.map((element, index) => {
              return (
                <option key={index} value={element.code}>
                  {element.code} - {element.country}
                </option>
              )
            })}
          </select>

          <input
            type='number'
            name='phonenumber'
            id='phonenumber'
            placeholder='12345 67890'
            className='w-[calc(100%-90px)] flex flex-col gap-2 border border-richblack-600 rounded-lg bg-richblack-700 p-3 
                                text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] 
                                shadow-white/50 placeholder:text-richblack-400 focus-outline-none'
            {...register('phoneNo', {
              required: { value: true, message: 'Please enter mobile number' },
              maxLength: { value: 12, message: 'Phone number invalid' },
              minLength: { value: 10, message: 'Phone number invalid' }
            })}
          />
        </div>
        {errors.phoneNo && (
          <span className='-mt-1 text-[12px] text-yellow-100'>
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/* Message */}
      <div className='flex flex-col'>
        <label htmlFor='message' className='text-14px text-richblack-5 mb-2'>
          Message
        </label>
        <textArea
          name='message'
          id='message'
          cols='30'
          rows='7'
          placeholder='Enter your message here'
          className='border border-richblack-600 rounded-lg bg-richblack-700 
          p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0]
           shadow-white/50 placeholder:text-richblack-400 focus-outline-none'
          {...register('message', { required: true })}
        />
        {errors.message && (
          <span className='mt-1 text-[12px] text-yellow-100'>
            Fill the message field
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        className='bg-yellow-50 text-black text-center text-[16px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200'
      >
        Send Message
      </button>
    </form>
  )
}

export default ContactUsForm
