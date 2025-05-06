import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './Pages/Student/Home'
import CoursesList from './Pages/Student/CoursesList'
import CourseDetailes from './Pages/Student/CourseDetailes'
import MyEnrollments from './Pages/Student/MyEnrollments'
import Player from './Pages/Student/Player'
import Loading from './Components/Student/Loading'
import Educator from './Pages/Educator/Educator'
import Dashboard from './Pages/Educator/Dashboard'
import AddCourse from './Pages/Educator/AddCourse'
import MyCourses from './Pages/Educator/MyCourses'
import StudentsEnrolled from './Pages/Educator/StudentsEnrolled'
import NavBar from './Components/Student/NavBar'
import "quill/dist/quill.snow.css";

const App = () => {

  const isEducatorRoute = useMatch('/educator/*');

  return (
    <div className='text-default min-h-screen bg-white'>
      {!isEducatorRoute && <NavBar/>}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/course-list' element={<CoursesList/>} />
        <Route path='/course-list/:input' element={<CoursesList/>} />
        <Route path='/course/:id' element={<CourseDetailes/>} />
        <Route path='player/:courseId' element={<Player/>} />
        <Route path='/my-enrollments' element={<MyEnrollments/>} />
        <Route path='/loading/:path' element={<Loading/>} />

        <Route path='/educator' element={<Educator/>} >
        <Route path='/educator' element={<Dashboard/>} />
        <Route path='add-course' element={<AddCourse/>} />
        <Route path='my-course' element={<MyCourses/>} />
        <Route path='student-enrolled' element={<StudentsEnrolled/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App