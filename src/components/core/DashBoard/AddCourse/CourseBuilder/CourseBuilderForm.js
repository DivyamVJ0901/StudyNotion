import {React , useState} from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRight } from "react-icons/fa";
import { setCourse , setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { toast } from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from "./NestedView"

const CourseBuilderForm = () => {

    const dispatch = useDispatch();
    const [editSectionName , setEditSectionName] = useState(null);
    const {course} = useSelector((state) => state.course)
    const [loading , setLoading] = useState(false)
    const {token} = useSelector((state) => state.auth)      

    const {register,
        handleSubmit,
        setValue, 
        formState : {errors}
    } = useForm()

    const onSubmit = async (data) => {
        setLoading(true);
        let result;
        // if wale part me tab aayenge jab humne edit section ke button pe click kra hoga
        if(editSectionName)
        {
            result = await updateSection(
                {
                    sectionName : data.sectionName,
                    sectionId : editSectionName,
                    courseId : course._id
                },token
            )
        }

        // else wale part me tab aayenge jab humne create section ke button pe click kra hoga
        else
        {
            result = await createSection(
                {
                    sectionName : data.sectionName,
                    courseId : course._id, 
                },
                token
            )
        }

        // We have to update values here 
        if(result)
        {
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName" , "");
        }
        setLoading(false)
    }

    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName" , "");
    }

    // aage jaane ke liye function :- aage tabhi jaa skte hai jab atleast ek section and uske ander atleast ek subsection added ho hmaare course me
    const goToNext = () => {
        if(course.courseContent.length === 0)
        {
            toast.error("Please add atleast one section");
            return;
        }
        if(course.courseContent.some((section) => section.subSection.length === 0))
        {
            toast.error("Please add atleast one lecture inside all section");
            return
        }
        dispatch(setStep(3)); // Jab sab kuch sahi hai tab
    }

    const handleChangeEditSectionName = (sectionID , sectionName) => {

        // Agar pehle se hi secion ki ID padi hui hai to ye step follow krna hai
        if(editSectionName === sectionID)
        {
            cancelEdit();
            return;
        }
        setEditSectionName(sectionID)
        setValue("setSectionName" , sectionName)
    }


    // peeche jaane ke liye function
    const goback = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    return (
        <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
            <p className='text-2xl font-semibold text-richblack-5'>Course Builder</p>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor='sectionName' className='text-sm text-richblack-5'>
                        Section Name 
                    <sup className='text-pink-200'>*</sup></label>
                    <input
                        id='sectionName'
                        placeholder='Add section name'
                        {...register("sectionName" , {required : true})}
                        className='w-full form-style'
                    />
                    {
                        errors.sectionName && (
                            <span className='ml-2 text-xs tracking-wide text-pink-200'>Section Name is required</span>
                        )
                    }
                </div>

                <div className='flex items-end gap-x-4'>
                    <IconBtn
                        disabled={loading}
                        type = "submit"
                        text={editSectionName ? "Edit Section Name" : "Create Section"}
                        outline = {true}
                    >
                    <CiCirclePlus className='text-yellow-50 ' size={20} />
                    </IconBtn>
                    {
                        editSectionName && (
                            <button
                                type='button'
                                onClick={cancelEdit}
                                className='text-sm text-richblack-300 underline'
                            >
                                Cancel Edit
                            </button>
                        )
                    }
                </div>
            </form>


            {/* NESTED VIEW */}
            {
                course.courseContent.length > 0 && (
                    <NestedView handleChangeEditSectionName = {handleChangeEditSectionName}/>
                )
            }

            <div className='flex justify-end gap-x-3'>
                <button
                    onClick={goback}
                    className='rounded-md cursor-pointer flex items-center gap-x-2 bg-richblack-300 px-[20px] py-[8px] font-semibold text-richblack-900'>
                    Back
                </button>
                <IconBtn text="Next" disabled = {loading} onclick={goToNext}>
                    <FaArrowRight />
                </IconBtn>
            </div>
        </div>
    )
}

export default CourseBuilderForm