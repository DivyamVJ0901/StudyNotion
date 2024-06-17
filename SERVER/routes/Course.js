// Import the required modules
const express = require("express")
const router = express.Router()
// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' });

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  editCourse,
  getInstructorCourses,
  getFullCourseDetails , 
  deleteCourse
} = require("../controllers/Course")


// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
  deleteCategory
} = require("../controllers/Category")

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/Subsection")

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRatingReview,
} = require("../controllers/RatingAndReview")

const {
  updateCourseProgress
} = require("../controllers/courseProgress")

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)

// Edit the course
router.post("/editCourse", auth, editCourse);

// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)

// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)

// Get full course details 
router.post("/getFullCourseDetails" , auth  , getFullCourseDetails)

// Get all the courses for a particular instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

// Delete a course 
router.delete("/deleteCourse" , auth , isInstructor , deleteCourse)


// ---- SECTION ROUTES -----
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)

// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)

// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)

// ---- SUBSECTION ROUTES -----
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)

// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)

// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)

// route for mark lecture as completed
router.post("/updateCourseProgress" , auth , isStudent , updateCourseProgress)



// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here

// Creation of a category
router.post("/createCategory", auth, isAdmin, createCategory)

// Deleting the category
router.post("/deleteCategory", auth, isAdmin, deleteCategory)

// Show all categories 
router.get("/showAllCategories", showAllCategories)

// category Page Details
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRatingReview)

module.exports = router