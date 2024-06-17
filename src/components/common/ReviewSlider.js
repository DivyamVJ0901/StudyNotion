import React, { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import '../../App.css'
// Icons
import { FaStar } from 'react-icons/fa'
// Import required modules
import { Autoplay, FreeMode, Pagination } from 'swiper/modules'

// Get apiFunction and the endpoint
import { apiConnector } from '../../services/apiconnector'
import { ratingsEndpoints } from '../../services/apis'

function ReviewSlider () {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15
  const truncate_email_len = 7;

  useEffect(() => {
    ;(async () => {
      const { data } = await apiConnector(
        'GET',
        ratingsEndpoints.REVIEWS_DETAILS_API
      )


      if (data?.success) {
        setReviews(data?.data)
      }
    })()
  }, [])

  return (
    <div className='text-white'>
      <div className='my-[50px] max-w-maxContentTab lg:max-w-maxContent'>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false
          }}
          modules={[FreeMode, Pagination, Autoplay]}
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className='flex flex-col gap-4 bg-richblack-800 p-10 text-[14px] text-richblack-25 border border-richblack-500 rounded-lg  hover:bg-richblack-700 transition duration-300 ease-in-out'>
                  <div className='flex items-center gap-4'>
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstname} ${review?.user?.lastname}`
                      }
                      alt=''
                      className='h-9 w-9 rounded-full object-cover'
                    />
                    <div className='flex flex-col'>
                      {/* <h1 className=' font-normal text-richblack-5'>{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1> */}
                      <h1 className=' font-normal text-richblack-5'>{ review?.user?.email.split('').length > truncate_email_len ? `${review?.user?.email.split('').slice(0,truncate_email_len).join('')}...` : `${review?.user?.email}`}</h1>
                      <h2 className='text-[12px] font-medium text-richblack-500'>
                        {review?.course?.courseName}
                      </h2>
                    </div>  
                  </div>
                  <p className='font-medium text-richblack-25'>
                    {review?.review.split(' ').length > truncateWords
                      ? `${review?.review
                          .split(' ')
                          .slice(0, truncateWords)
                          .join(' ')} ...`
                      : `${review?.review}`}
                  </p>
                  <div className='flex items-center gap-2 '>
                    <h3 className='font-semibold text-yellow-100'>
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor='#ffd700'
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
          {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
