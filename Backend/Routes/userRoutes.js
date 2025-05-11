import { Router } from "express";
import {
  addUserRating,
  getUserCourseProgress,
  getUserData,
  purchaseCourse,
  updateUserCourseProgress,
  userEnrolledCourses,
} from "../Controllers/userController.js";

const userRouter = Router();

// Get user Data
userRouter.get("/data", getUserData);

// Get user enrolled courses
userRouter.get("/enrolled-courses", userEnrolledCourses);

// purchase course (stripe payment)
userRouter.post("/purchase", purchaseCourse);

// update course progress
userRouter.post("/update-course-progress", updateUserCourseProgress);

// get course progress
userRouter.post("/get-course-progress", getUserCourseProgress);

// Add Rating To The Course
userRouter.post("/add-rating", addUserRating);

export default userRouter;
