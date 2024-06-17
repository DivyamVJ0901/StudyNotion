import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RxDropdownMenu } from 'react-icons/rx'
import { MdEdit } from 'react-icons/md'
import { RiDeleteBinLine } from 'react-icons/ri'
import { MdArrowDropDownCircle } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa6'
import SubSectionModal from './SubSectionModal'
import ConfirmationalModal from '../../../../common/ConfirmationModal'
import {
  deleteSection,
  deleteSubSection
} from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'

const NestedView = ({ handleChangeEditSectionName }) => {
  // Yaha pe confirmational Modal ka use hoga Jaise logout ka bnaya tha

  const { course } = useSelector(state => state.course)
  const { token } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)

  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleDeleteSection = async sectionId => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token
    })

    if (result) {
      dispatch(setCourse(result))
    }

    setConfirmationModal(null)
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({
      subSectionId,
      sectionId,
      token
    })
    if (result) {
      const updatedCourseContent = course.courseContent.map(section =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
      // Hum yaha pehle ye course me updated section bhej rahe the ,, lekin ab yaha par humne section ko update krke course me daala aur fir us updated course ko set ki
    }
    setConfirmationModal(null)
  }

  return (
    <>
      <div
        className='rounded-lg bg-richblack-700 p-6 px-8'
        id='nestedViewContainer'
      >
        {course?.courseContent?.map(section => (
          <details key={section._id} open>
            <summary className='flex items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2'>
              <div className='flex items-center gap-x-3'>
                <RxDropdownMenu className='text-2xl text-richblack-50' />
                <p className='font-semibold text-richblack-50'>
                  {section.sectionName}
                </p>
              </div>

              <div className='flex items-center gap-x-3'>
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit className='text-2xl text-richblack-300' />
                </button>
                <button
                  onClick={() => {
                    setConfirmationModal({
                      text1: 'Delete this section ?',
                      text2: 'All the lectures in this section will be deleted',
                      btn1Text: 'Delete',
                      btn2Text: 'Cancel',
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null)
                    })
                  }}
                >
                  <RiDeleteBinLine className='text-xl text-richblack-300' />
                </button>
                <span className='font-medium text-richblack-300'>|</span>
                <MdArrowDropDownCircle
                  className={`text-xl text-richblack-300`}
                />
              </div>
            </summary>

            <div className='px-6 pb-4'>
              {/* Render All Sub Sections Within a Section */}
              {section.subSection.map(data => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2'
                >
                  <div className='flex items-center gap-x-3 py-2 '>
                    <RxDropdownMenu className='text-2xl text-richblack-50' />
                    <p className='font-semibold text-richblack-50'>
                      {data.title}
                    </p>
                  </div>
                  <div
                    onClick={e => e.stopPropagation()}
                    className='flex items-center gap-x-3'
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className='text-xl text-richblack-300' />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: 'Delete this Sub-Section?',
                          text2: 'This lecture will be deleted',
                          btn1Text: 'Delete',
                          btn2Text: 'Cancel',
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null)
                        })
                      }
                    >
                      <RiDeleteBinLine className='text-xl text-richblack-300' />
                    </button>
                  </div>
                </div>
              ))}

              {/* For adding new lecture */}
              <button
                onClick={() => setAddSubsection(section._id)}
                className='mt-3 flex items-center gap-x-1 text-yellow-50'
              >
                <FaPlus className='text-lg' />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <div></div>
      )}
      {confirmationModal ? (
        <ConfirmationalModal modalData={confirmationModal} />
      ) : (
        <div></div>
      )}
    </>
  )
}

export default NestedView
