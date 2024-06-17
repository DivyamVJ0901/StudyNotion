import React from 'react'
import CTAButton from '../HomePage/Button'
import HighlightText from './HighlightText'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColour
}) => {
  return (
    <div className={`flex ${position} flex-col lg:flex-row my-20 justify-between gap-10`}>
      {/* LEFT PART */}
      <div className='lg:w-[50%] w-[100%] flex flex-col gap-8'>
        <div className='font-semibold text-4xl w-[100%]'>{heading}</div>
        <div className='text-richblack-300 font-bold text-justify'>{subheading}</div>
        <div className='flex gap-7 mt-7'>
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className='flex gap-2 items-center'>
              {ctabtn1.btnText}
              <AiOutlineArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* RIGHT PART */}
      <div className='codeBorder relative flex flex-row py-4 lg:w-[500px]'>
        {/* BG gradient : HW */}

        {/* {backgroundGradient} */}
        <div className={`absolute top-[-5%] left-[-5%]  w-[70%] h-[80%] opacity-20 blur-2xl rounded-[100%] bg-gradient-to-r ${ codeColour === "text-yellow-25"? "from-[#8A2BE2] via-[#FFA500] to-[#F8F8FF]" : "from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]" }`} ></div>


        <div className='items-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColour} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 2000, '']}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: 'pre-line',
              display: 'block'
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  )
}

export default CodeBlocks
