import { Course } from "../Model/Course.js";

// Get All Courses-
export const getAllCourses =async (req,res) => {
  try {
    const courses = await Course.find({isPublished: true}).select(['-courseContent', '-enrolledStudents']).populate({path: 'educator'});


    if(!courses) {
      return res.json({
        message: "No courses are available",
        success: false
      });
    }

    res.json({
      courses,
      success: true
    });
    
  } catch (error) {
    res.json({
      message: error.message,
      success: false
    });
  }
}

// Get course by id
export const getCourseId = async(req,res) => {
  const {id} = req.params;
  try {
    const courseData = await Course.findById(id).populate({
      path: 'educator'
    });

    if(!courseData) {
      return res.json({
        message: "No courses are available",
        success: false 
      });
    }

    // Remove lecture URL if isPreview is false
    courseData.courseContent.forEach(chapter => {
      chapter.chapterContent.forEach(lecture => {
        lecture.lectureUrl = "";
      });
    });
    res.json({
      courseData, success: true
    });

  } catch (error) {
    res.json({
      message: error.message,
      success: false
    });
  }
}