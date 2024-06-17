import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold s
            ${
              active ? 'bg-yellow-50 text-black shadow-[2px_2px_0_0_rgba(245,227,37,0.25)]' : 'bg-richblack-800 shadow-[2px_2px_0_0_rgba(255,255,255,0.18)]'
            } hover:scale-95 transition-all duration-200 hover:shadow-none `}
      >
        {children}
      </div>
    </Link>
  )
}
export default Button
