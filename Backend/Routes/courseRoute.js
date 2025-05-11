import { Router } from "express";
import { getAllCourses, getCourseId } from "../Controllers/courseController.js";

const courseRouter = Router();

courseRouter.get('/all', getAllCourses);

courseRouter.get('/:id', getCourseId);

export default courseRouter;