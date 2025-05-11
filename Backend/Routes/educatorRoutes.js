import { Router } from "express";
import { addCourse, educatorDashboardData, getEducatorCourses, getEnrolledStudentsData, updateRoleToEducator } from "../Controllers/educatorController.js";
import upload from "../Config/multer.js";
import { protectEducator } from "../Middlewares/AuthMiddleware.js";

const educatorRouter = Router();

// Add educator role
educatorRouter.get('/update-role', updateRoleToEducator);

// Add course route
educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse);

// get educator courses
educatorRouter.get('/courses', protectEducator, getEducatorCourses);

// Gte educator dashboard data
educatorRouter.get('/dashboard', protectEducator, educatorDashboardData)

// get enrolled students data
educatorRouter.get("/enrolled-students", protectEducator, getEnrolledStudentsData);

export default educatorRouter;