const User = require('../models/User')
const Profile = require('../models/Profile')
const { uploadImageToCloudinary } = require('../utils/imageUploader')
const CourseProgress = require('../models/CourseProgress')
const Course = require('../models/Course')
const mongoose = require('mongoose')
const { convertSecondsToDuration } = require('../utils/secToDuration')

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName = '',
      lastName = '',
      dateOfBirth = '',
      about = '',
      contactNumber = '',
      gender = ''
    } = req.body

    const id = req.user.id

    // Find the profile by id
    const userDetails = await User.findById(id)
    const profile = await Profile.findById(userDetails.additionalDetails)

    const user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName
    })
    await user.save()

    // Update the profile fields
    profile.dateOfBirth = dateOfBirth
    profile.about = about
    profile.contactNumber = contactNumber
    profile.gender = gender

    // Save the updated profile
    await profile.save()

    // Find the updated user details
    const updatedUserDetails = await User.findById(id)
      .populate('additionalDetails')
      .exec()

    return res.json({
      success: true,
      message: 'Profile updated successfully',
      updatedUserDetails
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

// Delete account
exports.deleteAccount = async (req, res) => {
  try {
    // get id
    const id = req.user.id
    const user = await User.findById({ _id: id })
    // validation
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      })
    }

    // delete profile
    await Profile.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(user.additionalDetails)
    })

    // TODO Homework : agar kisine apni profile delete ki hai , aur vo kisi course me enrolled tha
    // to obvious si baat hai ki us course ke enrolled students bhi ab kam ho jaayenge
    for (const courseId of user.courses) {
      await Course.findByIdAndUpdate(
        courseId,
        { $pull: { studentsEnroled: id } },
        { new: true }
      )
    }
    // delete user
    await User.findByIdAndDelete({ _id: id })

    // return response
    return res.status(200).json({
      success: false,
      message: 'Your Profile has been deleted'
    })

    // TODO Homework : What is the crone job and how can we schedule this deletion operation ?
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Cant delete profile right now , try after some time'
    })
  }
}

// Get all user details
exports.getAllUserDetails = async (req, res) => {
  try {
    // id fetch
    const id = req.user.id

    // fetch user Details
    const userDetails = await User.findById(id)
      .populate('additionalDetails')
      .exec()

    console.log(userDetails)

    // return response
    return res.status(200).json({
      success: true,
      message: 'You can see your details now',
      userDetails
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Cant fetch all details'
    })
  }
}

// For updating your display Picture
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displaypicture
    const userId = req.user.id
    if(!displayPicture || !userId)
    {
      return res.status(404).json({
        success : false,
        message : "All fields are required"
      })
    }

    const image = await uploadImageToCloudinary(
      process.env.FOLDER_NAME,
      displayPicture,
      1000,
      1000
    )

    console.log("Image is :-" , image)

    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.status(200).json({
      success: true,
      message: `Image Updated successfully`,
      updatedProfile
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'error in DP change'
    })
  }
}

// Fetching all the courses in which a student is enrolled
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId
    })
      .populate({
        path: 'courses',
        populate: {
          path: 'courseContent',
          populate: {
            path: 'subSection'
          }
        }
      })
      .exec()

    userDetails = userDetails.toObject()
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId
      })
      courseProgressCount = courseProgressCount?.completedVideos.length
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// for showing instructors dashboard
exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map(course => {
      const totalStudentsEnrolled = course.studentsEnroled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated
      }
      return courseDataWithStats
    })

    return res.status(200).json({
      success: true,
      message: 'courseData fetched successfully',
      courseData
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}
