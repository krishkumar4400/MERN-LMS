import { createContext, useEffect, useState } from 'react'
import { dummyCourses } from '../assets/assets/assets.js';
import { useNavigate } from 'react-router-dom';
import humanizeDuration from 'humanize-duration'

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const currency = import.meta.env.VITE_CURRENCY

  const [allCourses, setAllCourses] = useState([])
  const [isEducator, setIsEducator] = useState(true)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const navigate= useNavigate();

  // Fetch All courses-
  const fetchAllCourses = async() => {
    setAllCourses(dummyCourses);
  }

  // Function to calculate average rating of course
  const calculateRating = (course) => {
    if(course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach(rating=>{
      totalRating += rating.rating;
    })
    return totalRating/course.courseRatings.length;
  }

  // Function to calculate Course Chapter Time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
    return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]});
  }

  // Function to Calculate Course Duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) => chapter.chapterContent.map((lecture) => time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
  }

  //Function to calculate No. of lectures in the Course.
  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if(Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  }

  // Fetch user enrolled courses
  const fetchEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses);
  }

  useEffect(() => {
    fetchAllCourses()
    fetchEnrolledCourses()
  }, [])
  

  const value = {
    currency, allCourses, navigate, calculateRating, isEducator, setIsEducator, calculateChapterTime, calculateCourseDuration, calculateNoOfLectures, enrolledCourses, fetchEnrolledCourses
  };

  return (
    <AppContext.Provider value= {value} >
      {props.children}
    </AppContext.Provider>
  )
}