import {Router} from 'express';
import { getUserData, purchaseCourse, userEnrolledCourses } from '../Controllers/userController.js';

const userRouter = Router();

// Get user Data
userRouter.get('/data', getUserData);

// Get user enrolled courses
userRouter.get('/enrolled-courses', userEnrolledCourses);

// purchase course (stripe payment)
userRouter.post('/purchase', purchaseCourse)

export default userRouter;