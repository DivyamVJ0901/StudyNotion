import React from 'react'
import CountUp from "react-countup"
import ScrollTrigger from "react-scroll-trigger"
import { useState } from 'react';
const Stats = [
    {count : "5000" , label : "Active Students"},
    {count : "100" , label : "Mentors"},
    {count : "200" , label : "Courses"},
    {count : "50" , label : "Awards"},
];

const StatsComponent = () => {

    const [counter , setCounter] = useState(false);

    return (
        <div className='bg-richblack-700 my-24 lg:my-12'>
        <ScrollTrigger onEnter={() => setCounter(true)} onExit={()=> setCounter(false)}>
            <div className='flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto'>
                <div className='grid grid-cols-2 lg:grid-cols-4 text-center'>
                    {
                        Stats.map((data , index) => {
                            return(
                                <div key = {index} className='flex flex-col py-10'>
                                    <h1 className='text-[35px] font-bold text-richblack-5'>
                                        {
                                            counter && <CountUp start={0} end={data.count} duration={2} delay={0}/>
                                        }+
                                    </h1>
                                    <h2 className='text-[16px] font-semibold text-richblack-400'>
                                        {data.label}
                                    </h2>
                                </div>
                            )
                            
                        })
                    }
                </div>
            </div>
        </ScrollTrigger>
        </div>
    )
}

export default StatsComponent
