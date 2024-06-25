import React from 'react'
import ContactUsForm from '../components/core/ContactUsPage/ContactUsForm'
import *as Icon1 from "react-icons/hi2";
import *as Icon2 from "react-icons/fa6";
import *as Icon3 from "react-icons/io5";
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider';

const contactDetails = [
    {
        icon : "HiMiniChatBubbleLeftRight",
        heading : "Chat on us",
        description : "Our friendly team is here to help.",
        details : "info@studynotion.com",
    },
    {
        icon : "FaEarthAmericas",
        heading : "Visit us",
        description : "Come and say hello at our office HQ.",
        details : "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,Bangalore-560016",
    },
    {
        icon : "IoCall",
        heading : "Call us",
        description : "Mon - Fri From 8am to 5pm.",
        details : "+91 9971900234",
    },
]

const ContactUs = () => {
  return (
    <div className="space-y-8">
        <div className='mx-auto mt-20 flex flex-col justify-between gap-10 text-white w-11/12 max-w-maxContent lg:flex-row'>
            <div className='lg:w-[40%]'>
                <div className='flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6'>
                    {
                        contactDetails.map((element,index) => {
                            let Icon = Icon1[element.icon] || Icon2[element.icon] || Icon3[element.icon]
                            return(
                                <div
                                className='flex flex-col gap-[2px] p-3 text-sm text-richblack-200'
                                key={index}
                                >
                                    <div className='flex flex-row items-center gap-3'>
                                        <Icon size={25}/>
                                        <h1 className='text-lg font-bold text-richblack-5'>
                                            {element?.heading}
                                        </h1>
                                    </div>
                                    <p className="font-semibold">{element?.description}</p>
                                    <p className="font-medium">{element?.details}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className='border border-richblack-600 rounded-xl text-richblack-300 p-7 lg:p-14 flex gap-3 flex-col lg:w-[60%]'>
                <h1 className='text-4xl leading-10 font-semibold text-richblack-5'>Got a Idea? We've got the skills.<br/>Let's team up</h1>
                <p>Tell us more about yourself and what you're got in mind.</p>
                <ContactUsForm/>
            </div>
        </div>
       
        <Footer/>
    </div>
  )
}

export default ContactUs
