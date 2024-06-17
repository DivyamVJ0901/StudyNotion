import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { WiTime8 } from 'react-icons/wi'
import { useNavigate } from 'react-router-dom'
import { FaRegShareSquare } from 'react-icons/fa'
import copy from 'copy-to-clipboard'
import toast from 'react-hot-toast'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { addToCart } from '../../../slices/cartSlice'
import { IoMdArrowDropright } from 'react-icons/io'

const CourseDetailCard = ({
  course,
  handleBuyCourse,
  setConfirmationModal
}) => {
  const { user } = useSelector(state => state.profile)
  const { token } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // function for adding in cart
  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor, you can't buy a course")
      return
    }

    if (token) {
      dispatch(addToCart(course))
      return
    }

    if (!token && !user) {
      setConfirmationModal({
        heading: 'You are not logged in!',
        subHeading: 'Please login to add To Cart',
        btn1Text: 'Login',
        btn2Text: 'Cancel',
        btn1Handler: () => navigate('/login'),
        btn2Handler: () => setConfirmationModal(null)
      })
    }
  }

  // function for share button
  const handleShare = () => {
    copy(window.location.href)
    toast.success('Link Copied to clipboard')
  }

  // console.log("User id :->" , user?._id);
  // console.log("Already hai yaa nahi " , course?.studentsEnroled.includes(user?._id));

  return (
    <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5'>
      <img
        src={course?.thumbnail}
        height={'201px'}
        width={'384px'}
        alt='Course thumbnail'
        className='rounded-t-lg'
      />
      <div className='p-6 flex flex-col gap-4'>
        <p className='font-bold text-3xl text-[#F1F2FF]'>Rs. {course?.price}</p>
        <div className='flex flex-col gap-4'>
          {/* Buy now button */}
          <button
            type='button'
            onClick={
              user && course?.studentsEnroled.includes(user?._id)
                ? navigate('/dashboard/enrolled-courses') :
               handleBuyCourse
            }
            className='rounded-lg py-2 px-6 bg-[#FFD60A] font-semibold text-base text-[#000814]'
          >
            {user && course?.studentsEnroled.includes(user?._id)
              ? 'Go to Course'
              : 'Buy Now'}
          </button>

          {/* add to cart button */}
          <div>
            {!course?.studentsEnroled.includes(user?._id) ? (
              <button
                type='button'
                onClick={handleAddToCart}
                className='w-full rounded-lg py-2 px-6 bg-[#161D29] font-semibold text-base text-[#F1F2FF]'
              >
                Add to Cart
              </button>
            ) : (
              <div></div>
            )}
          </div>

          <p className='font-normal text-sm text-[#DBDDEA] mx-auto mt-2'>
            30-Day Money-Back Guarantee
          </p>
        </div>

        <div className='flex flex-col gap-2 mt-1'>
          <h3 className='font-semibold text-xl text-[#F1F2FF]'>
            This Course Includes :
          </h3>
          <div>
            {course &&
              JSON.parse(course?.instructions).map((element, index) => (
                <div className='flex gap-1 items-center'>
                  <IoMdArrowDropright
                    size={'22px'}
                    className='text-[#06D6A0]'
                  />
                  <p key={index} className='font-medium text-sm text-[#06D6A0]'>
                    {element}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <div className='w-full flex items-center justify-center'>
          <button
            type='button'
            onClick={handleShare}
            className='flex items-center gap-1 font-medium text-base text-[#E7C009] py-3'
          >
            <FaRegShareSquare />
            Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailCard
