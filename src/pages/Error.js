import React from 'react'
import ErrorPage from "../assets/Images/ErrorPage.jpg"

const Error = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-col gap-y-5 items-center justify-center p-24'>
      <p className='text-white lg:text-3xl text-sm lg:visible text-center'>404 Error: Page not found. Maybe it's on vacation. We're sending it a postcard to come back soon</p>
        <img src={ErrorPage} alt = "Error 404 - Not Found" className='lg:h-[400px] lg:w-[400px] h-[200px] w-[200px] rounded-full'/>
      </div>
    </div>  
  )
}  

export default Error
