import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form';
import { RxCrossCircled } from "react-icons/rx";

const RequirementField = ({name,label , register , errors ,  setValue , getValues , placeholder}) => {

    const [requirement , setRequirement] = useState("");
    const [requirementList , setRequirementList] = useState([]);

    useEffect (() => {
        register(name , {
            required : true,
            validate: (value) => value.length > 0 
        })
    }) 

    useEffect(()=> {
        setValue(name , requirementList)
    } , [requirementList])
     
    const handleAddRequirement = () => {
        if(requirement)
        {
            setRequirementList([...requirementList , requirement])
            setRequirement("");
        }
    }   

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList]
        updatedRequirementList.splice(index , 1); // splice
        setRequirementList(updatedRequirementList);
    }   

    return (
        <div className='flex flex-col space-y-2'>
            <label htmlFor={name} className='text-sm text-richblack-5'>{label}<sup className='text-pink-200'>*</sup></label>
            <div>
                <input
                    type='text'
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="form-style w-full"
                    placeholder={placeholder}
                />
                <button
                    type='button'
                    onClick={handleAddRequirement}
                    className='font-semibold text-yellow-50 mt-3 ml-1 bg-richblack-600 px-2 rounded-md'
                >
                    Add 
                </button> 
            </div>
            {
                requirementList.length > 0 && (
                    <ul>
                        {
                            requirementList.map((requirement, index) => (
                                <li key={index} className='flex items-center text-richblack-5'>
                                    <span>{requirement}</span>
                                    <button 
                                        type='button'
                                        onClick={() => handleRemoveRequirement(index)}
                                        className='text-xs ml-2 text-pure-greys-300'
                                    >
                                        <RxCrossCircled 
                                            className='text-pink-200 text-xl'
                                        />
                                    </button>
                                </li>    
                            ))
                        }
                    </ul>
                )
            }
            {
                errors[name] && (
                    <span className='ml-2 text-sm tracking-wide text-pink-200'>
                        {label} is required
                    </span>
                )
            }
        </div>
    )
}

export default RequirementField