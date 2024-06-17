const express = require('express')
const router = express.Router()
const { auth, isInstructor , isStudent } = require('../middleware/auth')
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard
} = require('../controllers/Profile')

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// Delete User Account
router.delete('/deleteProfile', auth, deleteAccount)

// Update the user's profile
router.put('/updateProfile', auth, updateProfile)

// Get all the details of a user
router.get('/getUserDetails', auth, getAllUserDetails)

// Get Enrolled Courses
router.get('/getEnrolledCourses', auth, getEnrolledCourses)

// for updating user's profile picture
router.put('/updateDisplayPicture', auth, updateDisplayPicture)

// For Instructor only to get all the courses of an Instructor
router.get('/instructorDashboard', auth, isInstructor, instructorDashboard)

module.exports = router
