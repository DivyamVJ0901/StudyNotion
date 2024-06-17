import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png'

const timeline = [
  {
    logo: Logo1,
    heading: 'Leadership',
    Description: 'Fully committed to the success company'
  },
  {
    logo: Logo2,
    heading: 'Responsibility',
    Description: 'Student will always be our top priority'
  },
  {
    logo: Logo3,
    heading: 'Flexiblity',
    Description: 'The ability to switch is an important skills'
  },
  {
    logo: Logo4,
    heading: 'Solve the problem',
    Description: 'Code your way to a solution'
  }
]

const TimelineSection = () => {
  return (
    <div>
      <div className='flex flex-col lg:flex-row gap-20 mb-20 items-center'>
        <div className='lg:w-[45%] flex flex-col gap-14 lg:gap-3'>
          {
            /*{ When we are using map method to populate an array then we have to choose key so that code didnot give any error in production.
                            It improves the efficiency of updates and ensures the virtual DOM is updated correctly.}*/
            timeline.map((element, index) => {
              return (
                <div className='flex flex-col lg:gap-3' key={index}>
                  <div className='flex gap-6' key={index}>
                    <div className='w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[0_0_62px_0]'>
                      <img src={element.logo}></img>
                    </div>

                    <div>
                      <h2 className='font-semibold text-[18px]'>
                        {element.heading}
                      </h2>
                      <p className='text-base'>{element.Description}</p>
                    </div>
                  </div>
                  <div className={` ${
                    timeline.length-1 === index ? "hidden" : "lg:block" 
                  } h-14 border-dotted border-r border-richblack-400 bg-richblack-400/0 w-[26px]`}>

                  </div>
                </div>
              )
            })
          }
        </div>

        {/* Right part of this section */}
        <div className='relative shadow-[0_0_50px_0] w-fit h-fit shadow-blue-200'>
          <img
            src={timelineImage}
            alt='timelineImage'
            className='shadow-white shadow-[20px_20px_0px_0px] lg:h-fit object-cover h-[400px] '
          />

          <div className='absolute bg-caribbeangreen-700  flex flex-row text-white uppercase py-5 lg:py-10 gap-4 lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] '>
            <div className='flex gap-5 justify-center items-center lg:border-r  border-caribbeangreen-300 px-7 lg:px-14'>
              <p className='text-3xl font-bold w-[75px]'>10</p>
              <p className='text-caribbeangreen-300 text-sm uppercase w-[75px]'>
                Years experience
              </p>
            </div>

            <div className='flex gap-5 items-center lg:px-14 px-7'>
              <p className='text-3xl font-bold w-[75px]'>250</p>
              <p className='text-caribbeangreen-300 text-sm uppercase w-[75px]'>
                types of courses
              </p>
            </div>
            <div className='flex flex-row justify-center items-center mt-5'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSection
