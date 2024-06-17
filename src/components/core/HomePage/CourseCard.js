import React from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import { BsPeopleFill } from "react-icons/bs";
import { FaBookOpen } from "react-icons/fa";

const CourseCard = ({cardData , currentCard , setCurrentCard}) => {

    return (
        <div
        className={`w-[360px] lg:w-[30%]
                    ${currentCard === cardData.heading ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50 ease-in-out transition-all duration-500"
                                                        :
                                                        "bg-richblack-800 shadow-[8px_8px_0_0] shadow-caribbeangreen-700 transition-all duration-200"}
                         text-richblack-25 h-[300px] box-border cursor-pointer`}
                    onClick = {() => setCurrentCard(cardData?.heading)}>

            <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
                <div className={`${currentCard === cardData?.heading && "text-richblack-800"}  font-semibold text-[20px]`}>
                    {cardData?.heading}
                </div>

                <div className="text-richblack-400">{cardData?.description}</div>
            </div>

            <div className={`flex flex-row justify-between 
            ${currentCard === cardData?.heading ?  "text-blue-300" : "text-richblack-300"}
            px-6 py-3 font-medium
            `}>
                <div className="flex items-center gap-2 text-[16px]">
                    <BsPeopleFill />
                    <p>{cardData?.level}</p>
                </div>

                <div className="flex items-center gap-2 text-[16px]">
                    <FaBookOpen />
                    <p>{cardData?.lessionNumber} Lessons</p>
                </div>
            </div>
        </div>
    )
}

export default CourseCard;