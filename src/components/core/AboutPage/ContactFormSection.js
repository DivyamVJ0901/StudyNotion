import React from 'react'
import ContactUsForm from '../../core/ContactUsPage/ContactUsForm'

const ContactFormSection = () => {
  return (
      <div className='mx-auto'>
        <h1 className='text-4xl text-center font-semibold '>
          Get in Touch
        </h1>
        <p className='text-richblack-300 mt-3 text-center'>
          We'd love to here for you, Please fill out this form.
        </p>
        <div className='mt-12 mx-auto'>
          <ContactUsForm/>
        </div>
    </div>
  )
}

export default ContactFormSection
