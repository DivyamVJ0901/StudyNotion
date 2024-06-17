const CourseProgress = require('../models/CourseProgress')
const SubSection = require('../models/SubSection')

exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, subsectionId } = req.body
    const userId = req.user.id

    const courseProgressDetails = await CourseProgress.create({
      courseID: courseId,
      userId: userId,
    })

    console.log("Course Progress Details :-> " , courseProgressDetails);

    if (!courseId || !subsectionId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data'
      })
    }

    // Check if the subsection is valid
    const subsection = await SubSection.findById(subsectionId)

    console.log("Subsecion ki Id" , subsection);

    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: 'Invalid subsection'
      })
    }

    // Find the course progress document for the user and course

    const courseProgress = await CourseProgress.findOne({
      courseID : courseId,
      userId: userId
    })

    console.log('Progress of course', courseProgress)

    if (!courseProgress) {
      // If course progress doesn't exist, create a new one
      return res.status(404).json({
        success: false,
        message: 'Course progress Does Not Exist'
      })
    } else {
      // If course progress exists, check if the subsection is already completed
      if (courseProgress?.completedVideos.includes(subsectionId)) {
        return res.status(400).json({
          success: false,
          message: 'Subsection already completed'
        })
      }

      // Push the subsection into the completedVideos array
      courseProgress?.completedVideos.push(subsectionId)
    }

    // Save the updated course progress
    await courseProgress.save()

    return res.status(200).json({
      success: false,
      message: 'Lecture marked completed'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}
